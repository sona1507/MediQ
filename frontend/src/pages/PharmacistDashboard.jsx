import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function PharmacistDashboard({ user }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

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
    try {
      await axios.patch(`/api/prescriptions/${id}/${action}`);
      setPrescriptions(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(`Error during ${action}:`, err);
    }
  };

  if (unauthorized) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">🧑‍⚕️ Pharmacist Dashboard</h2>

      {loading ? (
        <p>Loading prescriptions...</p>
      ) : prescriptions.length === 0 ? (
        <p>No pending prescriptions.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>User ID</th>
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
                <td>{p.userId}</td>
                <td>{p.fileName || p.file}</td>
                <td>{p.originalName || "—"}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
                <td><span className="badge bg-warning text-dark">{p.status}</span></td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAction(p._id, "approve")}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleAction(p._id, "reject")}
                  >
                    ❌ Reject
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
