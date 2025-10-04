import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CategoryNavbar from "./components/CategoryNavbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UploadPrescription from "./pages/UploadPrescription.jsx";
import PharmacistDashboard from "./pages/PharmacistDashboard.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import Medicines from "./pages/Medicines.jsx";
import BuyMedicine from "./pages/BuyMedicine.jsx";
import MedicineManager from "./pages/MedicineManager.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UploadMedicine from "./pages/UploadMedicine.jsx";
import api from "./api/axios.js";
import "./App.css";
import "./index.css";
import Checkout from "./pages/Checkout.jsx";
import PrescriptionStatus from "./pages/PrescriptionStatus.jsx";
import HealthGuide from "./pages/HealthGuide.jsx";

// Personal Care
import PersonalCare from "./components/personalcare/PersonalCare.jsx";
import SkinCare from "./components/personalcare/SkinCare.jsx";
import HairCare from "./components/personalcare/HairCare.jsx";
import BabyMomCare from "./components/personalcare/BabyMomCare.jsx";
import OralCare from "./components/personalcare/OralCare.jsx";
import ElderlyCare from "./components/personalcare/ElderlyCare.jsx";

// Health Conditions
import HealthCondition from "./components/healthcondition/HealthCondition.jsx";
import BoneJointCare from "./components/healthcondition/BoneJointCare.jsx";
import DigestiveCare from "./components/healthcondition/DigestiveCare.jsx";
import EyeCare from "./components/healthcondition/EyeCare.jsx";
import PainRelief from "./components/healthcondition/PainRelief.jsx";
import SmokingCessation from "./components/healthcondition/SmokingCessation.jsx";
import LiverCare from "./components/healthcondition/LiverCare.jsx";
import ColdCough from "./components/healthcondition/ColdCough.jsx";
import HeartCare from "./components/healthcondition/HeartCare.jsx";
import KidneyCare from "./components/healthcondition/KidneyCare.jsx";
import RespiratoryCare from "./components/healthcondition/RespiratoryCare.jsx";
import MentalWellness from "./components/healthcondition/MentalWellness.jsx";
import DermaCare from "./components/healthcondition/DermaCare.jsx";

import VitaminsPage from "./components/VitaminsPage.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";

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
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/upload" element={<UploadPrescription user={user} />} />
        <Route path="/medicines" element={<Medicines user={user} />} />
        <Route path="/buy/:id" element={<BuyMedicine user={user} />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/checkout" element={<Checkout user={user} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/prescriptions" element={<PrescriptionStatus user={user} />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/orders" element={<Orders user={user} />} />
<Route path="/orders" element={<Orders user={user} />} />


        {/* Health Guide */}
        <Route path="/health-guide" element={<HealthGuide />} />
      <Route
        path="/articles/:id"
        element={
          <div className="container mt-5">
            <h3>Article Detail Page (ID: {window.location.pathname.split("/").pop()})</h3>
            <p>Content goes here...</p>
          </div>
        }
      />
      <Route
        path="/blogs"
        element={
          <div className="container mt-5">
            <h3>All Blogs Page</h3>
            <p>List of all blogs goes here...</p>
          </div>
        }
      />
      <Route
        path="/blogs/:id"
        element={
          <div className="container mt-5">
            <h3>Blog Detail Page (ID: {window.location.pathname.split("/").pop()})</h3>
            <p>Content goes here...</p>
          </div>
        }
      />

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

      {/* Conditional Navigation */}
      {selectedMedicineId && (
        <Route
          path="/redirect"
          element={<Navigate to={`/buy/${selectedMedicineId}`} replace />}
        />
      )}
    </Routes>

    {/* Search Suggestions */}
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