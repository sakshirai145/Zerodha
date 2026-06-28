import React, { useState, useEffect, useContext } from "react";
import { VerticalGraph } from "./VerticalGraph";
import client from "../api/client";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    client
      .get("/api/holdings", { signal: abortController.signal })
      .then((res) => {
        setAllHoldings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        if (err.response?.status !== 401) {
          setError(err.userMessage || "Failed to load holdings");
        }
        setLoading(false);
      });
    return () => abortController.abort();
  }, [refreshKey]);

  if (loading) {
    return <p style={{ color: "#999", padding: "20px" }}>Loading holdings...</p>;
  }

  if (error) {
    return <p style={{ color: "#d32f2f", padding: "20px" }}>{error}</p>;
  }

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totalInvestment = allHoldings.reduce(
    (sum, s) => sum + (s.investment || s.avg * s.qty),
    0
  );
  const totalCurrent = allHoldings.reduce(
    (sum, s) => sum + s.price * s.qty,
    0
  );
  const totalPnl = totalCurrent - totalInvestment;
  const pnlPercent =
    totalInvestment > 0 ? ((totalPnl / totalInvestment) * 100).toFixed(2) : "0.00";

  if (allHoldings.length === 0) {
    return (
      <>
        <h3 className="title">Holdings (0)</h3>
        <p style={{ color: "#999", fontSize: "14px" }}>No holdings yet. Buy your first stock!</p>
      </>
    );
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";
              const pnl = curValue - stock.avg * stock.qty;
              const pnlPercentStock =
                stock.avg > 0
                  ? ((pnl / (stock.avg * stock.qty)) * 100).toFixed(2)
                  : "0.00";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>{pnlPercentStock}%</td>
                  <td className={dayClass}>{stock.day || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrent.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnl >= 0 ? "profit" : "loss"}>
            {totalPnl.toFixed(2)} ({pnlPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
