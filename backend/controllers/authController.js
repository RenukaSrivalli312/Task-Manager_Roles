const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ─── Helper: Generate JWT ─────────────────────────────────────────────────────
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

// ─── @route   POST /api/auth/register ─────────────────────────────────────────
// ─── @access  Public ──────────────────────────────────────────────────────────
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // ── Basic validation ──────────────────────────────────────────────────────
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password.",
      });
    }

    // ── Check if user already exists ──────────────────────────────────────────
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // ── Hash the password ─────────────────────────────────────────────────────
    // Salt rounds = 10 is a good balance of security and speed
    const hashedPassword = await bcrypt.hash(password, 10);

    // ── Create user ───────────────────────────────────────────────────────────
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // Prevent users from self-assigning admin via registration
      role: role === "admin" ? "user" : role || "user",
    });

    // ── Generate JWT and respond ──────────────────────────────────────────────
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user, // password is excluded via toJSON()
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

// ─── @route   POST /api/auth/login ────────────────────────────────────────────
// ─── @access  Public ──────────────────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ── Basic validation ──────────────────────────────────────────────────────
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    // ── Find user (include password for comparison) ───────────────────────────
    // We use .select("+password") only here — password is hidden by default
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.", // Intentionally vague for security
      });
    }

    // ── Compare passwords ─────────────────────────────────────────────────────
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ── Generate JWT and respond ──────────────────────────────────────────────
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user, // password excluded via toJSON()
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   GET /api/auth/me ────────────────────────────────────────────────
// ─── @access  Private (requires login) ───────────────────────────────────────
const getMe = async (req, res) => {
  // req.user is set by the protect middleware
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

const getUsers = async (_req, res, next) => {
  try {
    const users = await User.find({}, "name email role").sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, getUsers };
