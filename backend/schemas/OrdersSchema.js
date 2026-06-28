const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    mode: { type: String, enum: ["BUY", "SELL"], required: true },
    status: {
      type: String,
      enum: ["pending", "executed", "cancelled"],
      default: "executed",
    },
  },
  { timestamps: true }
);

OrdersSchema.index({ userId: 1, createdAt: -1 });
OrdersSchema.index({ userId: 1, mode: 1 });

module.exports = OrdersSchema;
