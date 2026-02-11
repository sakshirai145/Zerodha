import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#fafafa' }}>
      <div className="container pt-5 border-top">

        {/* TOP FOOTER */}
        <div className="row mb-5">
          <div className="col">
            <img src="media/logo.svg" alt="Zerodha" style={{ width: '45%' }} />

            <p className="text-muted mt-3" style={{ fontSize: '14px' }}>
              © 2010 - 2025, Zerodha Broking Ltd. <br />
              All rights reserved.
            </p>

            <div className="mt-3">
              <i className="fa fa-twitter text-muted me-3"></i>
              <i className="fa fa-facebook-square text-muted me-3"></i>
              <i className="fa fa-instagram text-muted me-3"></i>
              <i className="fa fa-linkedin text-muted"></i>
            </div>

            <div className="mt-3">
              <i className="fa fa-youtube-play text-muted me-3"></i>
              <i className="fa fa-whatsapp text-muted me-3"></i>
              <i className="fa fa-telegram text-muted"></i>
            </div>
          </div>

          <div className="col">
            <p className="fw-medium mb-3">Account</p>
            <a className="d-block text-muted mb-3 text-decoration-none">Open demat account</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Minor demat account</a>
            <a className="d-block text-muted mb-3 text-decoration-none">NRI demat account</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Commodity</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Dematerialisation</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Fund transfer</a>
            <a className="d-block text-muted mb-3 text-decoration-none">MTF</a>
            <a className="d-block text-muted text-decoration-none">Referral program</a>
          </div>

          <div className="col">
            <p className="fw-medium mb-3">Support</p>
            <a className="d-block text-muted mb-3 text-decoration-none">Contact us</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Support portal</a>
            <a className="d-block text-muted mb-3 text-decoration-none">How to file a complaint?</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Status of your complaints</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Bulletin</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Circular</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Z-Connect blog</a>
            <a className="d-block text-muted text-decoration-none">Downloads</a>
          </div>

          <div className="col">
            <p className="fw-medium mb-3">Company</p>
            <a className="d-block text-muted mb-3 text-decoration-none">About</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Philosophy</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Press & media</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Careers</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Zerodha Cares (CSR)</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Zerodha.tech</a>
            <a className="d-block text-muted text-decoration-none">Open source</a>
          </div>

          <div className="col">
            <p className="fw-medium mb-3">Quick links</p>
            <a className="d-block text-muted mb-3 text-decoration-none">Upcoming IPOs</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Brokerage charges</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Market holidays</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Economic calendar</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Calculators</a>
            <a className="d-block text-muted mb-3 text-decoration-none">Markets</a>
            <a className="d-block text-muted text-decoration-none">Sectors</a>
          </div>
        </div>

        {/* LEGAL TEXT */}
        <div
          className="mx-auto text-muted"
          style={{
            fontSize: '11px',
            lineHeight: '1.6',
            maxWidth: '1100px'
          }}
        >
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration no.: INZ000031633
            CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.:
            IN-DP-431-2019 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross,
            Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078,
            Karnataka, India. For any complaints pertaining to securities broking please write to
            complaints@zerodha.com, for DP related to dp@zerodha.com.
          </p>

          <p>
            Procedure to file a complaint on <span className="text-primary">SEBI SCORES</span>:
            Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID.
          </p>

          <p>
            <span className="text-primary">Smart Online Dispute Resolution</span> | 
            <span className="text-primary"> Grievances Redressal Mechanism</span>
          </p>

          <p>
            Investments in securities market are subject to market risks; read all the related
            documents carefully before investing.
          </p>

          <p>
            India's largest broker based on networth as per NSE. 
            <span className="text-primary"> NSE broker factsheet</span>
          </p>
        </div>

        {/* BOTTOM LINKS */}
        <div className="text-center mt-4 pb-4 text-muted" style={{ fontSize: '12px' }}>
          NSE &nbsp;&nbsp; BSE &nbsp;&nbsp; MCX &nbsp;&nbsp;
          Terms & conditions &nbsp;&nbsp;
          Policies & procedures &nbsp;&nbsp;
          Privacy policy &nbsp;&nbsp;
          Disclosure &nbsp;&nbsp;
          Investor charter
        </div>

      </div>
    </footer>
  );
}

export default Footer;
