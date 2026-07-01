const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const User = require("../models/UserModel");
const Fund = require("../models/FundModel");
const Watchlist = require("../models/WatchlistModel");
const { JWT_SECRET } = require("../middleware/auth");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again later." },
});

router.use(authLimiter);

function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 10) {
      return res.status(400).json({
        error: "Phone must have at least 10 digits",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(409).json({
        error: "Email already registered",
      });
    }

    // Create User
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });

    // Create default Fund document
    await Fund.create({
      userId: user._id,
    });

    // Create default Watchlist
    await Watchlist.create({
      userId: user._id,
      items: [],
    });

    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);

    res.status(500).json({
      error: "Server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = signToken(user._id);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Login error:", err);

    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;