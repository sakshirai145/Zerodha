const express = require("express");
const PositionsModel = require("../models/PositionsModel");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const positions = await PositionsModel.find({ userId: req.userId });
    res.json(positions);
  } catch (err) {
    console.error("Fetch positions error:", err);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

module.exports = router;
