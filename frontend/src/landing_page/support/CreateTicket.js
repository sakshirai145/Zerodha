import React from "react";

function CreateTicket() {
  return (
    <>
      {/* Local styles (scoped & minimal) */}
      <style>{`
        .ticket-section {
          padding: 40px 0;
        }

        .ticket-heading {
          font-size: 26px;
          font-weight: 500;
          color: #424242;
          margin-bottom: 50px;
        }

        .ticket-title {
          font-size: 18px;
          font-weight: 500;
          color: #424242;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ticket-icon {
          color: #424242;
        }

        .ticket-links a {
          display: block;
          font-size: 15px;
          color: #387ed1;
          text-decoration: none;
          margin-bottom: 12px;
        }

        .ticket-links a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* ================= SECTION 1 ================= */}
      <div className="container my-5">
        <h2 className="ticket-heading">
          To create a ticket, select a relevant topic
        </h2>

        <div className="row">
          {/* Account Opening */}
          <div className="col-md-4 mb-4">
            <div className="ticket-title">
              <i className="fa fa-plus-circle ticket-icon"></i>
              Account Opening
            </div>

            <div className="ticket-links">
              <a href="#">Online Account Opening</a>
              <a href="#">Offline Account Opening</a>
              <a href="#">Company, Partnership and HUF Account Opening</a>
              <a href="#">NRI Account Opening</a>
              <a href="#">Charges at Zerodha</a>
            </div>
          </div>

          {/* Your Zerodha Account */}
          <div className="col-md-4 mb-4">
            <div className="ticket-title">
              <i className="fa fa-user ticket-icon"></i>
              Your Zerodha Account
            </div>

            <div className="ticket-links">
              <a href="#">Login Credentials</a>
              <a href="#">Account Modification and Segment Addition</a>
              <a href="#">DP ID and bank details</a>
              <a href="#">Your Profile</a>
              <a href="#">Transfer and conversion of shares</a>
            </div>
          </div>

          {/* Trading and Markets */}
          <div className="col-md-4 mb-4">
            <div className="ticket-title">
              <i className="fa fa-bar-chart ticket-icon"></i>
              Trading and Markets
            </div>

            <div className="ticket-links">
              <a href="#">Margin/Leverage, Product and Order types</a>
              <a href="#">Kite Web and Mobile</a>
              <a href="#">Trading FAQs</a>
              <a href="#">Corporate Actions</a>
              <a href="#">Sentinel</a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <div className="container ticket-section">
        <div className="row">
          {/* FUNDS */}
          <div className="col-md-4 mb-4">
            <div className="ticket-title">
              <i className="fa fa-credit-card-alt ticket-icon"></i>
              Funds
            </div>

            <div className="ticket-links">
              <a href="#">Adding Funds</a>
              <a href="#">Fund Withdrawal</a>
              <a href="#">eMandates</a>
            </div>
          </div>

          {/* CONSOLE */}
          <div className="col-md-4 mb-4">
            <div className="ticket-title">
              <i className="fa fa-circle-o-notch ticket-icon"></i>
              Console
            </div>

            <div className="ticket-links">
              <a href="#">Reports</a>
              <a href="#">Ledger</a>
              <a href="#">Portfolio</a>
            </div>
          </div>

          {/* COIN */}
          <div className="col-md-4 mb-4">
            <div className="ticket-title">
              <i className="fa fa-circle-o ticket-icon"></i>
              Coin
            </div>

            <div className="ticket-links">
              <a href="#">Understanding Mutual Funds</a>
              <a href="#">About Coin</a>
              <a href="#">Buying and Selling through Coin</a>
            </div>
          </div>
        </div>

        {/* Reserved space for future paragraph */}
        <p className="mt-5"></p>
      </div>
    </>
  );
}

export default CreateTicket;
