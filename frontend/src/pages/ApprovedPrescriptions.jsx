import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ApprovedPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPres, setSelectedPres] = useState(null);
  const [meds, setMeds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  // 1) Load all prescriptions and filter approved
  async function loadApproved() {
    try {
      const { data } = await api.get("/api/prescriptions");
      const approved = Array.isArray(data)
        ? data.filter((p) => p.status === "approved")
        : [];
      setPrescriptions(approved);
    } catch (e) {
      console.error(e);
    }
  }

  // 2) When a prescription is chosen, fetch its medicine details
  async function loadPrescriptionMeds(pres) {
    setSelectedPres(pres);
    setMeds([]);
    setSelectedIds([]);

    // Expect pres.medicines = ["id1","id2",...]
    const ids = pres?.medicines || [];
    if (!ids.length) return;

    try {
      // Preferred: backend helper
      const { data } = await api.post("/api/medicines/byIds", { ids });
      setMeds(data);
    } catch (e) {
      console.error(e);
      // If helper not available, you could fallback to multiple requests (only if you have GET /api/medicines/:id)
    }
  }

  // 3) Add to cart (localStorage)
  function addToCart(items) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const merged = [...cart, ...items];
    localStorage.setItem("cart", JSON.stringify(merged));
  }

  function buyAll() {
    if (!meds.length) return alert("No medicines to buy");
    addToCart(meds.map(m => ({ ...m, quantity: 1 })));
    alert("All medicines added to cart ✅");
  }

  function buySelected() {
    const chosen = meds.filter((m) => selectedIds.includes(m._id));
    if (!chosen.length) return alert("Select at least one");
    addToCart(chosen.map(m => ({ ...m, quantity: 1 })));
    alert("Selected medicines added to cart ✅");
  }

  useEffect(() => {
    loadApproved();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Approved Prescriptions</h2>

      {/* List approved prescriptions */}
      <div className="grid gap-3 md:grid-cols-2">
        {prescriptions.map((p) => (
          <div key={p._id} className="border rounded p-3">
            <div className="font-semibold">Prescription: {p._id}</div>
            <div className="text-sm text-gray-600">Status: {p.status}</div>
            {p.userId && <div className="text-sm">User: {p.userId}</div>}
            <button
              className="mt-2 px-3 py-1 rounded bg-black text-white"
              onClick={() => loadPrescriptionMeds(p)}
            >
              View Medicines
            </button>
          </div>
        ))}
      </div>

      {/* Selected prescription medicines */}
      {selectedPres && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">
            Medicines in Prescription {selectedPres._id}
          </h3>

          {meds.length === 0 ? (
            <p className="text-gray-500">No medicines attached.</p>
          ) : (
            <>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Select</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Prescription</th>
                  </tr>
                </thead>
                <tbody>
                  {meds.map((m) => (
                    <tr key={m._id}>
                      <td className="p-2 border text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(m._id)}
                          onChange={(e) => {
                            setSelectedIds((prev) =>
                              e.target.checked
                                ? [...prev, m._id]
                                : prev.filter((id) => id !== m._id)
                            );
                          }}
                        />
                      </td>
                      <td className="p-2 border">{m.name}</td>
                      <td className="p-2 border">{m.category}</td>
                      <td className="p-2 border">₹{m.price}</td>
                      <td className="p-2 border">
                        {m.prescriptionRequired || (m.prescriptionRequired === false ? "Not Required" : "Not Required")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex gap-2 mt-3">
                <button onClick={buyAll} className="px-4 py-2 rounded bg-black text-white">
                  Buy All
                </button>
                <button onClick={buySelected} className="px-4 py-2 rounded border">
                  Buy Selected
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
