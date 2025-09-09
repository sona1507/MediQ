import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MedicineSearch from "./components/MedicineSearch";
import "./App.css";      // ✅ global styles
import "./index.css";   // ✅ optional reset/global tweaks

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Direct Medicine Search Page (optional) */}
        <Route path="/search" element={<MedicineSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
