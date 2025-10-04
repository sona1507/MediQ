import React, { useEffect, useState } from "react";
import MedicineSearch from "../components/MedicineSearch";
import { Link } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import CategoryNavbar from "../components/CategoryNavbar";
import PersonalCare from "../components/personalcare/PersonalCare";
import api from "../api/axios";
import "bootstrap/dist/js/bootstrap.bundle";
import './Home.css';
// NOTE: Make sure you also include bootstrap-icons if you use them.
// import "bootstrap-icons/font/bootstrap-icons.css"; 

// ===================================================================
// UTILITY FUNCTIONS (Defined outside of Home component)
// ===================================================================

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
    // Note: The search bar is now correctly implemented outside this div 
    // in the 'overlay-search-bar' for consistency with previous structures.
    <div style={{ position: "relative", maxWidth: "700px", width: "100%", padding: "20px", color: "#333" }}>
      <h1 className="fw-bold mb-3">
        Welcome to <span className="text-info">MediQ</span>
      </h1>
      <p className="text-muted mb-4">
        Your trusted pharmacy partner – search, order & manage medicines online.
      </p>
    </div>
  );
}

// ===================================================================
// ABOUT SECTION COMPONENT (Defined outside of Home component)
// ===================================================================

function AboutSection() {
  return (
    <section className="bg-white py-5 border-top">
      <div className="container">
        <h2 className="fw-bold text-center mb-5 text-primary">
          Stay Healthy with MediQ: Kerala's Trusted Online Pharmacy and Healthcare Platform
        </h2>

        <div className="mb-5">
          <h6 className="fw-semibold text-dark">We Bring Care Closer</h6>
          <p className="text-muted">
            MediQ is built on a mission to simplify healthcare for every Indian household. With over <strong>31 million orders</strong> delivered across <strong>1800+ cities</strong>, we’ve become a trusted name in digital pharmacy. 
            Whether you're ordering prescription medicines, browsing wellness products, or seeking pharmacist guidance, MediQ ensures a seamless experience from search to doorstep delivery. 
            Our platform is designed to be intuitive, fast, and secure — because we believe healthcare should be accessible, not overwhelming.
          </p>
        </div>

        <div className="mb-5">
          <h6 className="fw-semibold text-dark">Medicines at Your Doorstep</h6>
          <p className="text-muted">
            With a catalog of over <strong>2 lakh medicines</strong> and health essentials, MediQ offers everything from life-saving prescriptions to daily wellness items. 
            Our partnerships with licensed pharmacies ensure authenticity and quality in every order. 
            Users can search by name, category, or symptoms, add items to their cart, and complete checkout with ease. 
            We also offer customer support for order tracking, dosage queries, and product recommendations — because your health deserves clarity and care.
          </p>
        </div>

        <div className="mb-5">
          <h6 className="fw-semibold text-dark">Ayurveda for Everyday Wellness</h6>
          <p className="text-muted">
            At MediQ, we honor India’s rich tradition of holistic healing by offering a dedicated Ayurveda section. 
            From immunity boosters and digestive tonics to stress relief and sleep support, our Ayurvedic range is curated from trusted brands and certified manufacturers. 
            Whether you're exploring herbal remedies for chronic conditions or simply adding balance to your lifestyle, MediQ makes it easy to discover, compare, and order natural solutions. 
            We believe wellness is not just clinical — it’s cultural, and Ayurveda is a vital part of that journey.
          </p>
        </div>

        <div className="mb-5">
          <h6 className="fw-semibold text-dark">The Pharmacist at Your Fingertips</h6>
          <p className="text-muted">
            Our team of trained and certified pharmacists are available online to review prescriptions, validate orders, and offer dosage guidance. 
            Users can securely upload their prescriptions and receive expert approval — ensuring that every medicine dispensed is safe, appropriate, and compliant. 
            We also provide personalized advice for chronic conditions, medicine interactions, and refill reminders. 
            With MediQ, you’re never alone in your health decisions — our pharmacists are just a click away.
          </p>
        </div>

        <h5 className="text-center fw-bold text-success mt-4">Stay Healthy!</h5>
      </div>
    </section>
  );
}

// ===================================================================
// FOOTER SECTION COMPONENT (Defined outside of Home component)
// ===================================================================

