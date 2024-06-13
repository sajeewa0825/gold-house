// const mongoose = require('mongoose');

// const addProducts = async (req, res) => {
//   const Product = mongoose.model('product');
//  // one product add 
//   // try {
//   //   const newProduct = new Product({
//   //     title: req.body.title,
//   //     category: req.body.category,
//   //     price: req.body.price,
//   //     description: req.body.description,
//   //     stock: req.body.stock,
//   //     metal: req.body.metal,
//   //     weight: req.body.weight,
//   //     length: req.body.length,
//   //     width: req.body.width,
//   //     ring_size: req.body.ring_size,
//   //     color: req.body.color,
//   //     stone: req.body.stone,
//   //     images: req.body.images,
//   //     gender: req.body.gender,
//   //     iced_product: req.body.iced_product,
//   //     style: req.body.style,
//   //   });
//   //   await newProduct.save();
//   //   res.status(201).json ({ status: "success", product: newProduct, message: "Product added successfully" });
//   // } catch (error) {
//   //   res.status(409).json({ status: "unsuccess", message: error.message });
//   // }


//   // bulk products add 
//   try {
//     const products = req.body; // assuming that you're sending an array of products
//     const newProducts = products.map(product => new Product(product));
//     const result = await Product.insertMany(newProducts);
//     res.status(201).json({status : "success", message : "Products added successfully", data: result});
// } catch (error) {
//     res.status(409).json({ status:"unsuccess", message: error.message });  
// }
// };




// module.exports = addProducts;

const db = require("../../../model/mysql/index");

// Mysql DB model call
const Product = db.products;
const multer = require('multer');
const upload = multer();

const addProducts = async (req, res) => {
    const {
        title,
        category,
        price,
        description,
        stock,
        metal,
        weight,
        length,
        width,
        ring_size,
        color,
        stone,
        gender,
        iced_product,
        style
    } = req.body;

    const images = req.files.map(file => {
      return file.buffer.toString('base64'); // Convert buffer to Base64 string
  });

    try {
        const product = await Product.create({
            title,
            category,
            price,
            description,
            stock,
            metal,
            weight,
            length,
            width,
            ring_size,
            color,
            stone,
            images: JSON.stringify(images),
            gender,
            iced_product: iced_product || false,
            style,
            review: [] // Ensure review is not null
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = addProducts;

