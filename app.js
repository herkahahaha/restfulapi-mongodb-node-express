const express = require("express");
const app = express();

// import routes from api folder
const productRoutes = require("./api/routes/product");
app.use("/products", productRoutes);

module.exports = app;
