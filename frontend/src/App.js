import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryNavbar from "./components/CategoryNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadPrescription from "./pages/UploadPrescription";
import "./App.css";
import "./index.css";

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  // ✅ Track scroll position to style navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Dynamically set CSS variable for navbar height
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      const height = navbar.offsetHeight;
      document.documentElement.style.setProperty("--main-navbar-height", `${height}px`);
    }
  }, []);

  return (
    <Router>
      {/* ✅ Global navigation */}
      <Navbar scrolled={scrolled} />
      <CategoryNavbar scrolled={scrolled} />

      {/* ✅ Route definitions */}
      <Routes>
        <Route path="/" element={<Home scrolled={scrolled} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadPrescription />} />
        {/* 🔧 Future routes can be added here */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/orders" element={<Orders />} /> */}
      </Routes>
    </Router>
  );
}
