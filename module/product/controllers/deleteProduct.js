const mongoose = require('mongoose');

const deleteProduct = async (req, res) => {
    const Product = mongoose.model('product');

    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json(
                {
                    status: "fail",
                    message: "Product not found"
                }
            );
        }
        res.status(200).json(
            {
                status: "success",
                message: "Product deleted successfully",
                product: product
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                status: "fail",
                message: error.message
            }
        )
    }
};

module.exports = deleteProduct;