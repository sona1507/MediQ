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
import Medicines from "./pages/Medicines";
import BuyMedicine from "./pages/BuyMedicine";
import MedicineManager from "./pages/MedicineManager";
import UserProfile from "./components/UserProfile";
import UploadMedicine from "./pages/UploadMedicine";
import api from "./api/axios";
import "./App.css";
import "./index.css";
import Checkout from "./pages/Checkout";
import PrescriptionStatus from "./pages/PrescriptionStatus";

// Personal Care
import PersonalCare from "./components/personalcare/PersonalCare";
import SkinCare from "./components/personalcare/SkinCare";
import HairCare from "./components/personalcare/HairCare";
import BabyMomCare from "./components/personalcare/BabyMomCare";
import OralCare from "./components/personalcare/OralCare";
import ElderlyCare from "./components/personalcare/ElderlyCare";

// Health Conditions
import HealthCondition from "./components/healthcondition/HealthCondition";
import BoneJointCare from "./components/healthcondition/BoneJointCare";
import DigestiveCare from "./components/healthcondition/DigestiveCare";
import EyeCare from "./components/healthcondition/EyeCare";
import PainRelief from "./components/healthcondition/PainRelief";
import SmokingCessation from "./components/healthcondition/SmokingCessation";
import LiverCare from "./components/healthcondition/LiverCare";
import ColdCough from "./components/healthcondition/ColdCough";
import HeartCare from "./components/healthcondition/HeartCare";
import KidneyCare from "./components/healthcondition/KidneyCare";
import RespiratoryCare from "./components/healthcondition/RespiratoryCare";
import MentalWellness from "./components/healthcondition/MentalWellness";
import DermaCare from "./components/healthcondition/DermaCare";

import VitaminsPage from "./components/VitaminsPage"; 
import Cart from './pages/Cart'; 

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(undefined); // ✅ Start with undefined
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);

  // ✅ Load user from localStorage and validate
 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  try {
    const parsed = storedUser ? JSON.parse(storedUser) : null;
    if (
      parsed &&
      typeof parsed === "object" &&
      (parsed.userId || parsed._id) &&
      parsed.role
    ) {
      setUser(parsed);
      console.log("👤 Logged in user:", parsed);
    } else {
      console.warn("🚫 Invalid user object in localStorage");
      setUser(null);
    }
  } catch (err) {
    console.error("❌ Error parsing user:", err);
    setUser(null);
  }
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