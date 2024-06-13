// const mongoose = require('mongoose');

// const deleteProduct = async (req, res) => {
//     const Product = mongoose.model('product');

//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) {
//             return res.status(404).json(
//                 {
//                     status: "fail",
//                     message: "Product not found"
//                 }
//             );
//         }
//         res.status(200).json(
//             {
//                 status: "success",
//                 message: "Product deleted successfully",
//                 product: product
//             }
//         );
//     } catch (error) {
//         res.status(500).json(
//             {
//                 status: "fail",
//                 message: error.message
//             }
//         )
//     }
// };

// module.exports = deleteProduct;


// -----------------------------sequelize Mysql------------------------------------------------

const db = require("../../../model/mysql/index");
const Product = db.products;

const deleteProduct = async (req, res) => {
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter

    try {
        // Find the product by ID
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the product
        await product.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

module.exports = deleteProduct;
