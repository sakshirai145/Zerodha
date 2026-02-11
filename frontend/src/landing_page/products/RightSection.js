import React from "react";

function RightSection({
  imageUrl,
  ProductName,
  ProductDescription,
  learnMore,
}) {
  return (
    <div className="container  mb-5">
      <div className="row align-items-center">

        {/* ✅ LEFT: TEXT CONTENT */}
        <div className="col-6">
          <div style={{ maxWidth: "420px" }}>
            <h2 style={{ marginBottom: "16px" }}>{ProductName}</h2>

            <p
              style={{
                color: "#555",
                lineHeight: "1.7",
                marginBottom: "20px",
              }}
            >
              {ProductDescription}
            </p>

            <a
              href={learnMore}
              style={{
                color: "#387ed1",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Learn more <i className="fa fa-long-arrow-right" />
            </a>
          </div>
        </div>

        {/* ✅ RIGHT: IMAGE */}
        <div className="col-6 text-end">
          <img
            src={imageUrl}
            alt={ProductName}
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />
        </div>

      </div>
    </div>
  );
}

export default RightSection;
