import React, { useState } from "react";

function Brokerage() {
  const [activeTab, setActiveTab] = useState("equity");

  return (
    <div className="container my-5">

      {/* TABS */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "equity" ? "active" : ""}`}
            onClick={() => setActiveTab("equity")}
          >
            Equity
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "currency" ? "active" : ""}`}
            onClick={() => setActiveTab("currency")}
          >
            Currency
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "commodity" ? "active" : ""}`}
            onClick={() => setActiveTab("commodity")}
          >
            Commodity
          </button>
        </li>
      </ul>

      {/* ================= EQUITY ================= */}
      {activeTab === "equity" && (
        <div className="table-responsive mb-5">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th></th>
                <th>Equity delivery</th>
                <th>Equity intraday</th>
                <th>F&O - Futures</th>
                <th>F&O - Options</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Brokerage</td>
                <td>Zero Brokerage</td>
                <td>0.03% or ₹20</td>
                <td>0.03% or ₹20</td>
                <td>Flat ₹20</td>
              </tr>

              <tr>
                <td>STT / CTT</td>
                <td>0.1% buy & sell</td>
                <td>0.025% sell</td>
                <td>0.02% sell</td>
                <td>
                  0.125% exercised <br />
                  0.1% sell (premium)
                </td>
              </tr>

              <tr>
                <td>Transaction charges</td>
                <td>NSE 0.00297% <br /> BSE 0.00375%</td>
                <td>NSE 0.00297% <br /> BSE 0.00375%</td>
                <td>NSE 0.00173%</td>
                <td>NSE 0.03503%</td>
              </tr>

              <tr>
                <td>GST</td>
                <td colSpan="4">
                  18% on (brokerage + SEBI + transaction charges)
                </td>
              </tr>

              <tr>
                <td>SEBI charges</td>
                <td colSpan="4">₹10 / crore</td>
              </tr>

              <tr>
                <td>Stamp charges</td>
                <td>0.015% or ₹1500</td>
                <td>0.003% or ₹300</td>
                <td>0.002% or ₹200</td>
                <td>0.003% or ₹300</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ================= CURRENCY ================= */}
      {activeTab === "currency" && (
        <div className="table-responsive mb-5">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th></th>
                <th>Currency futures</th>
                <th>Currency options</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Brokerage</td>
                <td>0.03% or ₹20</td>
                <td>₹20</td>
              </tr>

              <tr>
                <td>STT / CTT</td>
                <td>No STT</td>
                <td>No STT</td>
              </tr>

              <tr>
                <td>Transaction charges</td>
                <td>NSE 0.00035%</td>
                <td>NSE 0.0311%</td>
              </tr>

              <tr>
                <td>GST</td>
                <td colSpan="2">
                  18% on (brokerage + SEBI + transaction charges)
                </td>
              </tr>

              <tr>
                <td>SEBI charges</td>
                <td colSpan="2">₹10 / crore</td>
              </tr>

              <tr>
                <td>Stamp charges</td>
                <td>0.0001% or ₹10</td>
                <td>0.0001% or ₹10</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ================= COMMODITY ================= */}
      {activeTab === "commodity" && (
        <div className="table-responsive mb-5">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th></th>
                <th>Commodity futures</th>
                <th>Commodity options</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Brokerage</td>
                <td>0.03% or ₹20</td>
                <td>₹20</td>
              </tr>

              <tr>
                <td>STT / CTT</td>
                <td>0.01% sell</td>
                <td>0.05% sell</td>
              </tr>

              <tr>
                <td>Transaction charges</td>
                <td>MCX 0.0021%</td>
                <td>MCX 0.0418%</td>
              </tr>

              <tr>
                <td>GST</td>
                <td colSpan="2">
                  18% on (brokerage + SEBI + transaction charges)
                </td>
              </tr>

              <tr>
                <td>SEBI charges</td>
                <td>Agri ₹1 / Non-agri ₹10</td>
                <td>₹10 / crore</td>
              </tr>

              <tr>
                <td>Stamp charges</td>
                <td>0.002% or ₹200</td>
                <td>0.003% or ₹300</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* CALCULATOR LINK */}
      <div className="text-center mb-5">
        <a href="#" className="fs-5 text-decoration-none">
          Calculate your costs upfront
        </a>{" "}
        using our brokerage calculator
      </div>

      {/* SPACE FOR EXTRA PARAGRAPH */}
      <div className="container mt-5 text-muted">
  {/* MAIN HEADING */}
  <h2 className="mb-4">Charges explained</h2>

  <div className="row">
    {/* LEFT COLUMN */}
    <div className="col-md-6 pe-md-5">
      <h5 className="mb-2 text-dark">
        Securities/Commodities transaction tax
      </h5>
      <p className="mb-4">
        Tax by the government when transacting on the exchanges. Charged as above
        on both buy and sell sides when trading equity delivery. Charged only on
        selling side when trading intraday or on F&amp;O.
        <br /><br />
        When trading at Zerodha, STT/CTT can be a lot more than the brokerage we
        charge. Important to keep a tab.
      </p>

      <h5 className="mb-2 text-dark">
        Transaction/Turnover Charges
      </h5>
      <p className="mb-4">
        Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.
        <br /><br />
        BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to
        ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups merged into group X
        w.e.f 01.12.2017)
        <br /><br />
        BSE revised transaction charges in SS and ST groups to ₹1,00,000 per
        crore of gross turnover.
        <br /><br />
        BSE revised transaction charges for group A, B and other non-exclusive
        scrips at ₹375 per crore w.e.f December 1, 2022.
        <br /><br />
        BSE revised transaction charges in M, MT, TS and MS groups to ₹275 per
        crore of gross turnover.
      </p>

      <h5 className="mb-2 text-dark">Call &amp; trade</h5>
      <p>
        Additional charges of ₹50 per order for orders placed through a dealer at
        Zerodha including auto square off orders.
      </p>
    </div>

    {/* RIGHT COLUMN */}
    <div className="col-md-6 ps-md-5">
      <h5 className="mb-2 text-dark">GST</h5>
      <p className="mb-4">
        Tax levied by the government on the services rendered. 18% of
        (brokerage + SEBI charges + transaction charges).
      </p>

      <h5 className="mb-2 text-dark">SEBI Charges</h5>
      <p className="mb-4">
        Charged at ₹10 per crore + GST by Securities and Exchange Board of India
        for regulating the markets.
      </p>

      <h5 className="mb-2 text-dark">
        DP (Depository participant) charges
      </h5>
      <p className="mb-4">
        ₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged
        on the trading account ledger when stocks are sold, irrespective of
        quantity.
        <br /><br />
        Female demat account holders (as first holder) get a discount of ₹0.25
        per transaction on the CDSL fee.
        <br /><br />
        Debit transactions of mutual funds &amp; bonds get an additional discount
        of ₹0.25 on the CDSL fee.
      </p>

      <h5 className="mb-2 text-dark">Pledging charges</h5>
      <p className="mb-4">
        ₹30 + GST per pledge request per ISIN.
      </p>

      <h5 className="mb-2 text-dark">
        AMC (Account maintenance charges)
      </h5>
      <p>
        For BSDA demat account: Zero charges if the holding value is less than
        ₹4,00,000. To learn more about BSDA,{" "}
        <a href="#" className="text-decoration-none">Click here</a>.
      </p>
    </div>
  </div>
</div>

    </div>
  );
}

export default Brokerage;
