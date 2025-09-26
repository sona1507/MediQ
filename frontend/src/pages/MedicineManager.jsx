import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MedicineManager() {
  const [medicines, setMedicines] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await api.get("/medicines");
        setMedicines(data);
      } catch (err) {
        console.error("Failed to fetch medicines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const startEdit = (medicine) => {
    setEditingId(medicine._id);
    setEditData({
      name: medicine.name,
      price: medicine.price,
      stock: medicine.stock,
      prescriptionRequired: medicine.prescriptionRequired,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    try {
      const { data } = await api.patch(`/medicines/${id}`, editData);
      setMedicines((prev) =>
        prev.map((m) => (m._id === id ? { ...m, ...data.medicine } : m))
      );
      cancelEdit();
    } catch (err) {
      console.error("Failed to update medicine:", err);
      alert("❌ Update failed.");
    }
  };

  if (loading) return <p className="text-center">Loading medicines...</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-success text-center">🧾 Manage Medicines</h2>

      {medicines.length === 0 ? (
        <div className="alert alert-info">No medicines found.</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Prescription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med._id}>
                <td>
                  {editingId === med._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    med.name
                  )}
                </td>
                <td>
                  {editingId === med._id ? (
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    med.price
                  )}
                </td>
                <td>
                  {editingId === med._id ? (
                    <input
                      type="number"
                      name="stock"
                      value={editData.stock}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    med.stock
                  )}
                </td>
                <td>
                  {editingId === med._id ? (
                    <select
                      name="prescriptionRequired"
                      value={editData.prescriptionRequired}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Required">Required</option>
                      <option value="Not Required">Not Required</option>
                    </select>
                  ) : (
                    med.prescriptionRequired
                  )}
                </td>
                <td>
                  {editingId === med._id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => saveEdit(med._id)}
                      >
                        💾 Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={cancelEdit}
                      >
                        ❌ Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => startEdit(med)}
                    >
                      ✏️ Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
