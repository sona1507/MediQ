import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserPanel({ user, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage")); // sync logout across app
    navigate("/login");
  };

  if (!user) {
    return (
      <div
        className="card shadow-sm p-4 text-center"
        style={{
          position: "absolute",
          top: "70px",
          right: "20px",
          width: "320px",
          zIndex: 1000,
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <h5 className="text-danger mb-3">⚠️ User not found</h5>
        <p className="text-muted">Please log in to view account details.</p>
        <button className="btn btn-outline-primary w-100" onClick={() => navigate("/login")}>
          🔓 Login
        </button>
      </div>
    );
  }

  return (
    <div
      className="card shadow-sm p-4"
      style={{
        position: "absolute",
        top: "70px",
        right: "20px",
        width: "320px",
        zIndex: 1000,
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-primary mb-0">👤 Account</h5>
        <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>✖</button>
      </div>

      {/* User Info */}
      <div className="mb-3">
        <p className="mb-1"><strong>Name:</strong> {user?.name || "Guest"}</p>
        <p className="mb-1"><strong>Email:</strong> {user?.email || "Not available"}</p>
        <p className="mb-0"><strong>Role:</strong> {user?.role || "User"}</p>
      </div>

      <hr />

      {/* Navigation Buttons */}
      <div className="d-grid gap-2 mb-3">
        <button className="btn btn-outline-primary" onClick={() => navigate("/profile")}>
          👤 My Profile
        </button>
        <button className="btn btn-outline-secondary" onClick={() => navigate("/orders")}>
          📦 Orders
        </button>
        <button className="btn btn-outline-success" onClick={() => navigate("/prescriptions")}>
          🧾 Prescription Status
        </button>
      </div>

      <hr />

      {/* Logout */}
      <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
        🔓 Logout
      </button>

      {/* App Promo */}
      <div className="mt-4 text-center text-muted" style={{ fontSize: "14px" }}>
        📱 Download our mobile app<br />
        <a href="/app" className="text-decoration-none">Take MediQ with you</a>
      </div>
    </div>
  );
}
