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
import api from "./api/axios";
import "./App.css";
import "./index.css";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  // ✅ Search logic lifted here
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) return setSuggestions([]);
      try {
        const res = await api.get("/medicines/search", {
          params: { q: query },
        });
        setSuggestions(res.data);
      } catch (err) {
        console.error("Search error:", err.message);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <Router>
      <Navbar scrolled={scrolled} query={query} setQuery={setQuery} />
      <CategoryNavbar scrolled={scrolled} />

      {/* ✅ Search Results BELOW Navbar */}
      {suggestions.length > 0 && (
        <div
          className="container"
          style={{
            marginTop: "100px",
            padding: "20px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h5 className="mb-3 text-primary">
            Showing results for: <span className="text-dark">{query}</span>
          </h5>

          <div className="row">
            {suggestions.map((med) => (
              <div key={med._id} className="col-md-4 mb-4">
                <div className="p-3 border rounded shadow-sm h-100 bg-light">
                  <h6 className="text-primary">{med.name}</h6>
                  <p className="mb-1"><strong>Category:</strong> {med.category}</p>
                  <p className="mb-1"><strong>Symptoms:</strong> {med.symptoms.join(", ")}</p>
                  <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>{med.description}</p>
                  <p className="mt-2"><strong>Price:</strong> ₹{med.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home scrolled={scrolled} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadPrescription />} />
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
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
