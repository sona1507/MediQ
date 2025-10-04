import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"; // Added .jsx
import CategoryNavbar from "./components/CategoryNavbar.jsx"; // Added .jsx
import Home from "./pages/Home.jsx"; // Added .jsx
import Login from "./pages/Login.jsx"; // Added .jsx
import Register from "./pages/Register.jsx"; // Added .jsx
import UploadPrescription from "./pages/UploadPrescription.jsx"; // Added .jsx
import PharmacistDashboard from "./pages/PharmacistDashboard.jsx"; // Added .jsx
import Unauthorized from "./pages/Unauthorized.jsx"; // Added .jsx
import Medicines from "./pages/Medicines.jsx"; // Added .jsx
import BuyMedicine from "./pages/BuyMedicine.jsx"; // Added .jsx
import MedicineManager from "./pages/MedicineManager.jsx"; // Added .jsx
import UserProfile from "./components/UserProfile.jsx"; // Added .jsx
import UploadMedicine from "./pages/UploadMedicine.jsx"; // Added .jsx
import api from "./api/axios.js"; // Changed to .js (assuming standard JS module)
import "./App.css";
import "./index.css";
import Checkout from "./pages/Checkout.jsx"; // Added .jsx
import PrescriptionStatus from "./pages/PrescriptionStatus.jsx"; // Added .jsx
import HealthGuide from "./pages/HealthGuide.jsx"; // Added .jsx

// Personal Care
import PersonalCare from "./components/personalcare/PersonalCare.jsx"; // Added .jsx
import SkinCare from "./components/personalcare/SkinCare.jsx"; // Added .jsx
import HairCare from "./components/personalcare/HairCare.jsx"; // Added .jsx
import BabyMomCare from "./components/personalcare/BabyMomCare.jsx"; // Added .jsx
import OralCare from "./components/personalcare/OralCare.jsx"; // Added .jsx
import ElderlyCare from "./components/personalcare/ElderlyCare.jsx"; // Added .jsx

// Health Conditions
import HealthCondition from "./components/healthcondition/HealthCondition.jsx"; // Added .jsx
import BoneJointCare from "./components/healthcondition/BoneJointCare.jsx"; // Added .jsx
import DigestiveCare from "./components/healthcondition/DigestiveCare.jsx"; // Added .jsx
import EyeCare from "./components/healthcondition/EyeCare.jsx"; // Added .jsx
import PainRelief from "./components/healthcondition/PainRelief.jsx"; // Added .jsx
import SmokingCessation from "./components/healthcondition/SmokingCessation.jsx"; // Added .jsx
import LiverCare from "./components/healthcondition/LiverCare.jsx"; // Added .jsx
import ColdCough from "./components/healthcondition/ColdCough.jsx"; // Added .jsx
import HeartCare from "./components/healthcondition/HeartCare.jsx"; // Added .jsx
import KidneyCare from "./components/healthcondition/KidneyCare.jsx"; // Added .jsx
import RespiratoryCare from "./components/healthcondition/RespiratoryCare.jsx"; // Added .jsx
import MentalWellness from "./components/healthcondition/MentalWellness.jsx"; // Added .jsx
import DermaCare from "./components/healthcondition/DermaCare.jsx"; // Added .jsx

