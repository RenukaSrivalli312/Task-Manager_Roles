/**
 * authorizeRoles — restricts a route to specific roles.
 *
 * Usage: authorizeRoles("admin")  or  authorizeRoles("admin", "manager")
 * Must be used AFTER the `protect` middleware.
 *
 * Example:
 *   router.post("/tasks", protect, authorizeRoles("admin"), createTask);
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is set by the protect middleware
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(" or ")}. Your role: ${req.user.role}`,
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };
