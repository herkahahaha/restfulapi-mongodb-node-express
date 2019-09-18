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
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc.id,
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            request: {
              Type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };
      res.status(202).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// POST
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "created product successfully",
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          requested: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// GET specific data with id
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then(doc => {
      console.log("from db", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "no valid entry found for provide ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// PATCH to update data same on PUT
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product Update",
        request: {
          type: "GET",
          url: "http://localhost:3000/products" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// DELETE
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product Delete",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { name: "String", price: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
