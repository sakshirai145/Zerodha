import React, { useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwMessage, setPwMessage] = useState("");

  const initials = user
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ZU";

  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  const handleSave = async () => {
    if (!name.trim()) {
      setSaveError("Name is required");
      return;
    }
    setSaving(true);
    setSaveError("");
    setSaveMessage("");
    try {
      const res = await client.put("/api/profile", {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setSaveMessage("Profile updated");
      setEditing(false);
    } catch (err) {
      if (err.response?.status !== 401) {
        setSaveError(err.userMessage || "Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPwError("All fields are required");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwords do not match");
      return;
    }
    setPwSaving(true);
    setPwError("");
    setPwMessage("");
    try {
      await client.put("/api/profile/password", {
        oldPassword,
        newPassword,
      });
      setPwMessage("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.response?.status !== 401) {
        setPwError(err.userMessage || "Failed to change password");
      }
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#4184f3",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 500, color: "#333" }}>
            {user?.name}
          </h3>
          <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#888" }}>
            {user?.email}
          </p>
        </div>
      </div>

      <div className="section">
        <span>
          <p>Profile Details</p>
        </span>

        <div className="table" style={{ padding: "5% 6%" }}>
          <div className="data">
            <p>Name</p>
            {editing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: "6px 10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  width: "200px",
                  textAlign: "right",
                }}
              />
            ) : (
              <p className="imp" style={{ fontSize: "1rem" }}>
                {user?.name}
              </p>
            )}
          </div>
          <div className="data">
            <p>Email</p>
            {editing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "6px 10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  width: "200px",
                  textAlign: "right",
                }}
              />
            ) : (
              <p className="imp" style={{ fontSize: "1rem" }}>
                {user?.email}
              </p>
            )}
          </div>
          <div className="data">
            <p>Phone</p>
            {editing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  padding: "6px 10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  width: "200px",
                  textAlign: "right",
                }}
              />
            ) : (
              <p className="imp" style={{ fontSize: "1rem" }}>
                {user?.phone}
              </p>
            )}
          </div>
          <hr />
          <div className="data">
            <p>Account created</p>
            <p className="imp" style={{ fontSize: "1rem" }}>
              {createdDate}
            </p>
          </div>
        </div>

        {saveError && (
          <p style={{ color: "#d32f2f", fontSize: "13px", marginTop: "8px" }}>
            {saveError}
          </p>
        )}
        {saveMessage && (
          <p style={{ color: "#2e7d32", fontSize: "13px", marginTop: "8px" }}>
            {saveMessage}
          </p>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          {editing ? (
            <>
              <button
                className="btn btn-blue"
                onClick={handleSave}
                disabled={saving}
                style={{ border: "none" }}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="btn"
                onClick={() => setEditing(false)}
                disabled={saving}
                style={{
                  background: "#f5f5f5",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-blue"
              onClick={() => setEditing(true)}
              style={{ border: "none" }}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <hr className="divider" />

      <div className="section">
        <span>
          <p>Change Password</p>
        </span>

        {!showPasswordForm ? (
          <button
            className="btn"
            onClick={() => setShowPasswordForm(true)}
            style={{
              background: "#f5f5f5",
              color: "#333",
              border: "1px solid #ddd",
            }}
          >
            Change Password
          </button>
        ) : (
          <div>
            <div className="table" style={{ padding: "5% 6%" }}>
              <div className="data">
                <p>Current password</p>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  style={{
                    padding: "6px 10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    width: "200px",
                    textAlign: "right",
                  }}
                />
              </div>
              <div className="data">
                <p>New password</p>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    padding: "6px 10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    width: "200px",
                    textAlign: "right",
                  }}
                />
              </div>
              <div className="data">
                <p>Confirm new password</p>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    padding: "6px 10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    width: "200px",
                    textAlign: "right",
                  }}
                />
              </div>
            </div>

            {pwError && (
              <p style={{ color: "#d32f2f", fontSize: "13px", marginTop: "8px" }}>
                {pwError}
              </p>
            )}
            {pwMessage && (
              <p style={{ color: "#2e7d32", fontSize: "13px", marginTop: "8px" }}>
                {pwMessage}
              </p>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button
                className="btn btn-blue"
                onClick={handleChangePassword}
                disabled={pwSaving}
                style={{ border: "none" }}
              >
                {pwSaving ? "Updating..." : "Update Password"}
              </button>
              <button
                className="btn"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPwError("");
                  setPwMessage("");
                }}
                disabled={pwSaving}
                style={{
                  background: "#f5f5f5",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <hr className="divider" />

      <button
        className="btn"
        onClick={logout}
        style={{
          background: "#d32f2f",
          color: "#fff",
          border: "none",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;