const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const verifyEmail = async (req, res) => {
    const { token } = req.query;
    const userModel = mongoose.model('user');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exists
        await userModel.findOne({ email: decoded.data }).then((user) => { 
            if (!user) {
                res.status(400).send('Invalid Email.');
            }
        });

        // Update the user status to active
        await userModel.updateOne({ email: decoded.data }, { status: 'active' }).then((user) => {
            res.status(200).send(`Email ${decoded.data} verified successfully!`);
        });
        
    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
};

module.exports = verifyEmail;

