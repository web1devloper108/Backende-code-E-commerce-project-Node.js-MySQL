const express = require('express')
const retailerProducts = express.Router();

const {addRetailerProducts,getRetailerProduct,updateRetailerProductsPrice,updateRetailerProductsDiscount,updateRetailerProductsQuantity, getAdminAllProducts} = require("../Controller/tbl_retailer_products")

// const aws = require('aws-sdk');
let multerS3 = require('multer-s3');
let multer = require("multer")
const { S3Client } = require('@aws-sdk/client-s3');

const bucketName = "forimg123456";   
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

retailerProducts.post("/api/retailer/product/addnew", upload.single('photo'), addRetailerProducts);                                 
retailerProducts.get("/api/retailer/product/productlist/:regno", getRetailerProduct);
retailerProducts.patch("/api/retailer/product/updateprice/:pid", updateRetailerProductsPrice);                                                   
retailerProducts.patch("/api/retailer/product/updatediscount/:pid", updateRetailerProductsDiscount);                   
retailerProducts.patch("/api/retailer/product/updatequantity/:pid", updateRetailerProductsQuantity);                   
retailerProducts.get("/api/admin/retailer/product/allproducts", getAdminAllProducts);      ///use pagination on backend
// retailerProducts.get("/api/admin/retailer/total", getRetailerTotal);                        ////76

module.exports = { retailerProducts }   
  