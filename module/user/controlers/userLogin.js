const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManager = require('../../../manager/jwtmanager');

const login = async (req, res) => {
    const userModel = mongoose.model('user');
    const {email, password} = req.body;

    if(!email){
        res.status(400).json({
            status:"fail",
            message:"email is required"
        });
        return;
    }

    if(!password){
        res.status(400).json({
            status:"fail",
            message:"password is required"
        });
        return;
    }

    const user = await userModel.findOne({email:email})
    if(!user) throw "user not found";

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw "invalid email or password";

    const accessToken = jwtManager(user);

    res.status(200).json({
        status:"success",
        message: 'Login successful',
        accessToken:accessToken
    });
};

module.exports = login