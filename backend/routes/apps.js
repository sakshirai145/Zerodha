const express = require("express");

const router = express.Router();

const apps = [
  {
    name: "Kite",
    description: "Our flagship trading platform for stocks, derivatives, and more.",
    url: "https://kite.zerodha.com",
  },
  {
    name: "Coin",
    description: "Direct mutual fund investing — ₹0 commissions & DP charges.",
    url: "https://coin.zerodha.com",
  },
  {
    name: "Console",
    description: "Reports, statements, tax P&L, and portfolio analysis.",
    url: "https://console.zerodha.com",
  },
  {
    name: "Varsity",
    description: "Free and in-depth stock market educational modules.",
    url: "https://zerodha.com/varsity",
  },
  {
    name: "Pulse",
    description: "Track market activity, news, and insights in real-time.",
    url: "https://pulse.zerodha.com",
  },
  {
    name: "Zerodha Fund House",
    description: "Simple and transparent index fund investments.",
    url: "https://www.zerodhafundhouse.com",
  },
];

router.get("/", (req, res) => {
  res.json(apps);
});

module.exports = router;
