const connection = require("../Model/model");

const addRetailer = async (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_register SET ?";
        let data = {   
            regno: req.body.regno, 
            GST_no: req.body.GST_no, 
            TIN_no: req.body.TIN_no,
            PAN: req.body.PAN, 
            shop_name: req.body.shop_name,
            owner_name: req.body.owner_name,
            contact: req.body.contact,
            mobile: req.body.mobile,
            web: req.body.web,
            email: req.body.email,
            address: req.body.address,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,
            document_reg_no: req.files[0].location,
            docpan: req.files[1].location,
            docshop: req.files[2].location,
            terms_and_conditions: req.body.terms_and_conditions,
            // status: "deactive",
            password: req.body.password,
        };

        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error inserting data" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" }); 
    }
};

const getRetailerByRegNo = async (req, res) => { 
    try {
        const regno = req.params.regno; 
        let sqlQuery = "SELECT * FROM tbl_retailer_register WHERE regno = ?";
        await connection.query(sqlQuery, [regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error retrieving data" });
            } else {
                if (result.length === 0) {
                    res.status(404).json({ message: "Data not found" });
                } else {
                    res.json(result);
                } 
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

const updateRetailer = async (req, res) => {
    try {
        const regno = req.params.regno;
        let sqlQuery = "UPDATE tbl_retailer_register SET ? WHERE regno = ?";
        let updatedData = {
            regno: req.body.regno,
            GST_no: req.body.GST_no,
            TIN_no: req.body.TIN_no,
            PAN: req.body.PAN,
            shop_name: req.body.shop_name,
            owner_name: req.body.owner_name,
            contact: req.body.contact,
            mobile: req.body.mobile,
            web: req.body.web,
            email: req.body.email,
            address: req.body.address,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,
            document_reg_no: req.body.document_reg_no,
            docpan: req.body.docpan,
            docshop: req.body.docshop,   /// docshop: req.file.location,

            terms_and_conditions: req.body.terms_and_conditions,
            status: req.body.status,
            password: req.body.password,
        };

        await connection.query(sqlQuery, [updatedData, regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error updating data" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};


const updateStatus = (req, res) => {
    try {
        const regno = req.query.regno; 
        const data = req.query.status;
     let SqlQuery = 'UPDATE tbl_retailer_register SET status=? WHERE regno=?';
      connection.query(SqlQuery, [data, regno], function (err, result) {
            if (err) {
                console.log("Error", err.sqlMessage);
                res.json("error while updating");
            } else {
                if (result.affectedRows > 0) {
                    res.json({ message: "Status updated successfully." });
                } else {
                    res.json("Data not found");
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.json("DB error");
    }
};

const updatePassword = async (req, res) => {
    try {
        const regno = req.params.regno; 
        let sqlQuery = "UPDATE tbl_retailer_register SET password = ? WHERE regno = ?";
        const updatedPassword = req.body.password;
       await connection.query(sqlQuery, [updatedPassword, regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error updating password" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

const updateDocuments = async (req, res) => {
    try {
        const regno = req.params.regno; 
       let sqlQuery = "UPDATE tbl_retailer_register SET document_reg_no = ?, docpan = ?, docshop = ? WHERE regno = ?";
   const document_reg_no = req.body.document_reg_no;
        const docpan = req.body.docpan;
        const docshop = req.body.docshop;
    await connection.query(sqlQuery, [document_reg_no, docpan, docshop, regno], function (error, result) {
            if (error) {    
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error updating documents" });
            } else {
                res.json(result);
            }
        }); 
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

////visw all shops//
const viewAllShops = async (req, res) => {
    try {
        let sqlQuery = "SELECT * FROM tbl_retailer_register";
  await connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error retrieving data" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

module.exports = { addRetailer, getRetailerByRegNo, updateRetailer, updateStatus, updatePassword, updateDocuments, viewAllShops }   
  