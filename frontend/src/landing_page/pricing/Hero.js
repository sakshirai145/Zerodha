import React from "react";

function Hero() {
  return (
    <>
      {/* HERO TITLE */}
      <div
        className="container text-center"
        style={{ marginTop: "140px", marginBottom: "140px" }}
      >
        <h1
          className="fw-normal mb-3"
          style={{ fontSize: "32px", color: "#424242" }}
        >
          Charges
        </h1>

        <p className="text-muted" style={{ fontSize: "20px" }}>
          List of all charges and taxes
        </p>
      </div>

      {/* CHARGES SECTION */}
      <div className="container">
        <div className="row text-center mb-5">
          <div className="col-4 p-5">
            <img
              src="media/pricingMF.svg"
              alt="Free equity delivery"
              className="img-fluid mb-3"
            />
            <h4>Free equity delivery</h4>
            <p className="text-muted">
              All equity delivery investments (NSE, BSE) are absolutely free — ₹0
              brokerage.
            </p>
          </div>

          <div className="col-4 p-5">
            <img
              src="media/intradayTrades.svg"
              alt="Intraday and F&O trades"
              className="img-fluid mb-3"
            />
            <h4>Intraday and F&O trades</h4>
            <p className="text-muted">
              Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday
              trades across equity, currency, and commodity. Flat ₹20 on all
              option trades.
            </p>
          </div>

          <div className="col-4 p-5">
            <img
              src="media/pricingMF.svg"
              alt="Free direct MF"
              className="img-fluid mb-3"
            />
            <h4>Free direct MF</h4>
            <p className="text-muted">
              All direct mutual fund investments are absolutely free — ₹0
              commissions & DP charges.
            </p>
          </div>
        </div>
      </div>

      {/* OPEN ACCOUNT SECTION */}
      <div
        className="container text-center"
        style={{ marginTop: "120px", marginBottom: "140px" }}
      >
        <h2
          className="fw-normal mb-3"
          style={{ fontSize: "32px", color: "#424242" }}
        >
          Open a Zerodha account
        </h2>

        <p className="text-muted mb-4" style={{ fontSize: "18px" }}>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>

        <button
          className="btn btn-primary px-5 py-2"
          style={{ fontSize: "18px" }}
        >
          Sign up Now
        </button>
      </div>
    </>
  );
}

export default Hero;
