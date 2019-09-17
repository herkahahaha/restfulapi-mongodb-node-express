const express = require("express");
const app = express();

// handling project setup
const morgan = require("morgan");
app.use(morgan("dev"));

// import routes from api folder
const productRoutes = require("./api/routes/products");
app.use("/products", productRoutes);

const ordersRoutes = require("./api/routes/orders");
app.use("/orders", ordersRoutes);

/* ------------------
    Handling Error 
---------------------*/
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status(404);
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: "error message" } });
});

module.exports = app;
