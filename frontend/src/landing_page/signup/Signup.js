import { useState, useCallback, useRef, useEffect } from "react";
import SignupForm from "./SignupForm";
import SuccessModal from "./SuccessModal";
import DashboardLauncher from "./DashboardLauncher";
import client from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import "./signup.css";

export default function Signup() {
  const { saveAuth } = useAuth();
  const timerRef = useRef(null);
  const [step, setStep] = useState("form");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = useCallback(async (data) => {
    setError("");
    try {
      const res = await client.post("/api/auth/signup", {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      saveAuth(res.data.token, res.data.user);
      setStep("success");
      timerRef.current = setTimeout(() => setStep("launching"), 1000);
    } catch (err) {
      const msg =
        err.response?.data?.error || err.userMessage || "Something went wrong. Try again.";
      setError(msg);
    }
  }, [saveAuth]);

  if (step === "launching") {
    return <DashboardLauncher />;
  }

  if (step === "success") {
    return <SuccessModal />;
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Open a Zerodha account</h1>
          <p className="signup-subtitle">
            Enter your details to start your demo trading experience.
          </p>
        </div>
        {error && <p className="signup-api-error">{error}</p>}
        <SignupForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
