const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const resetPw = async (req, res) =>{
    const {email, resetCode, newpw} = req.body

    const userModel = mongoose.model("user");

    if(!email) throw "Email is reqired"
    if(!resetCode) throw "reset Code is required"
    if(!newpw) throw "password is required"

    const hash = await bcrypt.hash(newpw, 10);

    const user = await userModel.findOne({
        email:email,
        resetCode:resetCode
    })

    if(!user) throw "Reset code incorrect"

    await userModel.findOneAndUpdate({
        email:email
    },{
        password:hash
    },{
        runValidators: true,
    })
    
    res.status(200).json({
        status:"password reset succesfull "
    })

}

module.exports = resetPw;