const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const sendMail = require("../../../manager/mail")
const jwtEncrypt = require("../../../manager/jwtEncrypt")


const register = async (req, res) => {

    const { name, email, password } = req.body
    const userModel = mongoose.model("user");

    if (!name) {
        res.status(400).json({
            status: "fail",
            massage: "name is required"
        })
        return
    }

    if (!email) {
        res.status(400).json({
            status: "fail",
            massage: "email is required"
        })
        return
    }

    if (!password) {
        res.status(400).json({
            status: "fail",
            massage: "password is required"
        })
        return
    }

    if (password.length < 6) {
        res.status(400).json({
            status: "fail",
            massage: "password must be 6 character long"
        })
        return
    }

    //check email exist or not
    const checkemail = await userModel.findOne({ email: email })

    if (checkemail) {
        res.status(400).json({
            status: "fail",
            massage: "email already exist"
        })
        return
    }

    //hash password
    const hash = await bcrypt.hash(password, 10);

    //save data
    await userModel.create({
        name: name,
        email: email,
        password: hash,
        status: 'pending'
    }).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });

    const token = jwtEncrypt(email)
    const link = `${process.env.BASE_URL}/api/user/verify-email?token=${token}`
    await sendMail(email, "Register", link)

    res.status(200).json({
        status: "succesfull",
        massage: "Email Verification link has been sent to your email"
    })
}

module.exports = register