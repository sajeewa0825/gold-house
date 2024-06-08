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
    if(!user){
        res.status(400).json({
            status:"fail",
            message:"invalid email"
        });
        return;
    }

    //check password
    const validPassword = await bcrypt.compare(password, user.password);
    
    if(!validPassword){
        res.status(400).json({
            status:"fail",
            message:"invalid password"
        });
        return;
    
    }


    res.status(200).json({
        status:"success",
        message: 'Login successful',
        accessToken:jwtManager(user)
    });
};

module.exports = login