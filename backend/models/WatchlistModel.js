const mongoose = require("mongoose");

const WatchlistItemSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  name: { type: String, default: "" },
  price: { type: Number, default: null },
  priceUpdatedAt: { type: Date, default: null },
});

const WatchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [WatchlistItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Watchlist", WatchlistSchema);
