import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

function Navbar({ scrolled }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!query.trim()) {
        setSuggestions([]);
        setSelectedMedicine(null);
        return;
      }

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

  const handleSelect = (med) => {
    setSelectedMedicine(med);
    setQuery(med.name);
    setSuggestions([]);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top" style={{ zIndex: 1000 }}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="d-flex align-items-center flex-grow-1 position-relative">
            <Link className="navbar-brand d-flex align-items-center me-3" to="/">
              <img
                src="/images/logo.png"
                alt="Logo"
                width="45"
                height="45"
                className="me-2"
              />
              <span className="fw-bold text-primary">
                Medi<span className="text-dark">Q</span>
              </span>
            </Link>

            {/* ✅ Search Bar (only when scrolled) */}
            {scrolled && (
              <div className="position-relative" style={{ width: "100%" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search medicines..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    borderRadius: "6px",
                    border: "1px solid #007bff",
                    padding: "8px 12px",
                    fontSize: "15px",
                  }}
                />

                {/* ✅ Suggestions Dropdown */}
                {suggestions.length > 0 && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      zIndex: 1050,
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {suggestions.map((med) => (
                      <li
                        key={med._id}
                        onClick={() => handleSelect(med)}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "#007bff",
                          borderBottom: "1px solid #eee",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f9ff")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                      >
                        {med.name}
                      </li>
                    ))}
                  </ul>
                )}

                {/* ✅ Selected Medicine Details */}
                {selectedMedicine && (
                  <div
                    style={{
                      marginTop: "8px",
                      padding: "10px",
                      background: "#f9f9f9",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "13px",
                      color: "#333",
                    }}
                  >
                    <div><strong>Name:</strong> {selectedMedicine.name}</div>
                    <div><strong>Category:</strong> {selectedMedicine.category}</div>
                    <div><strong>Symptoms:</strong> {selectedMedicine.symptoms.join(", ")}</div>
                    <div><strong>Description:</strong> {selectedMedicine.description}</div>
                    <div><strong>Price:</strong> ₹{selectedMedicine.price}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">🏠 Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/medicines">💊 Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/upload">📤 Upload</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">🛒 Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-primary ms-lg-3 mt-2 mt-lg-0 px-3" to="/login">
                  🔑 Sign In / Join
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
