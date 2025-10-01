import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PrescriptionStatus({ user }) {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [expandedMedicines, setExpandedMedicines] = useState({});

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
        prescriptions.map((p) => {
          const hasMedicines =
            Array.isArray(p.items) && p.items.length > 0;

          const medicineIds = hasMedicines
            ? p.items.map((item) => item.medicine?._id).filter(Boolean)
            : [];

          return (
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

              {/* Show Medicines Button */}
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
                <ul className="list-group mb-3">
                  {hasMedicines ? (
                    p.items.map((item, idx) => {
                      const med = item.medicine;
                      const isExpanded = expandedMedicines[med._id];

                      return (
                        <li key={med?._id || idx} className="list-group-item">
                          <div
                            className="d-flex justify-content-between align-items-center"
                            onClick={() =>
                              setExpandedMedicines((prev) => ({
                                ...prev,
                                [med._id]: !prev[med._id],
                              }))
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <strong>{med?.name || "Unnamed"}</strong>
                            <span className="badge bg-light text-dark">
                              {isExpanded ? "Hide" : "View"}
                            </span>
                          </div>

                          {isExpanded && (
                            <div className="mt-3 border-top pt-3">
                              <div className="mb-2">
                                <strong className="text-dark">💬 Description:</strong>
                                <div className="text-muted">
                                  {item.description || med?.description || "No description available."}
                                </div>
                              </div>
                              {item.dosage && (
                                <div className="mb-2">
                                  <strong className="text-dark">🧪 Dosage:</strong>
                                  <div className="text-muted">{item.dosage}</div>
                                </div>
                              )}
                              {item.instructions && (
                                <div className="mb-2">
                                  <strong className="text-dark">📋 Instructions:</strong>
                                  <div className="text-muted">{item.instructions}</div>
                                </div>
                              )}
                              <div className="d-flex gap-2 mt-3">
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
                            </div>
                          )}
                        </li>
                      );
                    })
                  ) : (
                    <li className="list-group-item text-muted">
                      No medicines listed in this approved prescription.
                    </li>
                  )}
                </ul>
              )}

              {/* Buy All Button */}
              {p.status === "approved" && medicineIds.length > 0 && (
                <button
                  className="btn btn-success w-100"
                  onClick={() =>
                    navigate(
                      `/checkout?prescription=${p._id}&meds=${medicineIds.join(",")}`
                    )
                  }
                >
                  🛒 Buy All Medicines
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
