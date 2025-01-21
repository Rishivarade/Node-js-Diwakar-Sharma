const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  const { verificationToken } = req.cookies;
  console.log(verificationToken)
  if (!verificationToken) {
    return res.status(400).json({ message: "Please login again..." });
  }

  jwt.verify(
    verificationToken,
    process.env.privateKey,
    function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: err });
      }

      req.user = decoded.userdata;
      console.log(req.user)
      next();
    }
  );
};

module.exports = isAuth;
