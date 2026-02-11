import React from "react";

function Hero() {
  return (
    <section id="supportHero">
      {/* Top bar */}
      <div id="supportWrapper" className="py-3">
        <h4 className="m-0">Support Portal</h4>
        <a href="" className="href">
          Track Tickets
        </a>
      </div>

      {/* Main content */}
      <div className="container">
        <div className="row py-5">
          {/* LEFT */}
          <div className="col-md-6 pe-5">
            <h1 className="fs-3 mb-4">
              Search for an answer or browse help topics to create a ticket
            </h1>

            <input
              type="text"
              className="mb-4"
              placeholder="Eg: how do I activate F&O, why is my order getting rejected.."
            />

            <div className="d-flex flex-wrap gap-3">
              <a href="" className="href">
                Track account opening
              </a>
              <a href="" className="href">
                Track segment activation
              </a>
              <a href="" className="href">
                Intraday margins
              </a>
              <a href="" className="href">
                Kite user manual
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-6 ps-5">
            <h1 className="fs-3 mb-3">Featured</h1>
            <ol className="ps-3">
              <li className="mb-2">
                <a href="" className="href">
                  Current Takeover and Delisting – January 2024
                </a>
              </li>
              <li>
                <a href="" className="href">
                  Latest Intraday Leverage – MIS & CO
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
