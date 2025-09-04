import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MedicineSearch from "./components/MedicineSearch";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Direct Medicine Search Page (optional) */}
        <Route path="/search" element={<MedicineSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
