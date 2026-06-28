import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import client from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import LoadingOverlay from "../../components/LoadingOverlay";
import { DASHBOARD_URL } from "../../config";

export default function Login() {
  const { saveAuth } = useAuth();
  const timerRef = useRef(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await client.post("/api/auth/login", form);
      saveAuth(res.data.token, res.data.user);
      setLaunching(true);
      timerRef.current = setTimeout(() => {
        const target = DASHBOARD_URL + "?token=" + encodeURIComponent(res.data.token);
        window.location.href = target;
      }, 1200);
    } catch (err) {
      const msg =
        err.response?.data?.error || err.userMessage || "Login failed. Please try again.";
      setError(msg);
    }
  };

  if (launching) {
    return <LoadingOverlay visible text="Launching Trading Platform..." />;
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Log in to Zerodha</h1>
          <p className="signup-subtitle">
            Access your demo trading account.
          </p>
        </div>

        {error && <p className="signup-api-error">{error}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="signup-submit-btn">
            Log In
          </button>

          <div className="signup-divider">
            <span>or</span>
          </div>

          <p className="signup-login-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
