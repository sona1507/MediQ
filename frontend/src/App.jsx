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

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    };
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  useEffect(() => {
    console.log("👤 Logged in user:", user);
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      const height = navbar.offsetHeight;
      document.documentElement.style.setProperty("--main-navbar-height", `${height}px`);
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) return setSuggestions([]);
      try {
        const res = await api.get("/medicines/search", { params: { q: query } });
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

      {selectedMedicineId && <Navigate to={`/buy/${selectedMedicineId}`} />}

      {suggestions.length > 0 && (
        <div className="container mt-5">
          <div className="p-4 bg-white rounded shadow-sm" style={{ marginTop: "100px" }}>
            <h5 className="mb-3 text-primary">
              Showing results for: <span className="text-dark">{query}</span>
            </h5>
            <div className="row">
              {suggestions.map((med) => (
                <div key={med._id} className="col-md-4 mb-4">
                  <div className="p-3 border rounded bg-light h-100 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="text-primary">{med.name}</h6>
                      <p className="mb-1"><strong>Category:</strong> {med.category}</p>
                      <p className="mb-1"><strong>Symptoms:</strong> {med.symptoms.join(", ")}</p>
                      <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>{med.description}</p>
                      <p className="mt-2"><strong>Price:</strong> ₹{med.price}</p>
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
        </div>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home scrolled={scrolled} user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadPrescription user={user} />} />
        <Route path="/medicines" element={<Medicines user={user} />} />
        <Route path="/buy/:id" element={<BuyMedicine user={user} />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
