import React from "react";
import Navbar from "./components/Navbar";   // your navbar
import MedicineSearch from "./components/MedicineSearch";

function App() {
  return (
    <div>
      {/* Navbar stays on top */}
      <Navbar />

      {/* Main content */}
      <div style={{ padding: "30px" }}>
        <h2 style={{ fontFamily: "'Kreon', serif", marginBottom: "20px" }}>
          🔍 Search Medicines
        </h2>
        <MedicineSearch />
      </div>
    </div>
  );
}

export default App;
