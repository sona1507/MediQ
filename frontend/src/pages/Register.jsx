import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, mobile, password, confirmPassword, role } = formData;

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        password: password.trim(),
        role: role.trim().toLowerCase()
      };

      const res = await api.post("/auth/register", payload);
      alert(res.data.message || "✅ Registration successful!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        role: "user"
      });
      navigate("/login");
    } catch (err) {
      console.error("❌ Registration error:", err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4 w-100" style={{ maxWidth: "450px" }}>
        <h2 className="text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
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
            type="tel"
            name="mobile"
            className="form-control mb-3"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
            autoComplete="tel"
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <input
            type="password"
            name="confirmPassword"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <select
            name="role"
            className="form-select mb-3"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="pharmacist">Pharmacist</option>
          </select>
          <button className="btn btn-success w-100 mb-3" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
