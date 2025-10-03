import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();

    try {
      const res = await api.post("/auth/login", { email, password });

      const user = res.data?.user;
      const token = res.data?.token;

      // ✅ Validate user and token before storing
      if (
        !user ||
        typeof user !== "object" ||
        !user._id ||
        typeof user.role !== "string" ||
        typeof token !== "string" ||
        token.length < 10
      ) {
        console.error("❌ Invalid login response:", res.data);
        setError("Login failed: invalid user or token.");
        setLoading(false);
        return;
      }

      // ✅ Store session
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("storage"));

      console.log("✅ Logged in user:", user);
      alert(res.data.message || "Login successful");

      // ✅ Role-based routing
      switch (user.role) {
        case "pharmacist":
          navigate("/pharmacist");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "user":
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
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

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

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
