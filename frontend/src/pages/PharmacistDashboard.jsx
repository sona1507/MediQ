import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function PharmacistDashboard({ user }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState({});
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [preview, setPreview] = useState(null);


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

    const fetchMedicines = async () => {
      try {
        const res = await axios.get("/api/medicines");
        setMedicines(res.data);
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
        medicineIds: selectedMedicines[id] || [],
      });

      const res = await axios.get("/api/prescriptions");
      const pending = res.data.filter(p => p.status === "pending");
      setPrescriptions(pending);
      setSelectedMedicines(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
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
                  <th>Uploaded At</th>
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
                      <select
                        multiple
                        className="form-select"
                        value={selectedMedicines[p._id] || []}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                          setSelectedMedicines(prev => ({ ...prev, [p._id]: selected }));
                        }}
                      >
                        {medicines.map(m => (
                          <option key={m._id} value={m._id}>
                            {m.name} – ₹{m.price}
                          </option>
                        ))}
                      </select>
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
