import React, { useEffect, useState } from "react";
import MedicineSearch from "../components/MedicineSearch";
import { Link } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import CategoryNavbar from "../components/CategoryNavbar"; // ✅ Add this component
import PersonalCare from "../components/personalcare/PersonalCare";
import api from "../api/axios";
import "bootstrap/dist/js/bootstrap.bundle";

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Medicines"); // ✅ New state
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);

    const carouselElement = document.querySelector("#heroCarousel");
    if (carouselElement) {
      const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
      new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
        pause: false,
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) return setSuggestions([]);
      try {
        const res = await api.get("/medicines/search", {
          params: { q: query },
        });
        setSuggestions(res.data);
      } catch (err) {
        console.error("Search error:", err.message);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const renderCategorySection = () => {
    switch (selectedCategory) {
      case "Personal Care":
        return <PersonalCare />;
      case "Medicines":
        return <CategorySection />;
      default:
        return <CategorySection />;
    }
  };

  return (
    <div>
      {/* ✅ HERO SECTION */}
      <div style={{ position: "relative" }}>
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          style={{ margin: "20px", borderRadius: "12px", overflow: "hidden" }}
        >
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active hero-slide" style={carouselStyle("/images/bg1.jpg")}>
              <CarouselContent />
            </div>
            <div className="carousel-item hero-slide" style={carouselStyle("/images/bg2.jpg")}>
              <CarouselContent />
            </div>
            <div className="carousel-item hero-slide" style={carouselStyle("/images/bg3.jpg")}>
              <CarouselContent />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

        {/* ✅ OVERLAY SEARCH BAR */}
        <div className="overlay-search-bar">
          <div className="welcome-text">
            <h1 className="fw-bold mb-3">
              Welcome to <span className="text-info">MediQ</span>
            </h1>
            <p className="text-muted mb-4">
              Your trusted pharmacy partner – search, order & manage medicines online.
            </p>
          </div>
          <MedicineSearch query={query} setQuery={setQuery} scrolled={scrolled} />
        </div>
      </div>

      {/* ✅ Search Results BELOW Hero */}
      {suggestions.length > 0 && (
        <div
          className="container"
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h5 className="mb-3 text-primary">
            Showing results for: <span className="text-dark">{query}</span>
          </h5>

          <div className="row">
            {suggestions.map((med) => (
              <div key={med._id} className="col-md-4 mb-4">
                <div className="p-3 border rounded shadow-sm h-100 bg-light">
                  <h6 className="text-primary">{med.name}</h6>
                  <p className="mb-1"><strong>Category:</strong> {med.category}</p>
                  <p className="mb-1"><strong>Symptoms:</strong> {med.symptoms.join(", ")}</p>
                  <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>{med.description}</p>
                  <p className="mt-2"><strong>Price:</strong> ₹{med.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ CATEGORY NAVBAR */}
      <CategoryNavbar onSelect={setSelectedCategory} />

      {/* ✅ DYNAMIC CATEGORY SECTION */}
      {renderCategorySection()}

      {/* ======= Features ======= */}
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
            <Link to="/upload" className="card shadow h-100 text-decoration-none text-dark">
              <div className="card-body">
                <h3>📤 Upload Prescription</h3>
                <p>Upload doctor’s prescription for pharmacist approval.</p>
              </div>
            </Link>
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

      {/* ======= Quick Links ======= */}

      <section className="bg-light py-4">
        <div className="container text-center">
          <Link to="/search" className="btn btn-outline-primary m-2">
            Browse Medicines
          </Link>

          {/* Show only for non-pharmacist users */}
          {user?.role !== "pharmacist" && (
            <>
              <Link to="/upload" className="btn btn-outline-success m-2">
                Upload Prescription
              </Link>
              <Link to="/orders" className="btn btn-outline-dark m-2">
                View Orders
              </Link>
              <Link to="/profile" className="btn btn-outline-secondary m-2">
                👤 My Profile
              </Link>
            </>
          )}

          {/* Show only for pharmacists */}
          {user?.role === "pharmacist" && (
            <Link to="/pharmacist" className="btn btn-outline-info m-2">
              Pharmacist Dashboard
            </Link>
          )}
        </div>
      </section>


    </div>
  );
}

function carouselStyle(imageUrl) {
  return {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };
}

function CarouselContent() {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "700px",
        width: "100%",
        padding: "20px",
        color: "#333",
      }}
    >
      <h1 className="fw-bold mb-3">
        Welcome to <span className="text-info">MediQ</span>
      </h1>
      <p className="text-muted mb-4">
        Your trusted pharmacy partner – search, order & manage medicines online.
      </p>
    </div>
  );
}

export default Home;
