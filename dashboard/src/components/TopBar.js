import React from "react";

import Menu from "./Menu";

const UNAVAILABLE_STYLE = {
  fontSize: "11px",
  color: "#999",
  fontWeight: 400,
};

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points" style={UNAVAILABLE_STYLE}>
            Live data unavailable
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points" style={UNAVAILABLE_STYLE}>
            Live data unavailable
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
