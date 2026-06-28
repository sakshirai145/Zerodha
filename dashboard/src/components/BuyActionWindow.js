import React, { useState, useEffect, useContext } from "react";

import client from "../api/client";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.05);
  const [mode, setMode] = useState("BUY");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const [heldQty, setHeldQty] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);
  const { closeBuyWindow, triggerRefresh } = useContext(GeneralContext);

  const totalCost = stockQuantity * stockPrice;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    Promise.all([
      client.get("/api/funds", { signal }),
      client.get("/api/holdings", { signal }),
    ])
      .then(([fundRes, holdingsRes]) => {
        setAvailableBalance(fundRes.data.fund?.availableBalance ?? 0);
        const holding = holdingsRes.data.find((h) => h.name === uid);
        setHeldQty(holding ? holding.qty : 0);
        setDataLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        setMessage("Failed to load account data");
        setDataLoading(false);
      });
    return () => abortController.abort();
  }, [uid]);

  const getValidationError = () => {
    if (!stockQuantity || stockQuantity <= 0) return "Enter a valid quantity";
    if (!stockPrice || stockPrice <= 0) return "Enter a valid price";
    if (mode === "BUY") {
      if (totalCost > availableBalance)
        return `Insufficient funds. Need ₹${totalCost.toFixed(2)} but only ₹${availableBalance.toFixed(2)} available`;
    } else {
      if (stockQuantity > heldQty)
        return `Insufficient holding. You hold ${heldQty} shares of ${uid}`;
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationError = getValidationError();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    if (loading) return;
    setLoading(true);
    setMessage("");

    const endpoint =
      mode === "BUY" ? "/api/trade/buy" : "/api/trade/sell";

    try {
      await client.post(endpoint, {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
      });
      triggerRefresh();
      closeBuyWindow();
    } catch (err) {
      if (err.response?.status !== 401) {
        setMessage(err.userMessage || "Transaction failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="container" id="buy-window" draggable="true">
        <div className="regular-order">
          <p style={{ textAlign: "center", color: "#999" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="mode-selector">
          <button
            className={`mode-btn ${mode === "BUY" ? "mode-buy-active" : ""}`}
            onClick={() => { setMode("BUY"); setMessage(""); }}
          >
            Buy
          </button>
          <button
            className={`mode-btn ${mode === "SELL" ? "mode-sell-active" : ""}`}
            onClick={() => { setMode("SELL"); setMessage(""); }}
          >
            Sell
          </button>
        </div>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0.05"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
        <div className="total-cost">
          Total: ₹{totalCost.toFixed(2)}
        </div>
        {mode === "BUY" ? (
          <div className="balance-info" style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            Available: ₹{availableBalance.toFixed(2)}
          </div>
        ) : (
          <div className="balance-info" style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            Held: {heldQty} shares
          </div>
        )}
        {message && <p className="trade-error">{message}</p>}
      </div>

      <div className="buttons">
        <span>Margin required ₹{totalCost.toFixed(2)}</span>
        <div>
          <button
            className={`btn ${mode === "BUY" ? "btn-blue" : "btn-sell"}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : mode === "BUY"
              ? "Buy"
              : "Sell"}
          </button>
          <button className="btn btn-grey" onClick={closeBuyWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
