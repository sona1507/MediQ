import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function PharmacistDashboard({ user }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

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
        reviewedBy: user._id, // ✅ updated field name
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

  if (unauthorized) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-success">🧑‍⚕️ Pharmacist Dashboard</h2>

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
    </div>
  );
}

export default PharmacistDashboard;
