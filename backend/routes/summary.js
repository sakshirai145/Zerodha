const express = require("express");
const FundModel = require("../models/FundModel");
const HoldingsModel = require("../models/HoldingsModel");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const [fund, holdings] = await Promise.all([
      FundModel.findOne({ userId: req.userId }),
      HoldingsModel.find({ userId: req.userId }),
    ]);

    res.json({
      fund: fund || { availableBalance: 0, usedMargin: 0, openingBalance: 0 },
      holdings: holdings || [],
    });
  } catch (err) {
    console.error("Fetch summary error:", err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

module.exports = router;
