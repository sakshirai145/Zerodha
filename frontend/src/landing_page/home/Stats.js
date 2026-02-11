import React from 'react';

function Stats() {
  return ( 
    <div className="container p-3">
      <div className="row p-5">

        {/* LEFT TEXT COLUMN */}
        <div className="col-6 p-5" style={{ maxWidth: '460px' }}>
          <h1 className="fs-2 mb-5">Trust with confidence</h1>

          <h2 className="fs-5 fw-normal mb-1">Customer-first always</h2>
          <p className="text-muted mb-4" style={{ lineHeight: '1.6', fontSize: '15px' }}>
            That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of
            equity investments, making us India’s largest broker; contributing
            to 15% of daily retail exchange volumes in India.
          </p>

          <h2 className="fs-5 fw-normal mb-1">No spam or gimmicks</h2>
          <p className="text-muted mb-4" style={{ lineHeight: '1.6', fontSize: '15px' }}>
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
            <span className="text-primary"> Our philosophies.</span>
          </p>

          <h2 className="fs-5 fw-normal mb-1">The Zerodha universe</h2>
          <p className="text-muted mb-4" style={{ lineHeight: '1.6', fontSize: '15px' }}>
            Not just an app, but a whole ecosystem. Our investments in 30+ fintech
            startups offer you tailored services specific to your needs.
          </p>

          <h2 className="fs-5 fw-normal mb-1">Do better with money</h2>
          <p className="text-muted mb-4" style={{ lineHeight: '1.6', fontSize: '15px' }}>
            With initiatives like <span className="text-primary">Nudge</span> and
            <span className="text-primary"> Kill Switch</span>, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>

        {/* RIGHT IMAGE COLUMN */}
        <div className="col-6 p-5 text-center">
          <img
            src="media/ecosystem.png"
            alt=""
            className="img-fluid mb-3"
            style={{ width: '90%' }}
          />

          <div>
            <a href="#" className="me-4 text-decoration-none">
              Explore our products <i className="fa fa-long-arrow-right"></i>
            </a>
            <a href="#" className="text-decoration-none">
              Try Kite demo <i className="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Stats;
