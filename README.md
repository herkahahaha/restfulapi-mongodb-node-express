<h1 align="center" >RESTfulApi by Node/Express and Mongodb</h1>

## Intro

> Pembuatan Restful-API menggunakan Javascript Syntax dari sisi backend dengan library NodeJs dan database Non-SQL yakni MongoDB

### Project Setup

```
Branch: dev (auth Setup)
```

- penambahan middleware folder sebagai authentifikasi untuk user aksess

```js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // using jwt verify to protect data with auth
    const decoded = jwt.verify(token, "secretkeyusingenvfordevelopment");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed!"
    });
  }
};
```

- import kedalam file orders.js dan product.js

```js
// import middleware to protect data
const Auth = require("../middleware/auth");
```
