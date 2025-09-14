import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryNavbar from "./components/CategoryNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadPrescription from "./pages/UploadPrescription";
import PharmacistDashboard from "./pages/PharmacistDashboard";
import Unauthorized from "./pages/Unauthorized";
import "./App.css";
import "./index.css";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage safely
  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // ✅ Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Navbar height CSS variable
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      const height = navbar.offsetHeight;
      document.documentElement.style.setProperty("--main-navbar-height", `${height}px`);
    }
  }, []);

  return (
    <Router>
      <Navbar scrolled={scrolled} />
      <CategoryNavbar scrolled={scrolled} />

      <Routes>
        <Route path="/" element={<Home scrolled={scrolled} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadPrescription />} />

        {/* ✅ Protected Pharmacist Route */}
        <Route
          path="/pharmacist"
          element={
            user?.role === "pharmacist" ? (
              <PharmacistDashboard user={user} />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />

        {/* ✅ Unauthorized fallback */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ✅ Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
