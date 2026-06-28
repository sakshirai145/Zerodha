import React, { useState, useEffect, useContext } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const { user } = useAuth();
  const { refreshKey } = useContext(GeneralContext);
  const [funds, setFunds] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    client
      .get("/api/summary", { signal: abortController.signal })
      .then((res) => {
        setFunds(res.data.fund);
        setHoldings(res.data.holdings);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        if (err.response?.status !== 401) {
          setError(err.userMessage || "Failed to load summary");
        }
        setLoading(false);
      });
    return () => abortController.abort();
  }, [refreshKey]);

  if (loading) {
    return <p style={{ color: "#999", padding: "20px" }}>Loading summary...</p>;
  }

  if (error) {
    return <p style={{ color: "#d32f2f", padding: "20px" }}>{error}</p>;
  }

  const totalInvestment = holdings.reduce(
    (sum, h) => sum + (h.investment || h.avg * h.qty),
    0
  );
  const totalCurrent = holdings.reduce((sum, h) => sum + h.price * h.qty, 0);
  const totalPnl = totalCurrent - totalInvestment;
  const pnlPercent =
    totalInvestment > 0
      ? ((totalPnl / totalInvestment) * 100).toFixed(2)
      : "0.00";

  const availableBalance = funds?.availableBalance ?? 0;
  const openingBalance = funds?.openingBalance ?? 0;
  const usedMargin = funds?.usedMargin ?? 0;

  return (
    <>
      <div className="username">
        <h6>Hi, {user?.name || "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>
              {availableBalance >= 1000
                ? (availableBalance / 1000).toFixed(2) + "k"
                : availableBalance.toFixed(2)}
            </h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{usedMargin.toFixed(2)}</span>
            </p>
            <p>
              Opening balance <span>{openingBalance.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalPnl >= 0 ? "profit" : ""}>
              {(totalPnl >= 1000
                ? (totalPnl / 1000).toFixed(2) + "k"
                : totalPnl.toFixed(2))}{" "}
              <small>{totalPnl >= 0 ? "+" : ""}{pnlPercent}%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value{" "}
              <span>
                {totalCurrent >= 1000
                  ? (totalCurrent / 1000).toFixed(2) + "k"
                  : totalCurrent.toFixed(2)}
              </span>
            </p>
            <p>
              Investment{" "}
              <span>
                {totalInvestment >= 1000
                  ? (totalInvestment / 1000).toFixed(2) + "k"
                  : totalInvestment.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
