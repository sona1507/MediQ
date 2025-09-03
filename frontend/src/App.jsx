import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Medicines from "./pages/Medicines";
import UploadPrescription from "./pages/UploadPrescription";
import ApprovedPrescriptions from "./pages/ApprovedPrescriptions";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Medicines />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/upload" element={<UploadPrescription />} />
          <Route path="/approved" element={<ApprovedPrescriptions />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
