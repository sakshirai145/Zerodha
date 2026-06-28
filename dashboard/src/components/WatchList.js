import React, { useState, useEffect, useContext, useMemo } from "react";
import client from "../api/client";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  DeleteOutline,
} from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";

function formatPrice(price) {
  if (price === null || price === undefined) return "—";
  return Number(price).toFixed(2);
}

function formatTimestamp(date) {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return d.toLocaleDateString();
}

const WatchList = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [watchlist, setWatchlist] = useState({ items: [] });
  const [search, setSearch] = useState("");
  const [newSymbol, setNewSymbol] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    client
      .get("/api/watchlist", { signal: abortController.signal })
      .then((res) => {
        setWatchlist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        if (err.response?.status !== 401) {
          setError(err.userMessage || "Failed to load watchlist");
        }
        setLoading(false);
      });
    return () => abortController.abort();
  }, [refreshKey]);

  const handleAdd = async () => {
    if (!newSymbol.trim()) return;
    try {
      const res = await client.post(
        "/api/watchlist/add",
        { symbol: newSymbol.trim(), name: newName.trim() || newSymbol.trim() }
      );
      setWatchlist(res.data);
      setNewSymbol("");
      setNewName("");
    } catch (err) {
      if (err.response?.status !== 401) {
        setError(err.userMessage || "Failed to add stock");
      }
    }
  };

  const handleRemove = async (symbol) => {
    try {
      const res = await client.delete(`/api/watchlist/${symbol}`);
      setWatchlist(res.data);
    } catch (err) {
      if (err.response?.status !== 401) {
        setError(err.userMessage || "Failed to remove stock");
      }
    }
  };

  const filteredItems = useMemo(
    () =>
      watchlist.items.filter(
        (item) =>
          item.symbol.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase())
      ),
    [watchlist.items, search]
  );

  const hasPriceData = watchlist.items.some(
    (item) => item.price !== null && item.price !== undefined
  );

  const chartData = useMemo(() => {
    if (!hasPriceData) return null;
    return {
      labels: watchlist.items.map((item) => item.symbol),
      datasets: [
        {
          label: "Last Price",
          data: watchlist.items.map((item) => item.price ?? 0),
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [watchlist.items, hasPriceData]);

  if (loading) {
    return (
      <div className="watchlist-container">
        <p style={{ padding: "16px", color: "#999" }}>Loading watchlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="watchlist-container">
        <p style={{ padding: "16px", color: "#d32f2f" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search watchlist..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="counts">
          {" "}
          {watchlist.items.length} / 50
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "4px 8px",
        }}
      >
        <input
          type="text"
          placeholder="Symbol"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          style={{
            flex: 1,
            padding: "4px 8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        />
        <input
          type="text"
          placeholder="Name (optional)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            flex: 1,
            padding: "4px 8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "4px 12px",
            background: "#4184f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          Add
        </button>
      </div>

      <ul className="list">
        {filteredItems.length === 0 ? (
          <li style={{ color: "#999", padding: "12px 14px", fontSize: "13px" }}>
            {search ? "No matching stocks" : "Watchlist is empty. Add a stock above."}
          </li>
        ) : (
          filteredItems.map((item) => (
            <WatchListItem
              key={item.symbol}
              stock={{
                name: item.symbol,
                fullName: item.name,
                price: formatPrice(item.price),
                updatedAt: formatTimestamp(item.priceUpdatedAt),
              }}
              onRemove={() => handleRemove(item.symbol)}
            />
          ))
        )}
      </ul>

      {chartData && <DoughnutChart data={chartData} />}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, onRemove }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="item">
        <p>
          {stock.name}
          <span
            style={{
              fontSize: "11px",
              color: "#999",
              marginLeft: "6px",
              fontWeight: 400,
            }}
          >
            {stock.fullName}
          </span>
        </p>
        <div className="itemInfo">
          <span className="price">{stock.price}</span>
          {stock.updatedAt && (
            <span
              style={{
                fontSize: "10px",
                color: "#999",
                marginLeft: "6px",
              }}
            >
              {stock.updatedAt}
            </span>
          )}
        </div>
      </div>
      {showActions && <WatchListActions uid={stock.name} onRemove={onRemove} />}
    </li>
  );
};

const WatchListActions = ({ uid, onRemove }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="Remove" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" onClick={onRemove}>
            <DeleteOutline className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
