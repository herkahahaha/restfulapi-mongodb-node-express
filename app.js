const express = require("express");
const app = express();

// handling project setup
const morgan = require("morgan");
app.use(morgan("dev"));

/* ------------------
        CORS 
---------------------*/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
    return res.status(200).json({});
  }
  next();
});

/* ------------------
    Body Parser 
---------------------*/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* ----------------------------
  import routes from api folder 
--------------------------------*/
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
  res.json({ error: { message: error.message } });
});

/* ------------------
   Mongodb connection
---------------------*/
const mongoose = require("mongoose");
// you can set monggo atlas, dont forget to setup env
const mongoDb = "mongodb://localhost:27017/simple-shop-db";
mongoose
  .connect(mongoDb, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => {
    console.log(err);
  });
mongoose.Promise = global.Promise;
module.exports = app;
