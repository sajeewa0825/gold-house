const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
const path = require('path');
const userRoutes = require("./module/user/user.routes")
const productRoutes = require("./module/product/product.routes")
const wishlistRoutes = require("./module/wishlist/wishlist.routes")

const port = 3000;
const app = express();

// handle cors error
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_DB_URL, {}).then(() => {
    console.log("Database connection succesfuly");
}).catch((err) => {
    console.log(err);
})

// mongoose.model("User", userSchema)
require("./model/userModel")
require("./model/productModel")

// Main route
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/wishlist", wishlistRoutes);

// handle 404 not found error
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "404 not found"
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
