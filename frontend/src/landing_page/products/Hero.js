import React from "react";

function Hero() {
  return (
    <section
      style={{
        marginTop: "110px",          // space below navbar
        paddingBottom: "60px",       // space before border
        marginBottom: "40px",        // space after border
        borderBottom: "1px solid #eee", // subtle bottom border
        textAlign: "center",
        color: "#444",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "33px",
          fontWeight: "500",
          marginBottom: "16px",
        }}
      >
        Zerodha Products
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#555",
          marginBottom: "22px",
        }}
      >
        Sleek, modern, and intuitive trading platforms
      </p>

      <p style={{ fontSize: "16px" }}>
        Check out our{" "}
        <a
          href="#"
          style={{
            color: "#387ed1",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          investment offerings →
        </a>
      </p>
    </section>
  );
}

export default Hero;
