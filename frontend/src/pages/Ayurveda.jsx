import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "./Ayurveda.css";


// --- Mock Data for Testing (EXPANDED) ---
const mockProducts = [
    { _id: "1", name: "Chyawanprash Special", price: "450.00", image: "/images/default-product.png" },
    { _id: "2", name: "Ashwagandha Extract 60s", price: "299.00", image: "/images/default-product.png" },
    { _id: "3", name: "Triphala Powder 250g", price: "125.50", image: "/images/default-product.png" },
    { _id: "4", name: "Amla Juice 1L", price: "180.00", image: "/images/default-product.png" },
    { _id: "5", name: "Brahmi Vati", price: "320.00", image: "/images/default-product.png" },
    { _id: "6", name: "Giloy Capsules", price: "210.00", image: "/images/default-product.png" },
    { _id: "7", name: "Turmeric Tablet", price: "150.00", image: "/images/default-product.png" },
    { _id: "8", name: "Neem Face Pack", price: "95.00", image: "/images/default-product.png" },
    { _id: "9", name: "Shatavari Granules", price: "410.00", image: "/images/default-product.png" },
    { _id: "10", name: "Aloe Vera Juice 1L", price: "145.00", image: "/images/default-product.png" },
    { _id: "11", name: "Karela Jamun Juice 500ml", price: "199.00", image: "/images/default-product.png" },
    { _id: "12", name: "Trikatu Churna 100g", price: "85.00", image: "/images/default-product.png" },
    { _id: "13", name: "Shilajit Resin 20g", price: "899.00", image: "/images/default-product3.png" },
    { _id: "14", name: "Vatika Hair Oil 300ml", price: "120.00", image: "/images/default-product.png" },
    { _id: "15", name: "Bael Fruit Candy", price: "55.00", image: "/images/default-product.png" },
    { _id: "16", name: "Punarnava Mandur", price: "250.00", image: "/images/default-product.png" },
    { _id: "17", name: "Arjuna Bark Powder", price: "110.00", image: "/images/default-product.png" },
    { _id: "18", name: "Hingwashtak Churna", price: "75.00", image: "/images/default-product.png" },
    { _id: "19", name: "Liv 52 Tablets 100s", price: "185.00", image: "/images/default-product.png" },
    { _id: "20", name: "Mulethi Powder 200g", price: "105.00", image: "/images/default-product.png" },
    { _id: "21", name: "Guduchi Juice 1L", price: "220.00", image: "/images/default-product.png" },
    { _id: "22", name: "Wheatgrass Powder 200g", price: "245.00", image: "/images/default-product.png" },
    // --- Existing Juice Products ---
    { _id: "23", name: "Noni Juice Concentrate", price: "350.00", image: "/images/default-product.png" },
    { _id: "24", name: "Wheatgrass Juice 500ml", price: "190.00", image: "/images/default-product.png" },
    { _id: "25", name: "Brahmi Juice 1L", price: "280.00", image: "/images/default-product.png" },
    { _id: "26", name: "Jamun Seed Juice 1L", price: "215.00", image: "/images/default-product.png" },
    // --- Two New Juice Products Added Here ---
    { _id: "27", name: "Haldi Ginger Shot Juice 500ml", price: "240.00", image: "/images/default-product.png" },
    { _id: "28", name: "Cucumber Mint Cooler Juice 1L", price: "165.00", image: "/images/default-product.png" },
];
// --- End Mock Data ---


// --- FooterSection Component Definition (CLEANED) ---
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
                

                {/* Service Highlights */}
                
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
// --- End of FooterSection Component Definition ---


