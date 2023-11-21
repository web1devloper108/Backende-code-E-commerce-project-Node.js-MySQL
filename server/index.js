const express = require('express');
const app = express();
app.use(express.json());
var cors = require("cors");
app.use(cors());
const port = 7000;
const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }))

const { AdminUser } = require("./Routes/tbl_admin_user") 
app.use("/", AdminUser);

const { AdminRole } = require("./Routes/tbl_admin_roles")
app.use("/", AdminRole);

const { AdminRoleAssign } = require("./Routes/tbl_admin_role_assign")
app.use("/", AdminRoleAssign);

const { AdminProduct } = require("./Routes/tbl_admin_product_category")
app.use("/", AdminProduct);

const { AdminProductSubcategory } = require("./Routes/tbl_admin_subcategory")
app.use("/", AdminProductSubcategory);

const { AdminOffer } = require("./Routes/tbl_admin_offer")
app.use("/", AdminOffer);

const { Retailer } = require("./Routes/tbl_retailer_register")
app.use("/", Retailer);

const { retailerProducts } = require("./Routes/tbl_retailer_products")
app.use("/", retailerProducts);

const { retailerProductsDescription } = require("./Routes/tbl_retailer_product_description")
app.use("/", retailerProductsDescription);

const { retailerProductsImages } = require("./Routes/tbl_retailer_product_images")
app.use("/", retailerProductsImages);

const { retailerBanking } = require("./Routes/tbl_retailer_banking")
app.use("/", retailerBanking);
///////////////

////for swagger 
const swaggerui = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "NODE JS API DOCUMENTATION by Shrayansh",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:7000"
            }
        ]
    },
    apis: ["./Routes/tbl_admin_user.js"]
}
const swaggerSpec = swaggerJSDoc(option)
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec))

app.listen(port, () => {
    console.log(`server is running on ${port}`)
});
