const express = require("express");
const mongoose = require("mongoose");
const FundModel = require("../models/FundModel");
const TransactionModel = require("../models/TransactionModel");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    let fund = await FundModel.findOne({ userId: req.userId });
    if (!fund) {
      fund = await FundModel.create({ userId: req.userId });
    }
    const transactions = await TransactionModel.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });
    res.json({ fund, transactions });
  } catch (err) {
    console.error("Fetch funds error:", err);
    res.status(500).json({ error: "Failed to fetch funds" });
  }
});

router.post("/deposit", auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount } = req.body;
    const parsed = Number(amount);
    if (!amount || !Number.isFinite(parsed) || parsed <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Invalid amount" });
    }

    let fund = await FundModel.findOne({ userId: req.userId }).session(session);
    if (!fund) {
      fund = await FundModel.create(
        [{ userId: req.userId }],
        { session }
      );
      fund = fund[0];
    }

    fund.availableBalance += parsed;
    fund.openingBalance += parsed;
    await fund.save({ session });

    await TransactionModel.create(
      [{
        userId: req.userId,
        type: "deposit",
        amount: parsed,
        description: "Funds deposited",
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({ fund });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Deposit error:", err);
    res.status(500).json({ error: "Failed to deposit" });
  }
});

router.post("/withdraw", auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount } = req.body;
    const parsed = Number(amount);
    if (!amount || !Number.isFinite(parsed) || parsed <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Invalid amount" });
    }

    let fund = await FundModel.findOne({ userId: req.userId }).session(session);
    if (!fund) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "No account" });
    }

    if (fund.availableBalance < parsed) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Insufficient balance" });
    }

    fund.availableBalance -= parsed;
    fund.openingBalance -= parsed;
    await fund.save({ session });

    await TransactionModel.create(
      [{
        userId: req.userId,
        type: "withdraw",
        amount: parsed,
        description: "Funds withdrawn",
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({ fund });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Withdraw error:", err);
    res.status(500).json({ error: "Failed to withdraw" });
  }
});

module.exports = router;
