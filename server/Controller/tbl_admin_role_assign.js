
const connection = require("../Model/model");
const grantRole = async (req, res) => {
    try {
      let data = {
        uid : req.body.uid,
        roleid : req.body.roleid};
        let sqlQuery = "INSERT INTO tbl_admin_role_assign SET?";
    await connection.query(sqlQuery, data, (error, result) => {
        if (error) {
          console.log("Error:", error.sqlMessage);
        } else {
          console.log("Data inserted");
        }
      }); 
    } catch (error) {
      console.error("Error found:", error);
    } 
  }; 
///checkRole  
let checkRole = async (req, res) => {
    try {
        let uid = req.params.uid
   let sqlQuery = `SELECT rolename FROM tbl_admin_roles where roleid IN(select roleid from tbl_admin_role_assign where uid = ${uid})`;
     await connection.query(sqlQuery, uid, function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                return res.json(" Error");
            } else {
                res.json(result); 
            }  
        }); 
    } catch (error) { 
        console.error("Error:", error);
        res.json("Server Error");
    } 
};

//update   not wo    
let changeRole = async (req, res) => {
        try {
          let uid = req.params.uid; 
          let roleid = req.params.roleid; 
                let sqlQuery = `UPDATE tbl_admin_role_assign SET uid=? AND roleid=? WHERE uid = ${uid}`;
             await   connection.query(sqlQuery, (error, result) => {
            if (error) {
              console.error("Error:", error); 
              res.send("Error updating");
            } else {
              console.log("Role assignment updated");
              res.send("Role assignment updated successfully"); 
            } 
          });
        } catch (error) {
          console.error("Error found:", error.message);
          res.send("Internal server error");
        }
      };


    const revokeRole = (req, res) => {
      const uid = req.params.uid; 
      const roleid = req.params.roleid;
      const sqlQuery = "DELETE FROM tbl_admin_role_assign WHERE uid = ? AND roleid = ?";
      connection.query(sqlQuery, [uid, roleid], function (err, result) {
          if (err) {
              res.json("Failed to delete role");
          } else {
              res.json("Role assignment deleted successfully" );
          }
      });   
  }; 
      

module.exports = { grantRole, checkRole, changeRole, revokeRole}   

