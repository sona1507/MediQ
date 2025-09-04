import React, { useEffect, useState } from "react";
import axios from "axios";

function MedicineSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Fetch medicines only when user types
  useEffect(() => {
    if (!query) {
      setSuggestions([]); // clear suggestions when input is empty
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/medicines/search", {
          params: { q: query },
        });
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [query]);

  const handleSelect = (medicine) => {
    setSelectedMedicine(medicine);
    setQuery(medicine.name); // autofill input
    setSuggestions([]); // hide suggestions
  };

  return (
    <div style={{ background: "#f4f9ff", padding: "30px", borderRadius: "12px", maxWidth: "700px", margin: "30px auto", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
      <h2 style={{ color: "#007bff", marginBottom: "20px", fontFamily: "Segoe UI, sans-serif", textAlign: "center" }}>
        🔎 Search Medicines
      </h2>

      <div style={{ position: "relative", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name, category, or symptom..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 15px",
            borderRadius: "8px",
            border: "1px solid #007bff",
            outline: "none",
            fontSize: "16px",
            fontFamily: "Segoe UI, sans-serif",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
          }}
        />

        {suggestions.length > 0 && (
          <ul style={{
            position: "absolute",
            top: "50px",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            maxHeight: "220px",
            overflowY: "auto",
            listStyle: "none",
            margin: 0,
            padding: 0,
            zIndex: 1000,
          }}>
            {suggestions.map((med) => (
              <li
                key={med._id}
                onClick={() => handleSelect(med)}
                style={{ padding: "12px 15px", cursor: "pointer", borderBottom: "1px solid #f1f1f1", fontFamily: "Segoe UI, sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eaf3ff")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <strong style={{ color: "#007bff" }}>{med.name}</strong>{" "}
                <span style={{ fontSize: "14px", color: "#666" }}>({med.category})</span>
                <br />
                <span style={{ fontSize: "13px", color: "#444" }}>For: {med.symptoms.join(", ")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedMedicine && (
        <div style={{ padding: "20px", border: "1px solid #e0e0e0", borderRadius: "10px", background: "white", boxShadow: "0 3px 10px rgba(0,0,0,0.05)" }}>
          <h3 style={{ color: "#007bff", marginBottom: "10px" }}>{selectedMedicine.name}</h3>
          <p><strong>Category:</strong> {selectedMedicine.category}</p>
          <p><strong>Symptoms:</strong> {selectedMedicine.symptoms.join(", ")}</p>
          <p>{selectedMedicine.description}</p>
          <p><strong>Price:</strong> {selectedMedicine.price}₹</p>
        </div>
      )}
    </div>
  );
}

export default MedicineSearch;
