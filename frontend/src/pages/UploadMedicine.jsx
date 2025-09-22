import { useState } from "react";
import api from "../api/axios";

export default function UploadMedicine() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    symptoms: "",
    price: "",
    stock: "",
    dosage: "",
    description: "",
    prescriptionRequired: "Not Required",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await api.post("/medicines", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Medicine uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary">➕ Add New Medicine</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <input name="name" className="form-control mb-3" placeholder="Medicine Name" onChange={handleChange} />
        <input name="category" className="form-control mb-3" placeholder="Category" onChange={handleChange} />
        <input name="symptoms" className="form-control mb-3" placeholder="Symptoms (comma-separated)" onChange={handleChange} />
        <input name="price" type="number" className="form-control mb-3" placeholder="Price" onChange={handleChange} />
        <input name="stock" type="number" className="form-control mb-3" placeholder="Stock" onChange={handleChange} />
        <input name="dosage" className="form-control mb-3" placeholder="Dosage" onChange={handleChange} />
        <textarea name="description" className="form-control mb-3" placeholder="Description" onChange={handleChange} />
        <select name="prescriptionRequired" className="form-select mb-3" onChange={handleChange}>
          <option value="Not Required">Not Required</option>
          <option value="Required">Required</option>
        </select>
        <input type="file" accept="image/*" className="form-control mb-3" onChange={handleFileChange} />
        <button className="btn btn-success w-100">Upload Medicine</button>
      </form>
    </div>
  );
}
