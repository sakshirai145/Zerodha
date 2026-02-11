import React from 'react';

function Awards() {
  return (
    <div className="container mt-5 ">
      <div className="row">

        <div className="col-6 p-5">
          <img
            src="media/largestBroker.svg"
            alt="Award"
            className="img-fluid"
          />
        </div>

        <div className="col-6 p-5 mt-3">
          <h1>Largest stock broker in India</h1>

          <p className='mb-5'>
            2+ million Zerodha clients trust Zerodha with ~ ₹6 lakh crores of
            equity investments, making us India’s largest broker; contributing
            to 15% of daily retail exchange volumes in India.
          </p>

          <div className="row">
            <div className="col-6">
              <ul>
                <li>Futures and options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>

            <div className="col-6">
              <ul>
                <li>Stocks & IPOs</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. securities</li>
              </ul>
            </div>
          </div>
          <img
            src="media/pressLogos.png"
            alt="logo"
            className="img-fluid mt-3"
            style={{ width: '90%', height: 'auto' }}
          />

        </div>

      </div>
    </div>
  );
}

export default Awards;
