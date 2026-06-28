import React, { useState, useEffect, useContext } from "react";
import client from "../api/client";
import GeneralContext from "./GeneralContext";

const chipStyle = (active) => ({
  padding: "4px 14px",
  border: "1px solid #ddd",
  borderRadius: "16px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 500,
  background: active ? "#4184f3" : "#fff",
  color: active ? "#fff" : "#333",
});

const statusStyle = (status) => {
  const map = {
    executed: { color: "#2e7d32", background: "#e8f5e9" },
    pending: { color: "#e65100", background: "#fff3e0" },
    cancelled: { color: "#999", background: "#f5f5f5" },
  };
  return map[status] || map.executed;
};

const Orders = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [modeFilter, setModeFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const params = {};
    if (modeFilter) params.mode = modeFilter;
    if (fromDate) params.from = fromDate;
    if (toDate) params.to = toDate;

    setLoading(true);
    client
      .get("/api/orders", { signal: abortController.signal, params })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        if (err.response?.status !== 401) {
          setError(err.userMessage || "Failed to load orders");
        }
        setLoading(false);
      });
    return () => abortController.abort();
  }, [refreshKey, modeFilter, fromDate, toDate]);

  const handleCancel = async (id) => {
    try {
      setActionError("");
      await client.patch(`/api/orders/${id}/cancel`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: "cancelled" } : o
        )
      );
    } catch (err) {
      if (err.response?.status !== 401) {
        setActionError(err.userMessage || "Failed to cancel order");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionError("");
      await client.delete(`/api/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      if (err.response?.status !== 401) {
        setActionError(err.userMessage || "Failed to delete order");
      }
    }
  };

  const filtered = orders.filter((o) =>
    o.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p style={{ color: "#999", padding: "20px" }}>Loading orders...</p>;
  }

  if (error) {
    return <p style={{ color: "#d32f2f", padding: "20px" }}>{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <h3 className="title">Orders ({orders.length})</h3>
        <input
          type="text"
          placeholder="Search stock..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            width: "200px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#555" }}>
          Type:
        </span>
        {["", "BUY", "SELL"].map((val) => (
          <span
            key={val || "all"}
            style={chipStyle(modeFilter === val)}
            onClick={() => setModeFilter(val)}
          >
            {val || "All"}
          </span>
        ))}

        <span
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "#555",
            marginLeft: "16px",
          }}
        >
          From:
        </span>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{
            padding: "4px 8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        />
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#555" }}>
          To:
        </span>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{
            padding: "4px 8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        />
      </div>

      {actionError && (
        <p style={{ color: "#d32f2f", fontSize: "13px", marginBottom: "8px" }}>
          {actionError}
        </p>
      )}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Stock</th>
              <th>Type</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order._id}>
                <td>
                  {new Date(order.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{order.name}</td>
                <td>
                  <p
                    style={{
                      color: order.mode === "BUY" ? "#4184f3" : "#ff5722",
                      fontWeight: 500,
                    }}
                  >
                    {order.mode}
                  </p>
                </td>
                <td>{order.qty}</td>
                <td>₹{order.price.toFixed(2)}</td>
                <td>
                  <span
                    style={{
                      color: statusStyle(order.status).color,
                      fontSize: "12px",
                      background: statusStyle(order.status).background,
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {order.status || "executed"}
                  </span>
                </td>
                <td>
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      style={{
                        background: "none",
                        border: "1px solid #e65100",
                        borderRadius: "4px",
                        color: "#e65100",
                        cursor: "pointer",
                        fontSize: "13px",
                        marginRight: "8px",
                        padding: "2px 8px",
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(order._id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#d32f2f",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
