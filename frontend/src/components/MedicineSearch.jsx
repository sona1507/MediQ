import React, { useEffect, useState } from "react";
import api from "../api/axios";

function MedicineSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!query.trim()) return setSuggestions([]);

      const fetchData = async () => {
        try {
          const res = await api.get("/medicines/search", {
            params: { q: query },
          });
          setSuggestions(res.data);
        } catch (err) {
          console.error("Search error:", err.message);
        }
      };

      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleToggle = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <>
      {/* ✅ Search Bar */}
      <div
        style={{
          background: "#f4f9ff",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "700px",
          margin: "30px auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          position: "relative",
          zIndex: 1100,
        }}
      >
        <input
          type="text"
          placeholder="Search by name, category, or symptom..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
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
      </div>

      {/* ✅ Results: Only Names */}
      {suggestions.length > 0 && (
        <div
          style={{
            position: "relative",
            zIndex: 1300,
            marginTop: "10px",
            padding: "0 20px",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {suggestions.map((med) => (
            <div
              key={med._id}
              onClick={() => handleToggle(med._id)}
              style={{
                cursor: "pointer",
                padding: "12px 16px",
                borderBottom: "1px solid #eee",
                backgroundColor: expandedId === med._id ? "#f9f9f9" : "#fff",
              }}
            >
              <strong style={{ color: "#007bff" }}>{med.name}</strong>

              {expandedId === med._id && (
                <div style={{ marginTop: "10px", fontSize: "14px", color: "#444" }}>
                  <p><strong>Category:</strong> {med.category}</p>
                  <p><strong>Symptoms:</strong> {med.symptoms.join(", ")}</p>
                  <p>{med.description}</p>
                  <p><strong>Price:</strong> ₹{med.price}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MedicineSearch;
