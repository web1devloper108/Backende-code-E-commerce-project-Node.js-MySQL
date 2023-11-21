const connection = require("../Model/model");

const addRetailerProductsImages = async (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_product_images SET ?";
        let data = {
            pid: req.body.pid,
            imgid: req.body.imgid,
            image: req.file.location,         // req.body.image
            description: req.body.description,
            colour: req.body.colour
        };

        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("Error: ", error.sqlMessage);
                res.json("Failed to insert data");
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error found:", error); 
        res.json("error found..");
    }
};

const updateRetailerProductsImage = async (req, res) => {
    try {
        const { imgid } = req.params; 
        let sqlQuery = "UPDATE tbl_retailer_product_images SET image = ? WHERE imgid = ?";
        let data = [req.file.location, imgid]; // not req.body.image
      await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("Error: ", error.sqlMessage);
                res.json("Failed to update image");
            } else {
                res.json(result);
            }
        }); 
    } catch (error) {
        console.log("Error found:", error);
        res.json("Error..");
    }
};

const viewRetailerProductsImages = async (req, res) => { 
    try {
        const { pid } = req.params; 
        let sqlQuery = "SELECT image FROM tbl_retailer_product_images WHERE pid = ?";
      await connection.query(sqlQuery, [pid], function (error, results) {
            if (error) {
                console.log("Error: ", error.sqlMessage);
                res.json("Failed to fetchh images");
            } else {
                const images = results.map(result => result.image);
                res.json(images);
            }
        });
    } catch (error) {
        console.log("Error found:", error);
        res.json("server error...");
    }
};
 



module.exports = {addRetailerProductsImages, updateRetailerProductsImage, viewRetailerProductsImages}