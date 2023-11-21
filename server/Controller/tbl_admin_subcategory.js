const connection = require("../Model/model");

const addSubCategory = async (req, res) => { 
    try {
        let sqlQuery = "INSERT INTO tbl_admin_subcategory SET ?";
        let data = {
            Pcategoryid: req.body.Pcategoryid,
            Subcategoryid: req.body.Subcategoryid,
            Subcategoryname: req.body.Subcategoryname,
            photo: req.file.location, // Use req.body.photo if needed
        };
        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: error.sqlMessage });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error found:", error);
        res.status(500).json({ error: "An error occurred" });
    }
};
 
const viewSubCategory = async (req, res) => {
    try {
        const sqlQuery = "SELECT * FROM tbl_admin_subcategory";
        await connection.query(sqlQuery, (error, results) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Failed to fetch subcategories" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.json("Server error");
    }
};


const updateSubCategory = async (req, res) => {
    try {
      const subcategoryId = req.params.Subcategoryid;
      const Subcategoryname = req.body.Subcategoryname;
      const photo = req.file.location;
      const sqlQuery = "UPDATE tbl_admin_subcategory SET Subcategoryname = ?, photo = ? WHERE Subcategoryid = ?";
      await connection.query(sqlQuery, [Subcategoryname, photo, subcategoryId], function (error, result) {
        if (error) {
          console.log("Error:", error.sqlMessage);
          res.json("Error in SQL query");
        } else {
          if (result.affectedRows > 0) { 
            res.json("Subcategory updated successfully");
          } else {
            res.json("Subcategoryid not found in the database");
          }
        }   
      });
    } catch (error) {
      console.error("Error:", error);
      res.json("Error while updating Subcategory");
    }
  };
  

const viewSubCategoryByName = async (req, res) => {
    try {
        const Subcategoryname = req.params.Subcategoryname;
if (!Subcategoryname) {
            return res.json("Subcategoryname is required");
        }
        const sqlQuery = "SELECT s.Pcategoryid, s.Subcategoryid, s.Subcategoryname, s.photo, s.addedon FROM tbl_admin_subcategory s WHERE s.Subcategoryname = ?";
        const data = [Subcategoryname];
        await connection.query(sqlQuery, data, (error, results) => {
            if (error) {
                console.error("Database Error:", error);
                return res.json("Failed to retrieve" );
            } else {
                if (results.length === 0) {
                    return res.json("Subcategory not found");
                }
                res.json(results);
            }  
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

///search/get subcategory with the help of Pcategory id 
////we find how many subcatagery under perticular categary
const viewSubCategoryByPcategoryid = async (req, res) => {
    try {
        const Pcategoryid = req.params.Pcategoryid;
if (!Pcategoryid) {
            return res.status(400).json({ error: "Pcategoryid is required for search" });
        }
        const sqlQuery = "SELECT s.Pcategoryid, s.Subcategoryid, s.Subcategoryname, s.photo, s.addedon FROM tbl_admin_subcategory s WHERE s.Pcategoryid = ?";
        const data = [Pcategoryid];
        await connection.query(sqlQuery, data, (error, results) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Failed to retrieve subcategories" });
            } else {
                if (results.length === 0) {
                    return res.status(404).json({ error: "Subcategory not found" });
                }
                res.status(200).json(results);
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { addSubCategory, viewSubCategory, updateSubCategory, viewSubCategoryByName, viewSubCategoryByPcategoryid } 
