import React, { useEffect, useState } from "react";
import MedicineSearch from "../components/MedicineSearch";

// ✅ Import Bootstrap JS for Carousel
import "bootstrap/dist/js/bootstrap.bundle";


function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);

    // ✅ Force Carousel to start sliding immediately on mount
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const carouselElement = document.querySelector("#heroCarousel");
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 3000, // 3 seconds
        ride: "carousel", // auto start
        pause: false, // don't stop on hover
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
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="2"
          ></button>
        </div>

        {/* slides */}
        <div className="carousel-inner">
          <div
            className="carousel-item active hero-slide d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              backgroundImage: "url('/images/bg1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "70vh",
            }}
          >
            <CarouselContent scrolled={false} />
          </div>

          <div
            className="carousel-item hero-slide d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              backgroundImage: "url('/images/bg2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "70vh",
            }}
          >
            <CarouselContent scrolled={scrolled} />
          </div>

          <div
            className="carousel-item hero-slide d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              backgroundImage: "url('/images/bg3.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "70vh",
            }}
          >
            <CarouselContent scrolled={scrolled} />
          </div>
        </div>

        {/* controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}

/* --- Reusable content inside each slide --- */
function CarouselContent({ scrolled }) {
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
      {!scrolled && (
        <div className="search-bar-container">
          <MedicineSearch />
        </div>
      )}
    </div>
  );
}

export default Home;
