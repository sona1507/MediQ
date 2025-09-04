import React from "react";
import MedicineSearch from "../components/MedicineSearch";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: "url('/images/bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1>
          Welcome to <span className="brand">MediQ</span>
        </h1>
        <p>Your trusted pharmacy partner – search, order & manage medicines online.</p>
        <MedicineSearch />
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>🔎 Search Medicines</h3>
          <p>Find medicines by name, category, or symptoms easily.</p>
        </div>
        <div className="feature-card">
          <h3>📤 Upload Prescription</h3>
          <p>Upload doctor’s prescription for pharmacist approval.</p>
        </div>
        <div className="feature-card">
          <h3>🛒 Easy Orders</h3>
          <p>Buy all approved medicines in one click or select only what you need.</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <a href="/search" className="link-btn">Browse Medicines</a>
        <a href="/prescriptions" className="link-btn">Upload Prescription</a>
        <a href="/orders" className="link-btn">View Orders</a>
      </section>
    </div>
  );
}

export default Home;
