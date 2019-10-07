<h1 align="center" >RESTfulApi by Node/Express and Mongodb</h1>

## Intro

> Pembuatan Restful-API menggunakan Javascript Syntax dari sisi backend dengan library NodeJs dan database Non-SQL yakni MongoDB

### Project Setup

```
Branch: refactoring (clean-code with controller Setup)
```

1. order-control.js <br/>

- mengambil seluruh data order

```js
const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

// get all data order
exports.get_all = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.productId,
            quantity: doc.quantity,
            requested: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
```

- membuat order baru

```js
// create new order
exports.create_order = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
```

- mendapatkan data yang spesifik

```js
// delete order
exports.delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "order delete",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
```

> terlihat banyak logic yang sama, ini disengaja untuk pembelajaran memahami project ini bekerja.

2. product-control
3. user-control
