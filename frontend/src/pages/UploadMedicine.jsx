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

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock || !form.image) {
      alert("Please fill all required fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("dosage", form.dosage);
    formData.append("description", form.description);
    formData.append("prescriptionRequired", form.prescriptionRequired);
    formData.append("image", form.image);

    const symptomsArray = form.symptoms
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);
    formData.append("symptoms", JSON.stringify(symptomsArray));

    try {
      setLoading(true);
      await api.post("/medicines", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Medicine uploaded successfully!");
      setForm({
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
      setPreview(null);
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert(err.response?.data?.message || "Failed to upload medicine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary">➕ Add New Medicine</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <input
          name="name"
          className="form-control mb-3"
          placeholder="Medicine Name *"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          className="form-control mb-3"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="symptoms"
          className="form-control mb-3"
          placeholder="Symptoms (comma-separated)"
          value={form.symptoms}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          className="form-control mb-3"
          placeholder="Price *"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="stock"
          type="number"
          className="form-control mb-3"
          placeholder="Stock *"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <input
          name="dosage"
          className="form-control mb-3"
          placeholder="Dosage"
          value={form.dosage}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="form-control mb-3"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <select
          name="prescriptionRequired"
          className="form-select mb-3"
          value={form.prescriptionRequired}
          onChange={handleChange}
        >
          <option value="Not Required">Not Required</option>
          <option value="Required">Required</option>
        </select>
        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={handleFileChange}
          required
        />
        {preview && (
          <div className="mb-3 text-center">
            <img
              src={preview}
              alt="Preview"
              style={{ maxHeight: "150px", objectFit: "contain" }}
            />
          </div>
        )}
        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Uploading..." : "Upload Medicine"}
        </button>
      </form>
    </div>
  );
}
