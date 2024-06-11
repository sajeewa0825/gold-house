const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const verifyEmail = async (req, res) => {
    const { token } = req.query;
    const userModel = mongoose.model('user');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exists
        const user = await userModel.findOne({ email: decoded.data });
        if (!user) {
            return res.status(400).send('Invalid Email.');
        }

        // If the user is found, send the HTML file
        res.sendFile(path.join(__dirname, 'public', 'passwordReset.html'));
    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
};

module.exports = verifyEmail;
