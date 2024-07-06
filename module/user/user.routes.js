const express = require("express");
const userRegister = require("./controlers/userRegister");
const userLogin = require("./controlers/userLogin");
const middleware = require("../../middleware/auth");
const resetEmail = require("./controlers/resetEmail");
const resetPassword = require("./controlers/resetPassword");
const emailVerify = require("./controlers/emailVerify");
const resetEmailVerify = require("./controlers/resetEmailVerify"); 
const getTotalCustomers = require("./controlers/getTotalCustomers")

const userRoutes = express.Router() 

// Routes
userRoutes.post("/register",userRegister);
userRoutes.post("/login",userLogin);
userRoutes.post("/reset-email",resetEmail);
userRoutes.post("/password-reset",resetPassword);
userRoutes.get("/verify-email",emailVerify);
userRoutes.get("/password-reset",resetEmailVerify);
userRoutes.use(middleware);
userRoutes.get('/total-customers', getTotalCustomers); 

// userRoutes.get("/dashbord",userDashbord)

module.exports = userRoutes