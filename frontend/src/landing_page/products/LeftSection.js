import React from 'react';

function LeftSection({
  imageUrl,
  ProductName,
  ProductDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-8 mb-5">
      <div className="row">
        <div className="col-6">
          <img src={imageUrl} alt={ProductName} className="img-fluid" />
        </div>

        <div className="col-6 p-5 mt-5">
          <h1>{ProductName}</h1>
          <p>{ProductDescription}</p>

          <div className="mb-4">
            <a
              href={tryDemo}
              style={{ textDecoration: "none" }}
            >
              Try demo <i className="fa fa-long-arrow-right" />
            </a>

            <a
              href={learnMore}
              style={{ marginLeft: "40px", textDecoration: "none" }}
            >
              Learn more <i className="fa fa-long-arrow-right" />
            </a>
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <a href={googlePlay}>
              <img
                src="media/googlePlayBadge.svg"
                alt="Google Play"
                style={{ height: "40px" }}
              />
            </a>

            <a href={appStore}>
              <img
                src="media/appStoreBadge.svg"
                alt="App Store"
                style={{ height: "40px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
