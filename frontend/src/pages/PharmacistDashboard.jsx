import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function PharmacistDashboard({ user }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [newEntries, setNewEntries] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "pharmacist") {
      setUnauthorized(true);
      setLoading(false);
      return;
    }

    const fetchPrescriptions = async () => {
      try {
        const res = await axios.get("/api/prescriptions");
        setPrescriptions(res.data || []);
      } catch (err) {
        console.error("Error fetching prescriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchMedicines = async () => {
      try {
        const res = await axios.get("/api/medicines");
        setMedicines(res.data || []);
      } catch (err) {
        console.error("Error fetching medicines:", err);
      }
    };

    fetchPrescriptions();
    fetchMedicines();
  }, [user]);

  const handleAction = async (id, action) => {
    setActionLoading(id);
    try {
      await axios.patch(`/api/prescriptions/${id}/${action}`, {
        reviewedBy: user._id,
        notes: `Marked as ${action} by ${user.name}`,
      });

      const res = await axios.get("/api/prescriptions");
      setPrescriptions(res.data || []);
    } catch (err) {
      console.error(`Error during ${action}:`, err);
      alert(err.response?.data?.message || `Failed to ${action} prescription.`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleMedicineUpload = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    formData.append("name", form.name.value);
    formData.append("category", form.category.value);
    formData.append("price", form.price.value);
    formData.append("stock", form.stock.value);
    formData.append("dosage", form.dosage.value);
    formData.append("description", form.description.value);
    formData.append("prescriptionRequired", form.prescriptionRequired.value);
    formData.append("image", form.image.files[0]);

    const symptomsArray = form.symptoms.value
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);
    formData.append("symptoms", JSON.stringify(symptomsArray));

    try {
      await axios.post("/api/medicines", formData);
      alert("✅ Medicine uploaded successfully!");
      form.reset();
    } catch (err) {
      console.error("Medicine upload failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Failed to upload medicine.");
    }
  };

  const addNewEntry = (prescriptionId) => {
    setNewEntries(prev => ({
      ...prev,
      [prescriptionId]: [...(prev[prescriptionId] || []), {
        medicine: "",
        dosage: "",
        instructions: "",
        description: ""
      }]
    }));
  };

  const updateEntry = (prescriptionId, index, field, value) => {
    setNewEntries(prev => {
      const updated = [...(prev[prescriptionId] || [])];
      updated[index][field] = value;
      return { ...prev, [prescriptionId]: updated };
    });
  };

  const handleAddMedicines = async (prescriptionId) => {
    const entries = newEntries[prescriptionId]?.filter(e => e.medicine);
    if (!entries || entries.length === 0) {
      alert("Please add at least one medicine.");
      return;
    }

    try {
      await axios.patch(`/api/prescriptions/${prescriptionId}/medicines`, {
        items: entries,
      });

      const res = await axios.get("/api/prescriptions");
      setPrescriptions(res.data || []);
      setNewEntries(prev => ({ ...prev, [prescriptionId]: [] }));
      alert("✅ Medicines added to prescription!");
    } catch (err) {
      console.error("Failed to add medicines:", err);
      alert("❌ Failed to add medicines.");
    }
  };

  if (unauthorized) return <Navigate to="/unauthorized" />;


  return (
    <div className="container my-5">
      {/* 🧭 Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">🧑‍⚕️ Pharmacist Dashboard</h2>
        <div className="d-flex gap-2">
          <button
            className={`btn btn-outline-${showMedicineForm ? "secondary" : "primary"}`}
            onClick={() => setShowMedicineForm(false)}
          >
            📄 View Prescriptions
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowMedicineForm(true)}
          >
            💊 Upload Medicine
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => navigate("/manage-medicines")}
          >
            🧾 Manage Medicines
          </button>
        </div>
      </div>

      {/* 💊 Medicine Upload Form */}
      {showMedicineForm ? (
        <form onSubmit={handleMedicineUpload} className="card p-4 shadow-sm">
          <h5 className="mb-4 text-primary">➕ Add New Medicine</h5>
          <input name="name" className="form-control mb-3" placeholder="Medicine Name *" required />
          <input name="category" className="form-control mb-3" placeholder="Category" />
          <input name="symptoms" className="form-control mb-3" placeholder="Symptoms (comma-separated)" />
          <input name="price" type="number" className="form-control mb-3" placeholder="Price *" required />
          <input name="stock" type="number" className="form-control mb-3" placeholder="Stock *" required />
          <input name="dosage" className="form-control mb-3" placeholder="Dosage" />
          <textarea name="description" className="form-control mb-3" placeholder="Description" />
          <select name="prescriptionRequired" className="form-select mb-3">
            <option value="Not Required">Not Required</option>
            <option value="Required">Required</option>
          </select>
          <input type="file" name="image" accept="image/*" className="form-control mb-3" required />
          <button className="btn btn-success w-100">Upload Medicine</button>
        </form>
      ) : (
        <>
          {loading ? (
            <p>Loading prescriptions...</p>
          ) : prescriptions.length === 0 ? (
            <div className="alert alert-info">No prescriptions found.</div>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>File Name</th>
                  <th>Uploaded At</th>
                  <th>Status</th>
                  <th>Medicines to Attach</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map(p => (
                  <tr key={p._id}>
                    <td>
                      <strong>{p.userId?.name || "Unnamed"}</strong><br />
                      <small className="text-muted">User ID: {p.userId?.userId || p.userId?._id}</small>
                    </td>
                    <td>{p.originalName || p.fileName || "—"}</td>
                    <td>{new Date(p.createdAt).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${p.status === "approved" ? "bg-success" :
                        p.status === "rejected" ? "bg-danger" :
                          "bg-warning text-dark"
                        }`}>
                        {p.status?.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      {p.status === "approved" ? (
                        <div className="d-flex flex-column gap-3">
                          {(newEntries[p._id] || []).map((entry, idx) => (
                            <div key={idx} className="card p-2 shadow-sm">
                              <select
                                className="form-select mb-2"
                                value={entry.medicine}
                                onChange={(e) =>
                                  updateEntry(p._id, idx, "medicine", e.target.value)
                                }
                              >
                                <option value="">Select Medicine</option>
                                {medicines.map(m => (
                                  <option key={m._id} value={m._id}>
                                    {m.name} – ₹{m.price}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Dosage"
                                value={entry.dosage}
                                onChange={(e) =>
                                  updateEntry(p._id, idx, "dosage", e.target.value)
                                }
                              />
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Instructions"
                                value={entry.instructions}
                                onChange={(e) =>
                                  updateEntry(p._id, idx, "instructions", e.target.value)
                                }
                              />
                              <textarea
                                className="form-control mb-2"
                                placeholder="Description"
                                value={entry.description}
                                onChange={(e) =>
                                  updateEntry(p._id, idx, "description", e.target.value)
                                }
                              />
                            </div>
                          ))}
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => addNewEntry(p._id)}
                            >
                              ➕ Add Medicine
                            </button>
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => handleAddMedicines(p._id)}
                            >
                              ✅ Submit Medicines
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted">Reviewed</span>
                      )}
                    </td>



                    <td>
                      {p.status === "pending" ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            disabled={actionLoading === p._id}
                            onClick={() => handleAction(p._id, "approve")}
                          >
                            {actionLoading === p._id ? "Approving..." : "✅ Approve"}
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            disabled={actionLoading === p._id}
                            onClick={() => handleAction(p._id, "reject")}
                          >
                            {actionLoading === p._id ? "Rejecting..." : "❌ Reject"}
                          </button>
                        </>
                      ) : (
                        <span className="text-muted">Reviewed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
export default PharmacistDashboard;