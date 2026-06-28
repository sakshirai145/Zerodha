const express = require("express");
const mongoose = require("mongoose");
const WatchlistModel = require("../models/WatchlistModel");
const OrdersModel = require("../models/OrdersModel");
const HoldingsModel = require("../models/HoldingsModel");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    let watchlist = await WatchlistModel.findOne({ userId: req.userId });
    if (!watchlist) {
      watchlist = await WatchlistModel.create({
        userId: req.userId,
        items: [],
      });
    }

    const nullPriceItems = watchlist.items.filter((i) => i.price === null);
    if (nullPriceItems.length > 0) {
      const symbols = nullPriceItems.map((i) => i.symbol);
      const orders = await OrdersModel.aggregate([
        { $match: { userId: req.userId, name: { $in: symbols } } },
        { $sort: { createdAt: -1 } },
        { $group: { _id: "$name", price: { $first: "$price" }, createdAt: { $first: "$createdAt" } } },
      ]);
      const orderMap = {};
      for (const o of orders) orderMap[o._id] = o;

      const missingSymbols = nullPriceItems
        .filter((i) => !orderMap[i.symbol])
        .map((i) => i.symbol);
      const holdings = missingSymbols.length > 0
        ? await HoldingsModel.find({ userId: req.userId, name: { $in: missingSymbols } }).lean()
        : [];

      const holdingMap = {};
      for (const h of holdings) holdingMap[h.name] = h;

      for (const item of watchlist.items) {
        if (item.price !== null) continue;
        const order = orderMap[item.symbol];
        if (order) {
          item.price = order.price;
          item.priceUpdatedAt = order.createdAt;
        } else {
          const holding = holdingMap[item.symbol];
          if (holding) {
            item.price = holding.price;
            item.priceUpdatedAt = holding.updatedAt;
          }
        }
      }
    }

    res.json(watchlist);
  } catch (err) {
    console.error("Fetch watchlist error:", err);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const { symbol, name } = req.body;
    if (!symbol || !symbol.trim()) {
      return res.status(400).json({ error: "Symbol required" });
    }

    let watchlist = await WatchlistModel.findOne({ userId: req.userId });
    if (!watchlist) {
      watchlist = await WatchlistModel.create({
        userId: req.userId,
        items: [],
      });
    }

    const exists = watchlist.items.find((i) => i.symbol === symbol);
    if (exists) return res.status(409).json({ error: "Already in watchlist" });

    const order = await OrdersModel.findOne(
      { userId: req.userId, name: symbol },
      {},
      { sort: { createdAt: -1 } }
    ).lean();

    const price = order ? order.price : null;
    const priceUpdatedAt = order ? order.createdAt : null;

    watchlist.items.push({ symbol, name: name || symbol, price, priceUpdatedAt });
    await watchlist.save();
    res.json(watchlist);
  } catch (err) {
    console.error("Add to watchlist error:", err);
    res.status(500).json({ error: "Failed to add" });
  }
});

router.delete("/:symbol", auth, async (req, res) => {
  try {
    let watchlist = await WatchlistModel.findOne({ userId: req.userId });
    if (!watchlist) return res.status(404).json({ error: "Watchlist not found" });

    watchlist.items = watchlist.items.filter(
      (i) => i.symbol !== req.params.symbol
    );
    await watchlist.save();
    res.json(watchlist);
  } catch (err) {
    console.error("Remove from watchlist error:", err);
    res.status(500).json({ error: "Failed to remove" });
  }
});

module.exports = router;
