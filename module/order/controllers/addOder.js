// controllers/addOrder.js

const db = require('../../../model/mysql/index'); // Adjust the path as necessary
const Order = db.order;
const Product = db.products;
const User = db.user;
const sendMail = require('../../../manager/mail');

const addOrder = async (req, res) => {
    try {
        const { userId, productId, quantity, address, totalPrice, name, phone, email } = req.body;

        // Validate the input data
        if (!userId || !productId || !quantity || !address || !totalPrice || !name || !phone) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Find the user and product to ensure they exist
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        console.log('User:', user['dataValues']);
        console.log('Product:', product['dataValues']);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // // Calculate the total price
        // const totalPrice = product.price * quantity;

        // Create the order
        const newOrder = await Order.create({
            userId,
            productId,
            quantity,
            totalPrice,
            address,
            name,
            phone,
            email
        });

        res.status(201).json(newOrder);
        console.log('Order created successfully:', newOrder);

        data = {
            name: name,
            phone: phone,
            email: email,
            address: address,
            product: product['dataValues'].title,
            quantity: quantity,
            totalPrice: totalPrice
        }

        sendMail(email,"Order",data);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'An error occurred while creating the order.' });
    }
};

module.exports = addOrder;
