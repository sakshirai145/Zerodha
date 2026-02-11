import React from "react";

function Universe() {
  return (
    <section
      style={{
        padding: "120px 0 140px",
        backgroundColor: "#fff",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "500",
            color: "#424242",
            marginBottom: "10px",
          }}
        >
          The Zerodha Universe
        </h2>

        <p
          style={{
            fontSize: "17px",
            color: "#666",
            marginBottom: "90px",
          }}
        >
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            rowGap: "90px",
            columnGap: "60px",
            marginBottom: "90px",
          }}
        >
          {/* Zerodha Fund House */}
          <div>
            <img
              src="media/zerodhaFundhouse.png"
              alt="Zerodha Fund House"
              style={{ height: "46px" }}
            />
            <p style={descStyle}>
              Our asset management venture that is creating simple and
              transparent index funds to help you save for your goals.
            </p>
          </div>

          {/* Sensibull */}
          <div>
            <img
              src="media/sensibullLogo.svg"
              alt="Sensibull"
              style={{ height: "42px" }}
            />
            <p style={descStyle}>
              Options trading platform that lets you create strategies, analyze
              positions, and examine data points like open interest, FII/DII,
              and more.
            </p>
          </div>

          {/* Tijori (FIXED – was wrong earlier) */}
          <div>
            <img
              src="media/goldenpiLogo.png"
              alt="GoldenPi"
              style={{ height: "40px" }}
            />
            <p style={descStyle}>
              Investment research platform that offers detailed insights on
              stocks, sectors, supply chains, and more.
            </p>
          </div>

          {/* Streak */}
          <div>
            <img
              src="media/streakLogo.png"
              alt="Streak"
              style={{ height: "44px" }}
            />
            <p style={descStyle}>
              Systematic trading platform that allows you to create and
              backtest strategies without coding.
            </p>
          </div>

          {/* Smallcase */}
          <div>
            <img
              src="media/smallcaseLogo.png"
              alt="Smallcase"
              style={{ height: "44px" }}
            />
            <p style={descStyle}>
              Thematic investing platform that helps you invest in diversified
              baskets of stocks or ETFs.
            </p>
          </div>

          {/* Ditto */}
          <div>
            <img
              src="media/dittoLogo.png"
              alt="Ditto"
              style={{ height: "42px" }}
            />
            <p style={descStyle}>
              Personalized advice on life and health insurance. No spam and no
              mis-selling.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          style={{
            backgroundColor: "#387ed1",
            color: "#fff",
            border: "none",
            padding: "12px 32px",
            fontSize: "16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Sign up for free
        </button>
      </div>
    </section>
  );
}

const descStyle = {
  fontSize: "14.5px",
  lineHeight: "1.6",
  color: "#777",
  marginTop: "16px",
};

export default Universe;
