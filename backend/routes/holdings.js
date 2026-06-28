const express = require("express");
const HoldingsModel = require("../models/HoldingsModel");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({ userId: req.userId });
    res.json(holdings);
  } catch (err) {
    console.error("Fetch holdings error:", err);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

module.exports = router;
