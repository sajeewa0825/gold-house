const express = require('express');
const router = express.Router();
const multer = require('multer');
const middleware = require("../../middleware/auth");

const getAllProducts = require("./controllers/getAllProducts");
const addProducts = require("./controllers/addProducts");
const deleteProduct = require("./controllers/deleteProduct");
const updateProduct = require("./controllers/updateProduct");
const productFilters = require("./controllers/productFilters");
const buyProduct = require("./controllers/buyProduct");

// Setup Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes 
router.get('/all',getAllProducts);
router.get('/filter',productFilters);
router.use(middleware);
router.post('/add', upload.array('images', 5), addProducts);
router.delete('/delete/:id',deleteProduct);
router.patch('/update/:id',updateProduct)
router.post('/buy', buyProduct);

// export router 
module.exports = router;