function FooterSection() {
    // Define a style object to override default link color and underline.
    const linkStyle = { 
        color: 'inherit', // Inherit color from parent (text-muted)
        textDecoration: 'none' // Remove underline
    };

    // Override the Bootstrap .footer-link-text class with the inline style
    const FooterLink = ({ to, children }) => (
        <Link 
            to={to} 
            className="footer-link-text text-muted text-decoration-none" 
            style={linkStyle}
        >
            {children}
        </Link>
    );

  return (
    <section className="bg-light border-top pt-5">
      <div className="container text-center">
        {/* Platform Metrics */}
        <div className="row mb-5">
          <div className="col-md-4">
            <h3 className="text-primary fw-bold">20M+</h3>
            <p className="text-muted">Visitors across Kerala</p>
          </div>
          <div className="col-md-4">
            <h3 className="text-primary fw-bold">12M+</h3>
            <p className="text-muted">Orders Delivered</p>
          </div>
          <div className="col-md-4">
            <h3 className="text-primary fw-bold">52+</h3>
            <p className="text-muted">Cities MediQ Operates In</p>
          </div>
        </div>

        {/* Service Highlights */}
        <div className="row text-start mb-5">
          <div className="col-md-4">
            <h5 className="fw-bold">Bringing Healthcare Closer</h5>
            <p className="text-muted">
              An innovation built to simplify healthcare access for every Kerala household. Our ordering experience is designed to be smooth, supportive, and secure — with pharmacist consultations and fast delivery across the state.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold">Ayurveda for Your Doorstep</h5>
            <p className="text-muted">
              At MediQ, we honor Kerala’s rich Ayurvedic tradition. Our dedicated Ayurveda section offers ancient remedies for modern wellness. Simply search, add to cart, and check out. Need help? Call us anytime for product guidance.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold">The Pharmacist is In</h5>
            <p className="text-muted">
              Our certified pharmacists are available online to review prescriptions, validate orders, and provide dosage advice. Upload your prescription securely on MediQ and receive expert approval — fast, safe, and reliable.
            </p>
          </div>
        </div>

        {/* Value Pillars */}
        <div className="row text-center py-4 border-top">
          <div className="col-md-4">
            <i className="bi bi-shield-check text-danger fs-2"></i>
            <h5 className="mt-2">Reliable</h5>
            <p className="text-muted">
              All products on MediQ are sourced from licensed distributors. Every medicine listed is authenticated and safe.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-lock-fill text-danger fs-2"></i>
            <h5 className="mt-2">Secure</h5>
            <p className="text-muted">
              MediQ uses Secure Sockets Layer (SSL) encryption and is PCI DSS compliant. Your data and transactions are protected.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-wallet2 text-danger fs-2"></i>
            <h5 className="mt-2">Affordable</h5>
            <p className="text-muted">
              Find affordable generic alternatives, save up to 50% on medicines and up to 80% on pharmacist consultations.
            </p>
          </div>
        </div>

        {/* Footer Links (Updated to use the custom FooterLink component) */}
        <div className="row text-start py-5 border-top">
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Know Us</h6>
            <ul className="list-unstyled text-muted">
              <li><FooterLink to="/about">About MediQ</FooterLink></li>
              <li><FooterLink to="/contact">Contact Us</FooterLink></li>
              <li><FooterLink to="/careers">Careers</FooterLink></li>
              <li><FooterLink to="/partners">Business Partnership</FooterLink></li>
              <li><FooterLink to="/press">Press Coverage</FooterLink></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Our Policies</h6>
            <ul className="list-unstyled text-muted">
              <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink to="/terms">Terms & Conditions</FooterLink></li>
              <li><FooterLink to="/return">Return Policy</FooterLink></li>
              <li><FooterLink to="/grievance">Grievance Redressal</FooterLink></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Our Services</h6>
            <ul className="list-unstyled text-muted">
              <li><FooterLink to="/medicines">Order Medicines</FooterLink></li>
              <li><FooterLink to="/upload">Upload Prescription</FooterLink></li>
              <li><FooterLink to="/ayurveda">Ayurveda Products</FooterLink></li>
              <li><FooterLink to="/consult">Pharmacist Consultations</FooterLink></li>
              <li><FooterLink to="/articles">Health Articles</FooterLink></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Connect</h6>
            <div className="d-flex gap-3 mb-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><i className="bi bi-facebook fs-4"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon"><i className="bi bi-twitter fs-4"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><i className="bi bi-instagram fs-4"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon"><i className="bi bi-youtube fs-4"></i></a>
            </div>
            <form>
              <label className="form-label text-muted">Want daily dose of health?</label>
              <input type="email" className="form-control mb-2" placeholder="Enter your email" />
              <button type="submit" className="btn btn-success w-100">SIGN UP</button>
            </form>
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center py-4 border-top">
          <img src="/assets/legitscript.png" alt="LegitScript" height="40" className="me-3" />
          <img src="/assets/iso27001.png" alt="ISO 27001" height="40" className="me-3" />
          <img src="/assets/ukas.png" alt="UKAS" height="40" />
          <p className="text-muted mt-3 small">
            Kerala’s only LegitScript and ISO/IEC 27001:2013 certified online pharmacy platform
          </p>
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// HOME COMPONENT 
// ===================================================================

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Medicines");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);

    const carouselElement = document.querySelector("#heroCarousel");
    if (carouselElement) {
      // Use dynamic import for Bootstrap to avoid issues in non-browser environments
      import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
        // Ensure the Carousel class is accessed correctly
        new bootstrap.default.Carousel(carouselElement, { 
          interval: 3000,
          ride: "carousel",
          pause: false,
        });
      }).catch(err => console.error("Failed to load Bootstrap:", err));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) return setSuggestions([]);
      try {
        const res = await api.get("/medicines/search", { params: { q: query } });
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
              Welcome to <span className="text-primary">Medi</span><span className="text-dark">Q</span>
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
                  <p className="mb-1"><strong>Symptoms:</strong> {med.symptoms?.join(", ")}</p>
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
          <Link to="/medicines" className="btn btn-outline-primary m-2">
            Browse Medicines
          </Link>

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

          {user?.role === "pharmacist" && (
            <Link to="/pharmacist" className="btn btn-outline-info m-2">
              Pharmacist Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* ======= ABOUT SECTION CALL (Using the corrected function name) ======= */}
      <AboutSection />

      {/* ======= FOOTER SECTION CALL (Using the corrected function name) ======= */}
      <FooterSection />
    </div>
  );
}

export default Home;