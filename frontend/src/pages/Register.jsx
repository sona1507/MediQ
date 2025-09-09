import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "", password: "", confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      await api.post("/auth/register", formData);
      alert("✅ Registration successful!");
      setFormData({ name: "", email: "", mobile: "", password: "", confirmPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4 w-100" style={{ maxWidth: "450px" }}>
        <h2 className="text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control mb-3" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" className="form-control mb-3" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="tel" className="form-control mb-3" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} pattern="[0-9]{10}" required />
          <input type="password" className="form-control mb-3" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" className="form-control mb-3" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
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
