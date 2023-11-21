const express = require('express')
const AdminProductSubcategory = express.Router();
// const upload = require('../multerS3/multer')
let multerS3 = require('multer-s3');
let multer = require("multer")
const { S3Client } = require('@aws-sdk/client-s3');

const bucketName = "forimg123456";   ///name of bucket is forimg12345

//store file in AWS S3 configuration 
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

const { addSubCategory,viewSubCategory, updateSubCategory,  viewSubCategoryByName, viewSubCategoryByPcategoryid } = require("../Controller/tbl_admin_subcategory")

AdminProductSubcategory.post("/api/admin/subcategory/addsubcat",upload.single('photo'), addSubCategory); 
AdminProductSubcategory.get("/api/admin/subcategory/viewsubcat", viewSubCategory);  
AdminProductSubcategory.put("/api/admin/subcategory/updatesubcat/:Subcategoryid",upload.single('photo'), updateSubCategory);                                  
AdminProductSubcategory.get("/api/admin/subcategory/findsubcat/:Subcategoryname", viewSubCategoryByName);  
AdminProductSubcategory.get("/api/admin/subcategory/viewsubcat/:Pcategoryid", viewSubCategoryByPcategoryid);  

 
module.exports = { AdminProductSubcategory }       
    
  