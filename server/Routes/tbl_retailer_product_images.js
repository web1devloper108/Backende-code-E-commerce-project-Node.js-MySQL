const express = require('express')
const retailerProductsImages = express.Router();

const {addRetailerProductsImages,updateRetailerProductsImage, viewRetailerProductsImages} = require("../Controller/tbl_retailer_product_images")

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

retailerProductsImages.post("/api/retailer/productimage/addnew", upload.single('image'), addRetailerProductsImages);                   
retailerProductsImages.patch("/api/retailer/productimage/update/:imgid", upload.single('image'), updateRetailerProductsImage);                   
retailerProductsImages.get("/api/retailer/productimage/viewimages/:pid", viewRetailerProductsImages);                   
  

module.exports = { retailerProductsImages }        
