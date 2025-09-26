import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function PharmacistDashboard({ user }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [showMedicineForm, setShowMedicineForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!user || user.role !== "pharmacist") {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/prescriptions");
        const pending = res.data.filter(p => p.status === "pending");
        setPrescriptions(pending);
      } catch (err) {
        console.error("Error fetching prescriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [user]);

  const handleAction = async (id, action) => {
    setActionLoading(id);
    try {
      await axios.patch(`/api/prescriptions/${id}/${action}`, {
        reviewedBy: user._id,
        notes: `Marked as ${action} by ${user.name}`
      });

      const res = await axios.get("/api/prescriptions");
      const pending = res.data.filter(p => p.status === "pending");
      setPrescriptions(pending);
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

  if (unauthorized) {
    return <Navigate to="/unauthorized" />;
  }

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
            className={`btn btn-outline-${showMedicineForm ? "primary" : "secondary"}`}
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
          <h4 className="mb-3 text-primary">Add New Medicine</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <input type="text" name="name" className="form-control" placeholder="Medicine Name" required />
            </div>
            <div className="col-md-6">
              <input type="text" name="category" className="form-control" placeholder="Category" required />
            </div>
            <div className="col-md-4">
              <input type="number" name="price" className="form-control" placeholder="Price" required />
            </div>
            <div className="col-md-4">
              <input type="number" name="stock" className="form-control" placeholder="Stock" required />
            </div>
            <div className="col-md-4">
              <input type="text" name="dosage" className="form-control" placeholder="Dosage" required />
            </div>
            <div className="col-md-12">
              <input type="text" name="symptoms" className="form-control" placeholder="Symptoms (comma-separated)" required />
            </div>
            <div className="col-md-12">
              <textarea name="description" className="form-control" placeholder="Description" rows="3" required />
            </div>
            <div className="col-md-6">
              <select name="prescriptionRequired" className="form-select">
                <option value="Required">Prescription Required</option>
                <option value="Not Required">No Prescription</option>
              </select>
            </div>
            <div className="col-md-6">
              <input type="file" name="image" className="form-control" accept="image/*" required />
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-4 w-100">Upload Medicine</button>
        </form>
      ) : (
        // 📄 Prescription Table
        <>
          {loading ? (
            <p>Loading prescriptions...</p>
          ) : prescriptions.length === 0 ? (
            <div className="alert alert-info">No pending prescriptions.</div>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>File Name</th>
                  <th>Original Name</th>
                  <th>Uploaded At</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map(p => (
                  <tr key={p._id}>
                    <td>
                      {typeof p.userId === "object" ? (
                        <>
                          <strong>{p.userId.name || "Unnamed"}</strong><br />
                          <small className="text-muted">
                            User ID: {p.userId.userId || p.userId._id}
                          </small>
                        </>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>{p.fileName || p.file || "—"}</td>
                    <td>{p.originalName || "—"}</td>
                    <td>{new Date(p.createdAt).toLocaleString()}</td>
                    <td>
                      <span className="badge bg-warning text-dark text-uppercase">
                        {p.status}
                      </span>
                    </td>
                    <td>
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
