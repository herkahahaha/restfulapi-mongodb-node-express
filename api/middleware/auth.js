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
