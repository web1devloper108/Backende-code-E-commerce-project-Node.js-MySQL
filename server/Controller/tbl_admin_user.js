const connection = require("../Model/model");

const getAdminUser = async (req, res) => { 
    try {
        let sqlQuery = "select * from tbl_admin_user";
        let data = req.body;
        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                    console.log("error", error.sqlMessage)
                }
                else {
                    res.json(result)
                    // console.log(result.photo)  
                }
            }) 
        } catch (error) {
            console.log(error.message)
        }
    }
    //add// weithout hash
    const addAdminUser = async (req, res) => {
        try {
            let sqlQuery = "insert into tbl_admin_user set?";
            let data = {
                uid: req.body.uid,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password, 
                mobile: req.body.mobile,
                photo: req.file.location,               ///rather then photo: req.body.photo,
                aadhaar: req.body.aadhaar, 
                doj: req.body.doj,
                qualification: req.body.qualification,
                dob: req.body.dob,
                address: req.body.address,
                state: req.body.state, 
                city: req.body.city,
                country:req.body.country, 
                pin: req.body.pin, 
                // status: req.body.status,  
            } 
            await connection.query(sqlQuery, data, function (error, result) {
                if (error) {
                    console.log("error", error.sqlMessage)
                }
                else {
                res.json(result) 
            } 
        })
    } catch (error) {
        console.log("error found...")
    }
}

// ///hash
// // const bcrypt = require('bcrypt');   ///
// // const saltRounds = 10;
// const addAdminUser = async (req, res) => {
//     try { 
//         let sqlQuery = "INSERT INTO tbl_admin_user SET ?";
//         const password = req.body.password;                       // not req.body.password.toString();  coz already converted in staring
//         bcrypt.hash(password, saltRounds, async (err, hash) => {
//             if (err) {
//                 console.log("Error in hashing password:", err);
//                 return res.json({ Error: "Error in hashing password" });
//             }
//             const data = {
//                 uid: req.body.uid,
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hash, 
//                 mobile: req.body.mobile,
//                 photo: req.file.location,
//                 aadhaar: req.body.aadhaar,
//                 doj: req.body.doj,
//                 qualification: req.body.qualification,
//                 dob: req.body.dob,
//                 address: req.body.address,
//                 state: req.body.state,
//                 city: req.body.city,
//                 country: req.body.country,
//                 pin: req.body.pin,
//                 status: req.body.status || "deactive", // default deactive DB me
//             };
//             await connection.query(sqlQuery, data, function (error, result) {
//                 if (error) {
//                     console.log("Error", error.sqlMessage);
//                 } else {
//                     res.json(result);
//                 }
//             });
//         });
//     } catch (error) {
//         console.log("Error..", error);
//     }
// };



const updateAdminUser = async (req, res) => {
    try {
        const id = req.params.uid;
        const { name, email, password, mobile, aadhaar, doj, qualification, dob, address, state, city, country, pin } = req.body;
        const photo = req.file.location;
        const sqlQuery = "UPDATE tbl_admin_user SET name=?, email=?, password=?, mobile=?, photo=?, aadhaar=?, doj=?, qualification=?, dob=?, address=?, state=?, city=?, country=?, pin=? WHERE uid = ?";
        const data = [name, email, password, mobile, photo, aadhaar, doj, qualification, dob, address, state, city, country, pin, id]; 
        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage); 
                res.json("DB error");
            } else {       
                res.json("updated successfully");
            }  
        });      
    } catch (error) {
        console.error("Error:", error); 
        res.json("error while updating");    
    }
};

//status//
const statusAdminUser = (req, res) => {
    try {
        let SqlQuery = 'UPDATE  tbl_admin_user SET status=? WHERE uid=?'
        let id = req.query.uid
        let data = req.query.status
        connection.query(SqlQuery, [data,id], function(err, result){
            if (err) {
              console.log("Error", err.sqlMessage)
            }  
            else {
                res.json(result)
            }   
        })
    } catch (error) {
        console.log(error) 
} 
} 
//delete//
const deleteAdminUser = async (req, res) => {
    try {
        const id = req.params.uid;
        const sqlQuery = "DELETE FROM tbl_admin_user WHERE uid = ?";
        await connection.query(sqlQuery, [id], function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.json("DB error");
            } else {
                if (result.affectedRows > 0) {
                    res.json("deleted successfully");
                } else {
                    res.json("user not found");
                }
         }
        });
    } catch (error) {
        console.log("Error:", error);
        res.json("Internal server error");
    }
} 


const getAdminUserById = async (req, res) => {
    try {
        const userId = req.params.uid;  

        let sqlQuery = "SELECT * FROM tbl_admin_user WHERE uid = ?";
        
        await connection.query(sqlQuery, [userId], function(error, result) {
            if (error) {
                 console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Internal server error" });
            } else {
                if (result.length > 0) {
                    res.json(result[0]); // Assuming you want to return only one user
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = { getAdminUser, addAdminUser, updateAdminUser, statusAdminUser, deleteAdminUser,getAdminUserById }   