import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import PasswordField from "./PasswordField";

function validate(values) {
  const errors = {};

  if (!values.fullName || values.fullName.trim().length < 3) {
    errors.fullName = "Minimum 3 characters required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Must be exactly 10 digits";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Minimum 6 characters";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Must contain uppercase";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Must contain lowercase";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Must contain a number";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  if (!values.agreeTerms) {
    errors.agreeTerms = "You must agree to the terms";
  }

  return errors;
}

export default function SignupForm({ onSubmit }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setSubmitted(true);
      if (!isValid) return;
      onSubmit({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      });
    },
    [isValid, onSubmit, values]
  );

  const showError = (field) =>
    (touched[field] || submitted) ? errors[field] : "";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <InputField
        label="Full Name"
        name="fullName"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={showError("fullName")}
        placeholder="Enter your full name"
        autoComplete="name"
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={showError("email")}
        placeholder="Enter your email"
        autoComplete="email"
      />

      <InputField
        label="Phone Number"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={showError("phone")}
        placeholder="Enter 10-digit phone number"
        autoComplete="tel"
      />

      <PasswordField
        label="Password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={showError("password")}
        placeholder="Create a password"
        autoComplete="new-password"
      />

      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={showError("confirmPassword")}
        placeholder="Confirm your password"
        autoComplete="new-password"
      />

      <div className="form-group signup-checkbox-group">
        <label className="signup-checkbox-label">
          <input
            name="agreeTerms"
            type="checkbox"
            checked={values.agreeTerms}
            onChange={handleChange}
            onBlur={handleBlur}
            className="signup-checkbox"
          />
          <span>I agree to Terms</span>
        </label>
        {(touched.agreeTerms || submitted) && errors.agreeTerms && (
          <p className="signup-field-error">{errors.agreeTerms}</p>
        )}
      </div>

      <button
        type="submit"
        className="signup-submit-btn"
        disabled={submitted && !isValid}
      >
        Create Demo Account
      </button>

      <div className="signup-divider">
        <span>or</span>
      </div>

      <p className="signup-login-text">
        Already have an account?{" "}
        <span
          className="signup-link"
          onClick={() => navigate("/login")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/login")}
        >
          Log in
        </span>
      </p>
    </form>
  );
}
