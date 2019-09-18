const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const mongoose = require("mongoose");
// GET
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price_id productImage")
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// POST
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Schema.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  res.status(201).json({
    message: "created product successfully",
    createdProduct: product
  });
});

// GET specific data with id
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "you discovered special id"
    });
  } else {
    res.status().json({
      message: "you passed on ID"
    });
  }
});

// PATCH to update data same on PUT
router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "update product"
  });
});

// DELETE
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
