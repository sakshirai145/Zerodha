const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    qty: { type: Number, default: 0 },
    avg: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    net: String,
    day: String,
    isLoss: Boolean,
    investment: { type: Number, default: 0 },
  },
  { timestamps: true }
);

HoldingsSchema.index({ userId: 1 });
HoldingsSchema.index({ userId: 1, name: 1 });

module.exports = HoldingsSchema;
