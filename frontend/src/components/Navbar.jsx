import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import UserPanel from "./UserPanel";

function Navbar({ scrolled }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowPanel(false);
      }
    };
    if (showPanel) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPanel]);

  // Debounced search
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top" style={{ zIndex: 1000 }}>
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div className="d-flex align-items-center flex-grow-1 position-relative">
          <Link className="navbar-brand d-flex align-items-center me-3" to="/">
            <img src="/images/logo.png" alt="Logo" width="45" height="45" className="me-2" />
            <span className="fw-bold text-primary">Medi<span className="text-dark">Q</span></span>
          </Link>

          {/* Search Bar */}
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

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <ul className="suggestion-list">
                  {suggestions.map((med) => (
                    <li
                      key={med._id}
                      onClick={() => handleSelect(med)}
                      className="suggestion-item"
                    >
                      {med.name}
                    </li>
                  ))}
                </ul>
              )}

              {/* No matches */}
              {query.trim() && suggestions.length === 0 && (
                <div className="suggestion-empty">No matches found.</div>
              )}

              {/* Selected Medicine */}
              {selectedMedicine && (
                <div className="selected-medicine">
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

        {/* Navigation */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/">🏠 Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/medicines">💊 Medicines</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/upload">📤 Upload</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cart">🛒 Cart</Link></li>

            {!user ? (
              <li className="nav-item">
                <Link className="btn btn-outline-primary ms-lg-3 mt-2 mt-lg-0 px-3" to="/login">
                  🔑 Sign In / Join
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-secondary ms-lg-3 mt-2 mt-lg-0 px-3"
                  onClick={() => setShowPanel(!showPanel)}
                >
                  👤 {user.name}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Floating Panel */}
      {showPanel && (
        <div ref={panelRef}>
          <UserPanel user={user} onClose={() => setShowPanel(false)} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
