import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ApprovedPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPres, setSelectedPres] = useState(null);
  const [meds, setMeds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loadingMeds, setLoadingMeds] = useState(false);

  // Load all approved prescriptions
  async function loadApproved() {
    try {
      const { data } = await api.get("/prescriptions/approved/all");
      setPrescriptions(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load approved prescriptions:", e);
    }
  }

  // Load medicine details for selected prescription
  async function loadPrescriptionMeds(pres) {
    setSelectedPres(pres);
    setMeds([]);
    setSelectedIds([]);
    setLoadingMeds(true);

    try {
      const { data } = await api.get(`/prescriptions/${pres._id}`);
      setMeds(data.approvedMedicines || []);
    } catch (e) {
      console.error("Failed to load medicines:", e);
    } finally {
      setLoadingMeds(false);
    }
  }

  // Add items to cart in localStorage
  function addToCart(items) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const merged = [...cart, ...items];
    localStorage.setItem("cart", JSON.stringify(merged));
  }

  function buyAll() {
    if (!meds.length) return alert("No medicines to buy");
    addToCart(meds.map(m => ({ ...m, quantity: 1 })));
    alert("All medicines added to cart ✅");
  }

  function buySelected() {
    const chosen = meds.filter((m) => selectedIds.includes(m._id));
    if (!chosen.length) return alert("Select at least one");
    addToCart(chosen.map(m => ({ ...m, quantity: 1 })));
    alert("Selected medicines added to cart ✅");
  }

  useEffect(() => {
    loadApproved();
  }, []);

  return (
    <section className="container py-5">
      <h2 className="mb-4 fw-bold">✅ Approved Prescriptions</h2>

      {/* List of approved prescriptions */}
      <div className="row g-3">
        {prescriptions.map((p) => (
          <div key={p._id} className="col-md-6">
            <div className="card p-3 shadow-sm">
              <div><strong>ID:</strong> {p._id}</div>
              <div><strong>Status:</strong> {p.status}</div>
              {p.userId && <div><strong>User:</strong> {p.userId}</div>}
              {p.filePath && (
                <div className="mt-2">
                  <a
                    href={`http://localhost:5000/${p.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-decoration-underline"
                  >
                    View Uploaded File
                  </a>
                </div>
              )}
              <button
                className="btn btn-dark mt-3"
                onClick={() => loadPrescriptionMeds(p)}
              >
                View Medicines
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Medicines in selected prescription */}
      {selectedPres && (
        <div className="mt-5">
          <h4 className="mb-3">
            Medicines in Prescription <code>{selectedPres._id}</code>
          </h4>

          {loadingMeds ? (
            <p className="text-muted">Loading medicines...</p>
          ) : meds.length === 0 ? (
            <p className="text-muted">No medicines attached.</p>
          ) : (
            <>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Prescription</th>
                  </tr>
                </thead>
                <tbody>
                  {meds.map((m) => (
                    <tr key={m._id}>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(m._id)}
                          onChange={(e) => {
                            setSelectedIds((prev) =>
                              e.target.checked
                                ? [...prev, m._id]
                                : prev.filter((id) => id !== m._id)
                            );
                          }}
                        />
                      </td>
                      <td>{m.name}</td>
                      <td>{m.category}</td>
                      <td>₹{m.price}</td>
                      <td>{m.prescriptionRequired ? "Required" : "Not Required"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex gap-2 mt-3">
                <button onClick={buyAll} className="btn btn-dark">
                  Buy All
                </button>
                <button onClick={buySelected} className="btn btn-outline-primary">
                  Buy Selected
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
