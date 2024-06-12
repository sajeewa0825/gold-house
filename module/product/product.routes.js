const express = require('express');
const router = express.Router();

// import controllers 
const getAllProducts = require("./controllers/getAllProducts");
const addProducts = require("./controllers/addProducts");
const deleteProduct = require("./controllers/deleteProduct");
const updateProduct = require("./controllers/updateProduct");

// Routes 
router.get('/all',getAllProducts);
router.post('/add',addProducts);
router.delete('/delete/:id',deleteProduct);
router.patch('/update/:id',updateProduct)

// export router 
module.exports = router;
