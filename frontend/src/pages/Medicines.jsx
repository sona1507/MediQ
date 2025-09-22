import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Medicines() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const url = query.trim()
          ? `/medicines/search?q=${encodeURIComponent(query)}`
          : `/medicines`;
        const { data } = await api.get(url);
        setMedicines(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setMedicines([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchMedicines, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleView = (id) => {
    navigate(`/buy/${id}`);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary">🩺 Browse Medicines</h2>

      {/* Search Bar */}
      <div className="input-group mb-4">
        <input
          className="form-control"
          placeholder="Search by name, category, or symptoms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading && <p className="text-center">Loading…</p>}

      {/* Empty State */}
      {!loading && medicines.length === 0 && (
        <p className="text-center text-muted">No medicines found.</p>
      )}

      {/* Medicine List */}
      <div className="list-group">
        {medicines.map((med) => (
          <div key={med._id} className="list-group-item">
            {/* Collapsed View */}
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSelectedId(selectedId === med._id ? null : med._id)
              }
            >
              <div>
                <strong>{med.name}</strong>
                <div className="text-muted small">{med.category}</div>
              </div>
              <span className="text-primary">
                {selectedId === med._id ? "▲" : "▼"}
              </span>
            </div>

            {/* Expanded View */}
            {selectedId === med._id && (
              <div className="mt-3 border-top pt-3">
                <p><b>Category:</b> {med.category}</p>
                <p><b>Description:</b> {med.description}</p>

                <button
                  className="btn btn-outline-primary w-100 mt-3"
                  onClick={() => handleView(med._id)}
                >
                  View
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
