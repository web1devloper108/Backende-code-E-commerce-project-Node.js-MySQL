const connection = require("../Model/model");

const addRetailerProducts = async (req, res) => {   
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_products SET ?";
        let data = {
            pid: req.body.pid,
            pname: req.body.pname,
            Subcategoryid: req.body.Subcategoryid,
            regno: req.body.regno,
            price: req.body.price,
            discount: req.body.discount,
            brand_name: req.body.brand_name, 
            quantity: req.body.quantity, 
            lastupdate: req.body.lastupdate, 
            photo: req.file.location,
        }; 
        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage); 
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
    }
};
const getRetailerProduct = async (req, res) => {
    try {
      const regno = req.params.regno;
const sqlQuery = "SELECT * FROM tbl_retailer_products WHERE regno = ?";
      const data = [regno];
  await connection.query(sqlQuery, data, (error, result) => {
        if (error) {
          console.log("Error:", error.sqlMessage);
          res.status.json({ error: "Error" });
        } else {
          if (result.length === 0) {
            res.status.json({ message: "Product not found" });
          } else {
            res.json(result);
          }
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status.json({ error: " Server Error" });
    }
  };
  const updateRetailerProductsPrice = (req, res) => {
    try {
        const pid = req.params.pid;
        const newPrice = req.body.price;
        const sqlQuery = 'UPDATE tbl_retailer_products SET price = ? WHERE pid = ?';
        
        connection.query(sqlQuery, [newPrice, pid], function(err, result) {
            if (err) {
                console.log("Error:", err.sqlMessage);
                res.status.json({ error: 'server error' });
            } else {
                res.json({ message: 'price updated' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status.json({ error: 'server error' });
    }
};
  const updateRetailerProductsDiscount = (req, res) => {
    try {
        const pid = req.params.pid;
        const discount = req.body.discount; 
     const sqlQuery = 'UPDATE tbl_retailer_products SET discount = ? WHERE pid = ?';
       connection.query(sqlQuery, [discount, pid], function(err, result) {
            if (err) {
                console.log("Error:", err.sqlMessage);
                res.status.json({ error: 'server error' });
            } else {
                res.json({ message: 'discount updated' }); 
            }
        });
    } catch (error) {
        console.log(error);
        res.status.json({ error: 'server error' });
    }
};
const updateRetailerProductsQuantity = (req, res) => {
    try {
        const pid = req.params.pid;
        const quantity = req.body.quantity; 
     const sqlQuery = 'UPDATE tbl_retailer_products SET quantity = ? WHERE pid = ?';
       connection.query(sqlQuery, [quantity, pid], function(err, result) {
            if (err) {
                console.log("Error:", err.sqlMessage);
                res.status.json({ error: 'server error' });
            } else { 
                res.json({ message: 'quantity updated' }); 
            }
        });
    } catch (error) {
        console.log(error);
        res.status.json({ error: 'server error' });
    }
};
//for admin des
const getAdminAllProducts = async (req, res) => {
    try {
        let sqlQuery = "SELECT * FROM tbl_retailer_products";
        await connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage);
                res.status.json({ error: " Error" });
            } else {
                res.json(result);
            }  
        });
    } catch (error) { 
        console.log(error.message)
        res.status.json({ error: "Server Error" }); 
    }
}; 














///
// const getAdminAllProducts = async (req, res) => {
//     try {
//         const page = req.query.page || 1; // Get the page number from the request query (default to page 1 if not provided)
//         const itemsPerPage = req.query.itemsPerPage || 3; // Number of items to show per page (default to 10 if not provided)
//         const offset = (page - 1) * itemsPerPage; // Calculate the offset

//         let sqlQuery = `SELECT * FROM tbl_retailer_products LIMIT ? OFFSET ?`;
//         let values = [itemsPerPage, offset]; 

//         await connection.query(sqlQuery, values, function (error, result) {  
//             if (error) {
//                 console.log("Error", error.sqlMessage);
//                 res.status.json({ error: " Error" });
//             } else {
//                 res.json(result);
//             }
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status.json({ error: "Server Error" });
//     }
// };

module.exports = {addRetailerProducts, getRetailerProduct,updateRetailerProductsPrice,updateRetailerProductsDiscount,updateRetailerProductsQuantity,getAdminAllProducts}   
 