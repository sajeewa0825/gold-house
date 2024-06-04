const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const verifyEmail = async (req, res) => {
    const { token } = req.query;
    const userModel = mongoose.model('user');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        await userModel.findOne({ email: decoded.email }).then((user) => { 
            if (!user) {
                res.status(400).send('Invalid Email.');
            }
        });

        await userModel.updateOne({ email: decoded.email }, { status: 'active' }).then((user) => {
            res.status(200).send(`Email ${decoded.email} verified successfully!`);
        });
        
    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
};

module.exports = verifyEmail;

