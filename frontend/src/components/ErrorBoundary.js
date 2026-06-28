import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          color: "#424242",
          padding: "20px",
          boxSizing: "border-box",
          textAlign: "center",
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#fff3e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 style={{
            fontSize: "1.3rem",
            fontWeight: 500,
            margin: "0 0 8px",
          }}>
            Something went wrong
          </h2>
          <p style={{
            fontSize: "0.9rem",
            color: "#757575",
            margin: "0 0 24px",
            maxWidth: 400,
            lineHeight: 1.5,
          }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={this.handleRetry}
            style={{
              padding: "10px 24px",
              background: "#4184f3",
              color: "#fff",
              border: "none",
              borderRadius: 3,
              fontSize: "0.9rem",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#74a7fa"}
            onMouseOut={(e) => e.currentTarget.style.background = "#4184f3"}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
