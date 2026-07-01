require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const isProduction = process.env.NODE_ENV === "production";

const requiredEnvs = ["MONGODB_URI", "JWT_SECRET"];
const missing = requiredEnvs.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const PORT = process.env.PORT;
if (!PORT) {
  console.error("Missing required env var: PORT");
  process.exit(1);
}
const uri = process.env.MONGODB_URI;

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const ordersRoutes = require("./routes/orders");
const holdingsRoutes = require("./routes/holdings");
const positionsRoutes = require("./routes/positions");
const fundsRoutes = require("./routes/funds");
const tradeRoutes = require("./routes/trade");
const watchlistRoutes = require("./routes/watchlist");
const summaryRoutes = require("./routes/summary");
const appsRoutes = require("./routes/apps");

const app = express();
app.set("trust proxy", 1);

app.use(helmet());

const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
]
  .filter(Boolean)
  .map((o) => o.replace(/\/+$/, ""));

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"],
};
app.use(cors(corsOptions));

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: isProduction ? "production" : "development",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/holdings", holdingsRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/funds", fundsRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/apps", appsRoutes);

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} (${isProduction ? "production" : "development"})`
      );
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = app;
