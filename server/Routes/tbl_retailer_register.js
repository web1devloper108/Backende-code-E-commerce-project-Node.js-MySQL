const express = require('express')
const Retailer = express.Router();

const { addRetailer, getRetailerByRegNo, updateRetailer, updateStatus, updatePassword, updateDocuments, viewAllShops } = require("../Controller/tbl_retailer_register")

let multerS3 = require('multer-s3');
let multer = require("multer")
const { S3Client } = require('@aws-sdk/client-s3');

const bucketName = "forimg123456";
const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "write here accessKeyId",
        secretAccessKey: "write here secretAccessKey"
    }
})    

//Storage Configuraion
let storage = multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
    }, 
    contentType: multerS3.AUTO_CONTENT_TYPE,   
    key: (req, file, cb) => {
        cb(null, file.originalname)
    }
   
})
let upload = multer({ storage: storage }) 
Retailer.post("/api/retailer/newshopregister", upload.single('docshop'), addRetailer); 
// Retailer.post("/api/retailer/newshopregister", upload.array('images',3), addRetailer); 

// Retailer.post('/api/retailer/newshopregister', upload.fields([
//     { name: 'document_reg_no' },
//     { name: 'docpan' }, 
//     { name: 'docshop' } 
// ]), addRetailer);
      
Retailer.get("/api/retailer/viewshop/:regno", getRetailerByRegNo);    
Retailer.put("/api/retailer/updateshop/:regno", updateRetailer );                 
Retailer.put("/api/retailer/updatestatus", updateStatus );                               ////old by sr    Retailer.put("/api/retailer/updatestatus/:regno", updateStatus );              
Retailer.patch("/api/retailer/updatepwd/:regno", updatePassword );               
// Retailer.patch("/api/retailer/updatepwd/:regno", upload.array('docshop', 3), updatePassword );               
Retailer.patch("/api/retailer/updatedocuments/:regno", updateDocuments );               
Retailer.get("/api/admin/viewshops", viewAllShops );                     

module.exports = { Retailer }       
     