const express = require("express");
const mongoose = require("mongoose");
const OrdersModel = require("../models/OrdersModel");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const { mode, from, to } = req.query;
    const filter = { userId: req.userId };

    if (mode && ["BUY", "SELL"].includes(mode.toUpperCase())) {
      filter.mode = mode.toUpperCase();
    }

    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const orders = await OrdersModel.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.patch("/:id/cancel", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }
    const order = await OrdersModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId, status: "pending" },
      { status: "cancelled" },
      { new: true }
    );
    if (!order) {
      return res
        .status(404)
        .json({ error: "Pending order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error("Cancel order error:", err);
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }
    const order = await OrdersModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = router;
