import React from "react";

function Team() {
  return (
    <section
      style={{
        maxWidth: "1100px",
        margin: "140px auto",
        padding: "0 20px",
      }}
    >
      {/* SECTION TITLE */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "500",
          marginBottom: "80px",
          color: "#444",
        }}
      >
        People
      </h2>

      {/* CONTENT */}
      <div
        style={{
          display: "flex",
          gap: "80px",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: IMAGE + NAME */}
        <div style={{ textAlign: "center", minWidth: "260px" }}>
          <img
            src="media/nithinkamath.jpg"
            alt="Nithin Kamath"
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />

          <h3
            style={{
              fontSize: "20px",
              fontWeight: "500",
              marginBottom: "6px",
              color: "#333",
            }}
          >
            Nithin Kamath
          </h3>

          <p
            style={{
              fontSize: "14px",
              color: "#777",
            }}
          >
            Founder, CEO
          </p>
        </div>

        {/* RIGHT: TEXT */}
        <div style={{ flex: 1 }}>
          <p style={paraStyle}>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>

          <p style={paraStyle}>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>

          <p style={paraStyle}>
            Playing basketball is his zen.
          </p>

          <p style={paraStyle}>
            Connect on{" "}
            <a href="#" style={linkStyle}>Homepage</a> /{" "}
            <a href="#" style={linkStyle}>TradingQnA</a> /{" "}
            <a href="#" style={linkStyle}>Twitter</a>
          </p>
        </div>
      </div>
    </section>
  );
}

const paraStyle = {
  fontSize: "17px",
  lineHeight: "1.7",
  color: "#555",
  marginBottom: "24px",
};

const linkStyle = {
  color: "#387ed1",
  textDecoration: "none",
};

export default Team;
