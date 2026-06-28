import React, { useState, useEffect } from "react";
import client from "../api/client";

const Apps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    client
      .get("/api/apps", { signal: abortController.signal })
      .then((res) => {
        setApps(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        setError(err.userMessage || "Failed to load apps");
        setLoading(false);
      });
    return () => abortController.abort();
  }, []);

  if (loading) {
    return <p style={{ color: "#999", padding: "20px" }}>Loading apps...</p>;
  }

  if (error) {
    return <p style={{ color: "#d32f2f", padding: "20px" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 300, color: "#424242", marginBottom: "24px" }}>
        Zerodha Ecosystem
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {apps.map((app, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "24px",
              transition: "box-shadow 0.2s, transform 0.2s",
              cursor: "pointer",
            }}
            onClick={() => window.open(app.url, "_blank", "noopener,noreferrer")}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "none";
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: 500, color: "#387ed1", margin: "0 0 8px" }}>
              {app.name}
            </h3>
            <p style={{ fontSize: "14px", color: "#666", margin: "0 0 16px", lineHeight: "1.5" }}>
              {app.description}
            </p>
            <span style={{ fontSize: "13px", color: "#387ed1", textDecoration: "none", fontWeight: 500 }}>
              Open {app.name} &rarr;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
