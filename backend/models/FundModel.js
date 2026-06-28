const mongoose = require("mongoose");

const FundSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    availableBalance: { type: Number, default: 100000 },
    usedMargin: { type: Number, default: 0 },
    openingBalance: { type: Number, default: 100000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fund", FundSchema);
