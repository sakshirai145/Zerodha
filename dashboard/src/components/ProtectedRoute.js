import { useAuth } from "../context/AuthContext";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL
  ? process.env.REACT_APP_FRONTEND_URL.replace(/\/+$/, "") + "/login"
  : "/login";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "system-ui, sans-serif",
          color: "#666",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    window.location.href = FRONTEND_URL;
    return null;
  }

  return children;
}
