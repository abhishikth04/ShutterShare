const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  
  // Bearer token format: "Bearer <token>"
  const token = authHeader.split(" ")[1]; // get the token part after "Bearer"
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token malformed." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attaches user info to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