export default function Ayurveda() {
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
  const fetchAyurvedicProducts = async () => {
    try {
      const res = await api.get("/medicines/category", {
        params: { type: "ayurveda" },
      });

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.warn("⚠️ Unexpected response format:", res.data);
        setProducts([]);
      }
    } catch (err) {
      console.error("❌ Error fetching Ayurveda products:", err.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAyurvedicProducts();
}, []);


    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchTerm.trim()) {
                setSearchResults([]);
                return;
            }

            setIsSearching(true);
            try {
                const res = await api.get("/medicines/search", {
                    params: {
                        q: searchTerm,
                        category: "ayurveda",
                    },
                });
                setSearchResults(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("❌ Search error:", err.message);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    const renderCarouselCard = (item) => (
        <div key={item._id} className="carousel-card">
            <img
                src={item.image || "/images/default-product.png"}
                alt={item.name}
                className="carousel-image"
            />
            <h5 className="carousel-name">{item.name}</h5>
            <p className="carousel-price">
                ₹{item.price}
                <span className="badge text-bg-danger ms-2">15% OFF</span>
            </p>
            <button className="btn btn-outline-success btn-sm">Add +</button>
        </div>
    );

    if (isLoading) {
        return (
            <div className="ayurveda-store text-center p-5">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading Ayurvedic treasures...</p>
            </div>
        );
    }

    return (
        <div className="ayurveda-store">
            {/* 🌿 Banner with Integrated Search */}
            <div
                className="banner"
                style={{
                    backgroundImage: 'url("/images/ayurveda-banner.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    color: "#2e7d32",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div className="banner-content">
                    <h1>MediQ Ayurvedic Store</h1>
                    <p>Rooted in Kerala’s healing traditions</p>
                </div>

                {/* 🔍 Search Bar */}
                <div className="banner-search-container">
                    <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="search"
                            className="form-control form-control-lg me-2"
                            placeholder="Search for Ayurvedic products, herbs, or brands..."
                            aria-label="Search Ayurveda"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="btn btn-lg btn-success">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </div>

            {/* 🔎 Search Results */}
            {searchTerm ? (
                <section className="section search-results">
                    <h2 className="section-title">Search Results</h2>
                    <p className="mt-3 text-muted w-100 text-center">
                        Showing {searchResults.length} results for "{searchTerm}"
                    </p>
                    <div className="product-grid">
                        {isSearching ? (
                            <div className="text-center w-100">
                                <div className="spinner-border text-success" role="status" />
                            </div>
                        ) : searchResults.length > 0 ? (
                            searchResults.map((item) => renderCarouselCard(item))
                        ) : (
                            <p className="text-muted w-100 text-center">
                                No products found matching "{searchTerm}".
                            </p>
                        )}
                    </div>
                </section>
            ) : (
                <>
                    {/* 🏆 Top Ayurvedic Treasures */}
                    <section className="carousel-section">
                        <h2 className="section-title">Top Ayurvedic Treasures</h2>
                        <div className="carousel-container">
                            {products.slice(0, 10).map((item) => renderCarouselCard(item))}
                        </div>
                    </section>

                    {/* 🔥 Specialty Ayurvedic Picks */}
                    <section className="carousel-section specialty">
                        <h2 className="section-title">Specialty Ayurvedic Picks</h2>
                        <div className="carousel-container">
                            {products.slice(10, 17).map((item) => renderCarouselCard(item))}
                        </div>
                    </section>

                    {/* 🥤 Juices for Wellness */}
                    <section className="carousel-section juices">
                        <h2 className="section-title">Juices for Wellness</h2>
                        <div className="carousel-container">
                            {products
                                .filter((p) => p.name && p.name.toLowerCase().includes("juice"))
                                .slice(0, 10) // Will now pull 10 juice items from mock data
                                .map((item) => renderCarouselCard(item))}
                        </div>
                    </section>
                </>
            )}

            {/* 🧭 Shop by Category */}
            <section className="section categories">
                <h2 className="section-title">Shop by Category</h2>
                <div className="category-grid">
                    {["ayurveda", "homeopathy", "unani", "siddha"].map((cat) => (
                        <div key={cat} className="category-tile">
                            <img
                                src={`/images/${cat}.png`}
                                alt={cat}
                                className="category-image"
                            />
                            <h5>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h5>
                        </div>
                    ))}
                </div>
            </section>

            {/* 📚 Blog Previews */}
            <section className="section blog">
                <h2 className="section-title">Ayurvedic Home Remedies</h2>
                <div className="blog-grid">
                    {["Amla Benefits", "Stress Relief", "Herbal Cleansing", "Skin Tips"].map((title, idx) => (
                        <div key={idx} className="blog-card">
                            <img
                                src={`/images/blog${idx + 1}.jpg`}
                                alt={title}
                                className="blog-image"
                            />
                            <h5>{title}</h5>
                            <p>Explore traditional remedies and wellness tips.</p>
                            <Link to="/blog" className="btn btn-sm btn-outline-success">
                                Read More
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🦶 Footer */}
            <FooterSection />
        </div>
    );
}
