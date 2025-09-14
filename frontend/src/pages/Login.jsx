import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password.trim()
      });

      const user = res.data?.user;

      if (!user || !user.role) {
        console.error("❌ Missing role in login response:", res.data);
        alert("Login response missing role. Please contact support.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("storage")); // ✅ Trigger App.jsx to reload user

      console.log("✅ Logged in user:", user);
      alert(res.data.message || "Login successful");

      switch (user.role) {
        case "pharmacist":
          navigate("/pharmacist");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <button className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
