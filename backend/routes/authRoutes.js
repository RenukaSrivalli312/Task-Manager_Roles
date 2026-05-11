const express = require("express");
const router = express.Router();
const { register, login, getMe, getUsers } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// POST /api/auth/register — Create a new account
router.post("/register", register);

// POST /api/auth/login — Login and get a JWT token
router.post("/login", login);

// GET /api/auth/me — Get the currently logged-in user (requires token)
router.get("/me", protect, getMe);
router.get("/users", protect, authorizeRoles("admin"), getUsers);

module.exports = router;
