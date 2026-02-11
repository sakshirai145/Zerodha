import React from 'react';

function Education() {
  return ( 
    <div className="container mt-5">
      <div className="row">
        
        <div className="col-6">
          <img src="media/education.svg" alt="Education" className="img-fluid" style={{ width: "70%" }} />
        </div>

        <div className="col-6">
          <h1 className="fs-2">Free and open market education</h1>

          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="#" className="text-decoration-none">
            Varsity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>

          <p className="mt-5">
            TradingQ&amp;A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="#" className="text-decoration-none mt-5">
            TradingQ&amp;A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

      </div>
    </div>
  );
}

export default Education;
