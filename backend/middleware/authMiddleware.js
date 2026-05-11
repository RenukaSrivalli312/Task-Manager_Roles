const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * protect — verifies the JWT token from the Authorization header.
 * Attaches the authenticated user to req.user.
 *
 * Usage: add `protect` before any route that requires login.
 */
const protect = async (req, res, next) => {
  try {
    // 1. Check if Authorization header exists and starts with "Bearer"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // 2. Extract the token (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];

    // 3. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find the user from the token's payload
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User belonging to this token no longer exists.",
      });
    }

    // 5. Attach user to request object for use in controllers
    req.user = user;
    next();
  } catch (error) {
    // Handle specific JWT errors with friendly messages
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token has expired. Please login again." });
    }
    next(error);
  }
};

module.exports = { protect };
