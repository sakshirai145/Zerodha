const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: { type: String, default: "CNC" },
    name: String,
    qty: { type: Number, default: 0 },
    avg: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    net: String,
    day: String,
    isLoss: Boolean,
  },
  { timestamps: true }
);

PositionsSchema.index({ userId: 1 });
PositionsSchema.index({ userId: 1, name: 1 });

module.exports = PositionsSchema;
