const express = require("express");
const mongoose = require("mongoose");
const OrdersModel = require("../models/OrdersModel");
const HoldingsModel = require("../models/HoldingsModel");
const PositionsModel = require("../models/PositionsModel");
const FundModel = require("../models/FundModel");
const TransactionModel = require("../models/TransactionModel");
const WatchlistModel = require("../models/WatchlistModel");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/buy", auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, qty, price } = req.body;

    if (!name || !qty || !price || qty <= 0 || price <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Invalid order parameters" });
    }

    const userId = req.userId;
    const totalCost = qty * price;

    let fund = await FundModel.findOne({ userId }).session(session);
    if (!fund) {
      fund = await FundModel.create(
        [{ userId, availableBalance: 100000, openingBalance: 100000 }],
        { session }
      );
      fund = fund[0];
    }

    if (fund.availableBalance < totalCost) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Insufficient funds" });
    }

    await OrdersModel.create(
      [{ userId, name, qty, price, mode: "BUY" }],
      { session }
    );

    let holding = await HoldingsModel.findOne({ userId, name }).session(
      session
    );

    if (holding) {
      const totalQty = holding.qty + qty;
      const totalInvestment = holding.investment + totalCost;
      holding.avg = totalInvestment / totalQty;
      holding.qty = totalQty;
      holding.investment = totalInvestment;
      holding.price = price;
      holding.isLoss = price < holding.avg;
      await holding.save({ session });
    } else {
      await HoldingsModel.create(
        [
          {
            userId,
            name,
            qty,
            avg: price,
            price,
            investment: totalCost,
            isLoss: false,
          },
        ],
        { session }
      );
    }

    let position = await PositionsModel.findOne({ userId, name }).session(
      session
    );
    if (position) {
      const totalInvestment = position.avg * position.qty + qty * price;
      position.qty += qty;
      position.avg = totalInvestment / position.qty;
      position.price = price;
      position.isLoss = price < position.avg;
      await position.save({ session });
    } else {
      await PositionsModel.create(
        [
          {
            userId,
            name,
            product: "CNC",
            qty,
            avg: price,
            price,
            isLoss: false,
          },
        ],
        { session }
      );
    }

    fund.availableBalance -= totalCost;
    fund.usedMargin += totalCost;
    await fund.save({ session });

    await TransactionModel.create(
      [
        {
          userId,
          type: "buy",
          amount: totalCost,
          description: `Bought ${qty} ${name} @ ${price}`,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    WatchlistModel.updateOne(
      { userId, "items.symbol": name },
      { $set: { "items.$.price": price, "items.$.priceUpdatedAt": new Date() } }
    ).catch((err) => console.error("Watchlist update error:", err));

    res.json({ message: "Buy order executed", fund });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Buy error:", err);
    res.status(500).json({ error: "Failed to execute buy" });
  }
});

router.post("/sell", auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, qty, price } = req.body;

    if (!name || !qty || !price || qty <= 0 || price <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Invalid order parameters" });
    }

    const userId = req.userId;

    const holding = await HoldingsModel.findOne({ userId, name }).session(
      session
    );
    if (!holding || holding.qty < qty) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Insufficient quantity to sell" });
    }

    const totalValue = qty * price;
    const avgCost = holding.avg * qty;
    const pnl = totalValue - avgCost;

    await OrdersModel.create(
      [{ userId, name, qty, price, mode: "SELL" }],
      { session }
    );

    holding.qty -= qty;
    holding.investment -= avgCost;
    if (holding.qty === 0) {
      await HoldingsModel.deleteOne({ _id: holding._id }).session(session);
    } else {
      holding.price = price;
      holding.isLoss = price < holding.avg;
      await holding.save({ session });
    }

    let position = await PositionsModel.findOne({ userId, name }).session(
      session
    );
    if (position) {
      position.qty -= qty;
      if (position.qty === 0) {
        await PositionsModel.deleteOne({ _id: position._id }).session(session);
      } else {
        await position.save({ session });
      }
    }

    let fund = await FundModel.findOne({ userId }).session(session);
    if (!fund) {
      fund = await FundModel.create(
        [{ userId, availableBalance: 100000, openingBalance: 100000 }],
        { session }
      );
      fund = fund[0];
    }

    fund.availableBalance += totalValue;
    fund.usedMargin = Math.max(0, fund.usedMargin - avgCost);
    await fund.save({ session });

    await TransactionModel.create(
      [
        {
          userId,
          type: "sell",
          amount: totalValue,
          description: `Sold ${qty} ${name} @ ${price}`,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    WatchlistModel.updateOne(
      { userId, "items.symbol": name },
      { $set: { "items.$.price": price, "items.$.priceUpdatedAt": new Date() } }
    ).catch((err) => console.error("Watchlist update error:", err));

    res.json({
      message: "Sell order executed",
      fund,
      pnl: parseFloat(pnl.toFixed(2)),
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Sell error:", err);
    res.status(500).json({ error: "Failed to execute sell" });
  }
});

module.exports = router;
