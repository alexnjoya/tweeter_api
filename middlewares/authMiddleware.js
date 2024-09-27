const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};

module.exports = authenticate;