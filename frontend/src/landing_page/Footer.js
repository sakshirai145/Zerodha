import React from 'react';
import { Link } from "react-router-dom";

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
            <a href="https://zerodha.com/open-account" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Open demat account</a>
            <a href="https://zerodha.com/open-account?type=minor" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Minor demat account</a>
            <a href="https://zerodha.com/nri" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">NRI demat account</a>
            <a href="https://zerodha.com/commodity" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Commodity</a>
            <a href="https://zerodha.com/demat" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Dematerialisation</a>
            <a href="https://zerodha.com/funds" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Fund transfer</a>
            <a href="https://zerodha.com/mtf" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">MTF</a>
            <a href="https://zerodha.com/referral" target="_blank" rel="noopener noreferrer" className="d-block text-muted text-decoration-none">Referral program</a>
          </div>

          <div className="col">
            <p className="fw-medium mb-3">Support</p>
            <a href="https://support.zerodha.com" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Contact us</a>
            <Link to="/support" className="d-block text-muted mb-3 text-decoration-none">Support portal</Link>
            <a href="https://support.zerodha.com" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">How to file a complaint?</a>
            <a href="https://support.zerodha.com" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Status of your complaints</a>
            <a href="https://zerodha.com/bulletin" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Bulletin</a>
            <a href="https://zerodha.com/circular" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Circular</a>
            <a href="https://zerodha.com/z-connect" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Z-Connect blog</a>
            <a href="https://zerodha.com/downloads" target="_blank" rel="noopener noreferrer" className="d-block text-muted text-decoration-none">Downloads</a>
          </div>

          <div className="col">
            <p className="fw-medium mb-3">Company</p>
            <Link to="/about" className="d-block text-muted mb-3 text-decoration-none">About</Link>
            <a href="https://zerodha.com/about#philosophy" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Philosophy</a>
            <a href="https://zerodha.com/media" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Press & media</a>
            <a href="https://zerodha.com/careers" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Careers</a>
            <a href="https://zerodha.com/csr" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Zerodha Cares (CSR)</a>
            <a href="https://zerodha.tech" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Zerodha.tech</a>
            <a href="https://github.com/zerodha" target="_blank" rel="noopener noreferrer" className="d-block text-muted text-decoration-none">Open source</a>
          </div>

          <div className="col">
            <p className="fw-medium mb-3">Quick links</p>
            <a href="https://zerodha.com/ipo" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Upcoming IPOs</a>
            <Link to="/pricing" className="d-block text-muted mb-3 text-decoration-none">Brokerage charges</Link>
            <a href="https://zerodha.com/market-holidays" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Market holidays</a>
            <a href="https://zerodha.com/economic-calendar" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Economic calendar</a>
            <a href="https://zerodha.com/calculators" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Calculators</a>
            <a href="https://zerodha.com/markets" target="_blank" rel="noopener noreferrer" className="d-block text-muted mb-3 text-decoration-none">Markets</a>
            <a href="https://zerodha.com/sectors" target="_blank" rel="noopener noreferrer" className="d-block text-muted text-decoration-none">Sectors</a>
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
          <a href="https://nseindia.com" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">NSE</a> &nbsp;&nbsp;
          <a href="https://bseindia.com" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">BSE</a> &nbsp;&nbsp;
          <a href="https://mcxindia.com" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">MCX</a> &nbsp;&nbsp;
          <a href="https://zerodha.com/terms" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">Terms & conditions</a> &nbsp;&nbsp;
          <a href="https://zerodha.com/policies" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">Policies & procedures</a> &nbsp;&nbsp;
          <a href="https://zerodha.com/privacy" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">Privacy policy</a> &nbsp;&nbsp;
          <a href="https://zerodha.com/disclosure" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">Disclosure</a> &nbsp;&nbsp;
          <a href="https://zerodha.com/investor-charter" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">Investor charter</a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