import VitaminsPage from "./components/VitaminsPage.jsx"; // Added .jsx
import Cart from './pages/Cart.jsx'; // Added .jsx

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(undefined);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);

  // ✅ Load user from localStorage and validate
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    try {
      const parsed = storedUser ? JSON.parse(storedUser) : null;
      if (
        parsed &&
        typeof parsed === "object" &&
        parsed._id &&
        typeof parsed.role === "string" &&
        typeof storedToken === "string" &&
        storedToken.length > 10
      ) {
        setUser(parsed);
        console.log("👤 Logged in user:", parsed);
      } else {
        console.warn("🚫 Invalid user object in localStorage");
        setUser(null);
      }
    } catch (err) {
      console.error("❌ Error parsing user:", err.message);
      setUser(null);
    }
  }, []);

  // ✅ Multi-tab session sync
  useEffect(() => {
    const syncSession = () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      try {
        const parsed = storedUser ? JSON.parse(storedUser) : null;
        if (
          parsed &&
          typeof parsed === "object" &&
          parsed._id &&
          typeof parsed.role === "string" &&
          typeof storedToken === "string" &&
          storedToken.length > 10
        ) {
          setUser(parsed);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);

  // ✅ Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Navbar height sync
  useEffect(() => {
    const syncNavbarHeight = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        const height = navbar.offsetHeight;
        document.documentElement.style.setProperty("--main-navbar-height", `${height}px`);
      }
    };
    const timeout = setTimeout(syncNavbarHeight, 100);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Medicine search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) return setSuggestions([]);
      try {
        const res = await api.get("/medicines/search", { params: { q: query } });
        setSuggestions(res.data || []);
      } catch (err) {
        console.error("❌ Search error:", err.message);
      }
    };
    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  // ✅ Log user changes
  useEffect(() => {
    console.log("👤 User state updated:", user);
  }, [user]);

  // ✅ Guard: wait for user to initialize
  if (user === undefined) {
    return (
      <div className="container my-5 text-center">
        <h4 className="text-muted">Initializing user session...</h4>
      </div>
    );
  }

  return (
    <Router>
      <Navbar scrolled={scrolled} query={query} setQuery={setQuery} />
      <CategoryNavbar scrolled={scrolled} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home scrolled={scrolled} user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadPrescription user={user} />} />
        <Route path="/medicines" element={<Medicines user={user} />} />
        <Route path="/buy/:id" element={<BuyMedicine user={user} />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/checkout" element={<Checkout user={user} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/prescriptions" element={<PrescriptionStatus user={user} />} />
        <Route path="/cart" element={<Cart user={user} />} />
        
        {/* ⬅️ NEW: Health Guide Routes */}
        <Route path="/health-guide" element={<HealthGuide />} />
        {/* Placeholder for specific article pages, matching the links in HealthGuide.jsx */}
        <Route path="/articles/:id" element={<div className="container mt-5"><h3>Article Detail Page (ID: {window.location.pathname.split('/').pop()})</h3><p>Content goes here...</p></div>} />
        <Route path="/blogs" element={<div className="container mt-5"><h3>All Blogs Page</h3><p>List of all blogs goes here...</p></div>} />
        <Route path="/blogs/:id" element={<div className="container mt-5"><h3>Blog Detail Page (ID: {window.location.pathname.split('/').pop()})</h3><p>Content goes here...</p></div>} />

        {/* Pharmacist Routes */}
        <Route
          path="/pharmacist"
          element={
            user?.role === "pharmacist" ? (
              <PharmacistDashboard user={user} />
            ) : user ? (
              <Navigate to="/unauthorized" />
            ) : (
              <div className="container text-center mt-5">
                <h4 className="text-danger">🔒 Please log in to access the pharmacist dashboard</h4>
              </div>
            )
          }
        />
        <Route
          path="/manage-medicines"
          element={
            user?.role === "pharmacist" ? (
              <MedicineManager user={user} />
            ) : user ? (
              <Navigate to="/unauthorized" />
            ) : (
              <div className="container text-center mt-5">
                <h4 className="text-danger">🔒 Please log in to manage medicines</h4>
              </div>
            )
          }
        />
        <Route
          path="/upload-medicine"
          element={
            user?.role === "pharmacist" ? (
              <UploadMedicine user={user} />
            ) : user ? (
              <Navigate to="/unauthorized" />
            ) : (
              <div className="container text-center mt-5">
                <h4 className="text-danger">🔒 Please log in to upload medicines</h4>
              </div>
            )
          }
        />

        {/* Personal Care */}
        <Route path="/personal-care" element={<PersonalCare />} />
        <Route path="/personal-care/skin" element={<SkinCare />} />
        <Route path="/personal-care/hair" element={<HairCare />} />
        <Route path="/personal-care/baby-mom" element={<BabyMomCare />} />
        <Route path="/personal-care/oral" element={<OralCare />} />
        <Route path="/personal-care/elderly" element={<ElderlyCare />} />

        {/* Health Conditions */}
        <Route path="/health-conditions" element={<HealthCondition />} />
        <Route path="/health-conditions/bone-joint" element={<BoneJointCare />} />
        <Route path="/health-conditions/digestive" element={<DigestiveCare />} />
        <Route path="/health-conditions/eye" element={<EyeCare />} />
        <Route path="/health-conditions/pain" element={<PainRelief />} />
        <Route path="/health-conditions/smoking" element={<SmokingCessation />} />
        <Route path="/health-conditions/liver" element={<LiverCare />} />
        <Route path="/health-conditions/cold-cough" element={<ColdCough />} />
        <Route path="/health-conditions/heart" element={<HeartCare />} />
        <Route path="/health-conditions/kidney" element={<KidneyCare />} />
        <Route path="/health-conditions/respiratory" element={<RespiratoryCare />} />
        <Route path="/health-conditions/mental" element={<MentalWellness />} />
        <Route path="/health-conditions/derma" element={<DermaCare />} />

      {/* Vitamins */}
      <Route path="/vitamins" element={<VitaminsPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

    {/* ✅ Navigate after render to avoid React warnings */}
    {selectedMedicineId && <Navigate to={`/buy/${selectedMedicineId}`} replace />}

    {/* ✅ Search Suggestions */}
    {suggestions.length > 0 && (
      <div className="container search-suggestions-container">
        <h5 className="mb-3 text-primary">
          Showing results for: <span className="text-dark">{query}</span>
        </h5>
        <div className="row">
          {suggestions.map((med) => (
            <div key={med._id} className="col-md-4 mb-4">
              <div className="medicine-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <h6>{med.name}</h6>
                  <p><strong>Category:</strong> {med.category}</p>
                  <p><strong>Symptoms:</strong> {med.symptoms?.join(", ")}</p>
                  <p className="text-muted">{med.description}</p>
                  <p><strong>Price:</strong> ₹{med.price}</p>
                </div>
                <button
                  className="btn btn-outline-primary mt-3"
                  onClick={() => setSelectedMedicineId(med._id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </Router>
);
}
