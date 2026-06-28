import React, { useState, useEffect, useContext, useRef } from "react";
import client from "../api/client";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [fund, setFund] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [modalAmount, setModalAmount] = useState("");
  const [modalError, setModalError] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const toastTimer = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();
    client
      .get("/api/funds", { signal: abortController.signal })
      .then((res) => {
        setFund(res.data.fund);
        setTransactions(res.data.transactions || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        if (err.response?.status !== 401) {
          setError(err.userMessage || "Failed to load funds");
        }
        setLoading(false);
      });
    return () => {
      abortController.abort();
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
        toastTimer.current = null;
      }
    };
  }, [refreshKey]);

  const showToast = (text, type) => {
    setMessage(text);
    setMessageType(type);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setMessage("");
      toastTimer.current = null;
    }, 3000);
  };

  const openDeposit = () => {
    setModalAmount("");
    setModalError("");
    setShowDeposit(true);
  };

  const openWithdraw = () => {
    setModalAmount("");
    setModalError("");
    setShowWithdraw(true);
  };

  const handleDeposit = async () => {
    const amount = parseFloat(modalAmount);
    if (!amount || amount <= 0) {
      setModalError("Enter a valid amount greater than 0");
      return;
    }
    setModalLoading(true);
    setModalError("");
    try {
      const res = await client.post("/api/funds/deposit", { amount });
      setFund(res.data.fund);
      setShowDeposit(false);
      showToast(`₹${amount} deposited successfully`, "success");
    } catch (err) {
      if (err.response?.status !== 401) {
        setModalError(err.userMessage || "Deposit failed");
      }
    } finally {
      setModalLoading(false);
    }
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(modalAmount);
    if (!amount || amount <= 0) {
      setModalError("Enter a valid amount greater than 0");
      return;
    }
    if (amount > fund.availableBalance) {
      setModalError(
        `Insufficient balance. You have ₹${fund.availableBalance.toFixed(2)}`
      );
      return;
    }
    setModalLoading(true);
    setModalError("");
    try {
      const res = await client.post("/api/funds/withdraw", { amount });
      setFund(res.data.fund);
      setShowWithdraw(false);
      showToast(`₹${amount} withdrawn successfully`, "success");
    } catch (err) {
      if (err.response?.status !== 401) {
        setModalError(err.userMessage || "Withdrawal failed");
      }
    } finally {
      setModalLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "#999", padding: "20px" }}>Loading funds...</p>;
  }

  if (error) {
    return <p style={{ color: "#d32f2f", padding: "20px" }}>{error}</p>;
  }

  return (
    <>
      {message && (
        <p
          style={{
            textAlign: "center",
            padding: "8px",
            borderRadius: "4px",
            marginBottom: "12px",
            fontSize: "14px",
            backgroundColor: messageType === "error" ? "#fff0f0" : "#f0fff0",
            color: messageType === "error" ? "#d32f2f" : "#2e7d32",
            border: `1px solid ${
              messageType === "error" ? "#ffcccc" : "#ccffcc"
            }`,
          }}
        >
          {message}
        </p>
      )}

      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button className="btn btn-green" onClick={openDeposit}>
            Deposit
          </button>
          <button className="btn btn-blue" onClick={openWithdraw}>
            Withdraw
          </button>
        </div>
      </div>

      {showDeposit && (
        <div className="modal-overlay" onClick={() => !modalLoading && setShowDeposit(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Deposit Funds</h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={modalAmount}
              onChange={(e) => setModalAmount(e.target.value)}
              min="1"
              autoFocus
            />
            {modalError && (
              <p style={{ color: "#d32f2f", fontSize: "13px", margin: "4px 0 0" }}>
                {modalError}
              </p>
            )}
            <div className="modal-actions">
              <button
                style={{ background: "#4caf50", color: "#fff" }}
                onClick={handleDeposit}
                disabled={modalLoading}
              >
                {modalLoading ? "Processing..." : "Deposit"}
              </button>
              <button
                style={{ background: "#f5f5f5", color: "#333", border: "1px solid #ddd" }}
                onClick={() => setShowDeposit(false)}
                disabled={modalLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showWithdraw && (
        <div className="modal-overlay" onClick={() => !modalLoading && setShowWithdraw(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Withdraw Funds</h3>
            <p className="balance-label">
              Available balance: ₹{fund.availableBalance.toFixed(2)}
            </p>
            <input
              type="number"
              placeholder="Enter amount"
              value={modalAmount}
              onChange={(e) => setModalAmount(e.target.value)}
              min="1"
              autoFocus
            />
            {modalError && (
              <p style={{ color: "#d32f2f", fontSize: "13px", margin: "4px 0 0" }}>
                {modalError}
              </p>
            )}
            <div className="modal-actions">
              <button
                style={{ background: "#4184f3", color: "#fff" }}
                onClick={handleWithdraw}
                disabled={modalLoading}
              >
                {modalLoading ? "Processing..." : "Withdraw"}
              </button>
              <button
                style={{ background: "#f5f5f5", color: "#333", border: "1px solid #ddd" }}
                onClick={() => setShowWithdraw(false)}
                disabled={modalLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">
                {fund.availableBalance.toFixed(2)}
              </p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{fund.usedMargin.toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{fund.openingBalance.toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Withdrawable Balance</p>
              <p className="colored">
                {Math.max(0, fund.availableBalance).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <span>
            <p>Recent Transactions</p>
          </span>
          {transactions.length === 0 ? (
            <p style={{ color: "#999", fontSize: "14px" }}>
              No transactions yet
            </p>
          ) : (
            <div
              className="table"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {transactions.slice(0, 10).map((tx, i) => (
                <div key={i} className="data">
                  <p>
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </p>
                  <p
                    className={
                      tx.type === "deposit" ? "colored" : ""
                    }
                    style={{
                      color:
                        tx.type === "withdraw" || tx.type === "buy"
                          ? "#d32f2f"
                          : "#2e7d32",
                    }}
                  >
                    {tx.type === "deposit" || tx.type === "sell"
                      ? "+"
                      : "-"}
                    ₹{tx.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Funds;
