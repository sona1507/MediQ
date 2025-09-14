import React, { useEffect, useState } from "react";
import MedicineSearch from "../components/MedicineSearch";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle";
import CategorySection from "../components/CategorySection";

function Home() {
  const [scrolled, setScrolled] = useState(false);

  // ✅ Simulated user object (replace with real auth logic)
  const user = JSON.parse(localStorage.getItem("user")); // or useContext(AuthContext)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);

    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const carouselElement = document.querySelector("#heroCarousel");
    if (carouselElement) {
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

  return (
    <div>
      {/* ✅ HERO CAROUSEL */}
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        style={{ margin: "20px", borderRadius: "12px", overflow: "hidden" }}
      >
        {/* indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>

        {/* slides */}
        <div className="carousel-inner">
          <div className="carousel-item active hero-slide d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              backgroundImage: "url('/images/bg1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "70vh",
            }}>
            <CarouselContent scrolled={false} />
          </div>

          <div className="carousel-item hero-slide d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              backgroundImage: "url('/images/bg2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "70vh",
            }}>
            <CarouselContent scrolled={scrolled} />
          </div>

          <div className="carousel-item hero-slide d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              backgroundImage: "url('/images/bg3.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "70vh",
            }}>
            <CarouselContent scrolled={scrolled} />
          </div>
        </div>

        {/* controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* ✅ CATEGORY SECTION */}
      <CategorySection />

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
          <Link to="/upload" className="btn btn-outline-success m-2">
            Upload Prescription
          </Link>
          <Link to="/orders" className="btn btn-outline-dark m-2">
            View Orders
          </Link>
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

/* --- Reusable content inside each slide --- */
function CarouselContent({ scrolled }) {
  return (
    <div style={{
      position: "relative",
      maxWidth: "700px",
      width: "100%",
      padding: "20px",
      color: "#333",
    }}>
      <h1 className="fw-bold mb-3">
        Welcome to <span className="text-info">MediQ</span>
      </h1>
      <p className="text-muted mb-4">
        Your trusted pharmacy partner – search, order & manage medicines online.
      </p>
      {!scrolled && (
        <div className="search-bar-container">
          <MedicineSearch />
        </div>
      )}
    </div>
  );
}

export default Home;
