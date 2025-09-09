import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Medicines() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [meds, setMeds] = useState([]);

  async function fetchAll() {
    setLoading(true);
    try {
      const url = q?.trim()
        ? `/api/medicines?search=${encodeURIComponent(q)}`
        : `/api/medicines`;
      const { data } = await api.get(url);
      setMeds(Array.isArray(data) ? data : []);
    } catch (e) {
      setMeds([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAll(); }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Search Medicines</h2>

      {/* Search Bar */}
      <div className="input-group mb-4">
        <input
          className="form-control"
          placeholder="Search by name, category, or symptoms..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button onClick={fetchAll} className="btn btn-primary">Search</button>
      </div>

      {loading && <p className="text-center">Loading…</p>}
      {!loading && meds.length === 0 && (
        <p className="text-center text-muted">No medicines found.</p>
      )}

      <div className="row g-3">
        {meds.map((m) => (
          <div key={m._id} className="col-md-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">{m.name}</h5>
                <p className="card-text">
                  {m.category} • ₹{m.price} • Stock: {m.stock}
                </p>
                {m.symptoms?.length && (
                  <p><b>Symptoms:</b> {m.symptoms.join(", ")}</p>
                )}
                {m.dosage && <p><b>Dosage:</b> {m.dosage}</p>}
                <p>{m.description}</p>
                <p><b>Prescription:</b> {m.prescriptionRequired ? "Required" : "Not Required"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
