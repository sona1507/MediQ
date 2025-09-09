import React from "react";
import MedicineSearch from "../components/MedicineSearch";

function Home() {
  return (
    <div>
     {/* Hero Section */}
{/* Hero Section */}
<section
  className="hero d-flex flex-column justify-content-center align-items-center text-center"
  style={{
    backgroundImage: "url('/images/bg1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "70vh",
    borderRadius: "12px",
    margin: "20px",
    position: "relative",
    color: "#333",
  }}
>
  

  {/* Content on top of image */}
  <div
    style={{
      position: "relative", // keeps it above overlay
      maxWidth: "700px",
      width: "100%",
      padding: "20px",
    }}
  >
    <h1 className="fw-bold mb-3" style={{ color: "#333" }}>
      Welcome to <span className="text-info">MediQ</span>
    </h1>
    <p className="text-muted mb-4">
      Your trusted pharmacy partner – search, order & manage medicines online.
    </p>
    <div>
      <MedicineSearch />
    </div>
  </div>
</section>



      {/* Features */}
      <section className="container my-5">
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h3>🔎 Search Medicines</h3>
                <p>Find medicines by name, category, or symptoms easily.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h3>📤 Upload Prescription</h3>
                <p>Upload doctor’s prescription for pharmacist approval.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h3>🛒 Easy Orders</h3>
                <p>Buy approved medicines in one click or select only what you need.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-light py-4">
        <div className="container text-center">
          <a href="/search" className="btn btn-outline-primary m-2">Browse Medicines</a>
          <a href="/prescriptions" className="btn btn-outline-success m-2">Upload Prescription</a>
          <a href="/orders" className="btn btn-outline-dark m-2">View Orders</a>
        </div>
      </section>
    </div>
  );
}

export default Home;
