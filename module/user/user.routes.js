const express = require("express");
const userRegister = require("./controlers/userRegister")
const userLogin = require("./controlers/userLogin")
const middleware = require("../../middleware/auth")
const frogetPw = require("./controlers/frogetPassword");
const resetPw = require("./controlers/resetPassword");
const emailVerify = require("./controlers/emailVerify");

const userRoutes = express.Router() 

// Routes
userRoutes.post("/register",userRegister)
userRoutes.post("/login",userLogin)
userRoutes.post("/frogetpw",frogetPw)
userRoutes.post("/resetpw",resetPw)
userRoutes.get("/verify-email",emailVerify)
userRoutes.use(middleware)
// userRoutes.get("/dashbord",userDashbord)

module.exports = userRoutes