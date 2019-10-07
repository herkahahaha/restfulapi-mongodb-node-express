<h1 align="center" >RESTfulApi by Node/Express and Mongodb</h1>

## Intro

> Pembuatan Restful-API menggunakan Javascript Syntax dari sisi backend dengan library NodeJs dan database Non-SQL yakni MongoDB

### Project Setup

```
Branch: usersetup (user Setup)
```

> penambahan logic pemograman dan model schema data untuk user/pengguna.

- models<br/>
  file "user.js"

```js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
```

- routes<br/>
  file "users.js" <br/>

1. signup

```js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Signup for new users
router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "email exist"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({ message: "user created" });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});
```

2. Login

```js
// Login using auth by jsonwebtoken
router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            "secretkeyusingenvfor development",
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Auth Success",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth Failed"
        });
      });
    });
});
```

3. Delete User

```js
// delete user
router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "User Delete"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
```

- import kedalam file root ex: app.js

```js
/* ----------------------------
  import routes from api folder 
--------------------------------*/
const productRoutes = require("./api/routes/products");
app.use("/products", productRoutes);
const ordersRoutes = require("./api/routes/orders");
app.use("/orders", ordersRoutes);
const usersRoutes = require("./api/routes/users");
app.use("/users", usersRoutes);
```
