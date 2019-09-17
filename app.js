const express = require("express");
const app = express();

// import routes from api folder
const productRoutes = require("./api/routes/products");
app.use("/products", productRoutes);

// import routes from api folder
const ordersRoutes = require("./api/routes/orders");
app.use("/orders", ordersRoutes);

module.exports = app;
