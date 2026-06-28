import React, { useState, useEffect, useContext } from "react";
import client from "../api/client";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    client
      .get("/api/positions", { signal: abortController.signal })
      .then((res) => {
        setAllPositions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        if (err.response?.status !== 401) {
          setError(err.userMessage || "Failed to load positions");
        }
        setLoading(false);
      });
    return () => abortController.abort();
  }, [refreshKey]);

  if (loading) {
    return <p style={{ color: "#999", padding: "20px" }}>Loading positions...</p>;
  }

  if (error) {
    return <p style={{ color: "#d32f2f", padding: "20px" }}>{error}</p>;
  }

  if (allPositions.length === 0) {
    return (
      <>
        <h3 className="title">Positions (0)</h3>
        <p style={{ color: "#999", fontSize: "14px" }}>No open positions. Start trading!</p>
      </>
    );
  }

  return (
    <>
      <h3 className="title">
        Positions ({allPositions.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Net Qty.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;
              const profClass = pnl >= 0 ? "profit" : "loss";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td>{stock.qty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
