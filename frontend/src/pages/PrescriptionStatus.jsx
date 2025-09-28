import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PrescriptionStatus({ user }) {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track which prescriptions are expanded

  useEffect(() => {
    if (user && user._id) {
      api
        .get(`/prescriptions/user/${user._id}`)
        .then((res) => setPrescriptions(res.data || []))
        .catch((err) => console.error("Failed to fetch prescriptions:", err));
    }
  }, [user]);

  const toggleMedicines = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!user) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">User not logged in.</div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h4 className="mb-4 text-primary">🧾 Prescription Status</h4>

      {prescriptions.length === 0 ? (
        <div className="alert alert-info">No prescriptions found.</div>
      ) : (
        prescriptions.map((p) => (
          <div key={p._id} className="card mb-4 p-3 shadow-sm">
            <h5 className="text-success">
              Prescription #{p._id?.slice(-6) || "N/A"}
            </h5>
            <p>
              <strong>Uploaded At:</strong>{" "}
              {p.createdAt
                ? new Date(p.createdAt).toLocaleString()
                : "Not available"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  p.status === "approved"
                    ? "bg-success"
                    : p.status === "rejected"
                    ? "bg-danger"
                    : "bg-warning text-dark"
                }`}
              >
                {p.status?.toUpperCase() || "PENDING"}
              </span>
            </p>

            {/* Show Medicines Button for Approved */}
            {p.status === "approved" && (
              <button
                className="btn btn-outline-primary btn-sm mb-3"
                onClick={() => toggleMedicines(p._id)}
              >
                {expanded[p._id] ? "Hide Medicines" : "Show Medicines"}
              </button>
            )}

            {/* Medicine List */}
            {p.status === "approved" && expanded[p._id] && (
              <>
                {Array.isArray(p.medicineIds) && p.medicineIds.length > 0 ? (
                  <ul className="list-group mb-3">
                    {p.medicineIds.map((med) => (
                      <li
                        key={med._id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{med.name || "Unnamed"}</strong> – ₹
                          {med.price ?? "0"}
                          <br />
                          <small>{med.description || "No description"}</small>
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => navigate(`/cart/add/${med._id}`)}
                          >
                            Add to Cart
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/buy/${med._id}`)}
                          >
                            Buy
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : Array.isArray(p.items) && p.items.length > 0 ? (
                  <ul className="list-group mb-3">
                    {p.items.map((item, idx) => (
                      <li
                        key={item.medicine?._id || idx}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{item.medicine?.name || "Unnamed"}</strong> – ₹
                          {item.medicine?.price ?? "0"}
                          <br />
                          <small>{item.medicine?.description || "No description"}</small>
                          {item.dosage && <div><em>Dosage:</em> {item.dosage}</div>}
                          {item.instructions && <div><em>Instructions:</em> {item.instructions}</div>}
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => navigate(`/cart/add/${item.medicine?._id}`)}
                          >
                            Add to Cart
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/buy/${item.medicine?._id}`)}
                          >
                            Buy
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted mb-3">
                    No medicines listed in this approved prescription.
                  </div>
                )}
              </>
            )}

            {/* Buy All Button */}
            {p.status === "approved" && (
              <button
                className="btn btn-success w-100"
                onClick={() => navigate(`/checkout?prescription=${p._id}`)}
              >
                🛒 Buy All Medicines
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
