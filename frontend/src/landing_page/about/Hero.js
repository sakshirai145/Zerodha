import React from "react";

function Hero() {
  return (
    <section
      style={{
        marginTop: "120px",   // ✅ space below navbar
        maxWidth: "1100px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0 20px"
      }}
    >
      {/* HEADING */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "500",
            lineHeight: "1.4",
            color: "#444"
          }}
        >
          We pioneered the discount broking model in India.
          <br />
          Now, we are breaking ground with our technology.
        </h1>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #eee", marginBottom: "60px" }} />

      {/* CONTENT */}
      <div
        style={{
          display: "flex",
          gap: "80px"
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ flex: 1 }}>
          <p style={paraStyle}>
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology. We named the company Zerodha,
            a combination of Zero and "Rodha", the Sanskrit word for barrier.
          </p>

          <p style={paraStyle}>
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>

          <p style={paraStyle}>
            Over 1.6+ crore clients place billions of orders every year through
            our powerful ecosystem of investment platforms, contributing over
            15% of all Indian retail trading volumes.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ flex: 1 }}>
          <p style={paraStyle}>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>

          <p style={paraStyle}>
            <a href="#" style={linkStyle}>Rainmatter</a>, our fintech fund and
            incubator, has invested in several fintech startups with the goal of
            growing the Indian capital markets.
          </p>

          <p style={paraStyle}>
            And yet, we are always up to something new every day. Catch up on the
            latest updates on our <a href="#" style={linkStyle}>blog</a> or see
            what the media is <a href="#" style={linkStyle}>saying about us</a>{" "}
            or learn more about our business and product{" "}
            <a href="#" style={linkStyle}>philosophies</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

const paraStyle = {
  fontSize: "17px",
  lineHeight: "1.7",
  color: "#555",
  marginBottom: "30px"
};

const linkStyle = {
  color: "#387ed1",
  textDecoration: "none"
};

export default Hero;
