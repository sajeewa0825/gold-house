// const mongoose = require('mongoose');

// const updateProduct = async (req, res) => {
//     const Product = mongoose.model('product');

//     try {
//         const product = await Product.findByIdAndUpdate(req.params.id , req.body, {new: true});

//         if (!product) {
//             return res.status(404).json (
//                 {
//                     status: "fail",
//                     message: "Product not found"
//                 }
//             )
//         }

//         res.status(200).json(
//             {
//                 status: "success",
//                 message: "Product updated successfully",
//                 product: product
//             }
//         );

//     }catch (error) {
//         res.status(500).json(
//             {
//                 status: "fail",
//                 message: error.message
//             }
//         )
//     }
// };

// module.exports = updateProduct;



// -----------------------------sequelize Mysql------------------------------------------------

const db = require("../../../model/mysql/index");
const Product = db.products;

const updateProduct = async (req, res) => {
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter
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
        style,
        review
    } = req.body;

    console.log("length  ", length)
    console.log("color  ", color)

    try {
        // Find the product by ID
        let product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const length1 = length.map(len => {
            return {
                length: len
            }
        })

        const color1 = color.map(co => {
            return {
                color: co
            }
        })



        // Update product fields
        product.title = title || product.title;
        product.category = category || product.category;
        product.price = price || product.price;
        product.description = description || product.description;
        product.stock = stock || product.stock;
        product.metal = metal || product.metal;
        product.weight = weight || product.weight;
        product.length = JSON.stringify(length1) || product.length;
        product.width = width || product.width;
        product.ring_size = ring_size || product.ring_size;
        product.color = JSON.stringify(color1) || product.color;
        product.stone = stone || product.stone;
        product.gender = gender || product.gender;
        product.iced_product = iced_product !== undefined ? iced_product : product.iced_product;
        product.style = style || product.style;
        product.review = review || product.review;

        // Handle updated images if provided in form data
        console.log(req.files)
        if (req.files && req.files.length > 0) {
            const updatedImages = req.files.map(file => ({
                url: '/uploads/' + file.filename // Assuming 'uploads' is your upload directory
            }));
            product.images = JSON.stringify(updatedImages);
        }


        // Save updated product
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = updateProduct;
