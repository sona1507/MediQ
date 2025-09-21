import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HealthCondition.css';

const filterOptions = [
  "Bone and Joint Care",
  "Digestive Care",
  "Eye Care",
  "Pain Relief",
  "Smoking Cessation",
  "Liver Care",
  "Cold and Cough",
  "Heart Care",
  "Kidney Care",
  "Respiratory Care",
  "Mental Wellness",
  "Derma Care"
];

const products = [
  { name: "Faireye Advanced Dark Circle Care Cream 15gm", description: "20% OFF", price: 722, image: "/images/faireye.jpg", discount: "20% OFF" },
  { name: "Baidyanath Triphala Churna 500gm", description: "Save ₹65 | MRP ₹150.00", price: 85, image: "/images/Baidyanath.jpg", discount: "43% OFF" },
  { name: "Omee Mint Flavour Chewable Tablet 12", description: "Save ₹15 | MRP ₹100.00", price: 85, image: "/images/Omee.jpg", discount: "15% OFF" },
  {name: "Tendocare Forte Tablet 15",description: "Save ₹159 | MRP ₹792.00",price: 633,image: "/images/tendocare-15.jpg",discount: "20% OFF"},
  {name: "Macvestin Neo Tablet 10",description: "Save ₹32.40 | MRP ₹180.00",price: 147.6,image: "/images/macvestin.jpg",discount: "18% OFF"},
  { name: "Softovac Sf Powder 450gm", description: "Save ₹20 | MRP ₹105.00", price: 85, image: "/images/Softovac.jpg", discount: "19% OFF" },
  { name: "Unienzyme Tablet 15", description: "Save ₹45 | MRP ₹225.00", price: 180, image: "/images/Unienzyme.jpg", discount: "20% OFF" },
  { name: "Itone Eye Drops 10ml", description: "50% OFF", price: 43.42, image: "/images/itone.jpg", discount: "50% OFF" },
  {name: "Cal 123 Total Tablet 15",description: "Save ₹36 | MRP ₹180.00",price: 144,image: "/images/cal123.jpg",discount: "20% OFF"},
  {name: "T Heal Capsule 10",description: "Save ₹48 | MRP ₹240.00",price: 192,image: "/images/theal.jpg",discount: "20% OFF"},
  { name: "Eyemist Gel 10gm", description: "17% OFF", price: 373.5, image: "/images/eyemist.jpg", discount: "17% OFF" },
  { name: "Gloeye Tablet 10", description: "18% OFF", price: 126.36, image: "/images/gloeye.jpg", discount: "18% OFF" },
];

const HealthCondition = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const navigate = useNavigate();

  const handleCategoryClick = (option) => {
    const routes = {
      "Bone and Joint Care": "/health-conditions/bone-joint",
      "Digestive Care": "/health-conditions/digestive",
      "Eye Care": "/health-conditions/eye",
      "Pain Relief": "/health-conditions/pain",
      "Smoking Cessation": "/health-conditions/smoking",
      "Liver Care": "/health-conditions/liver",
      "Cold and Cough": "/health-conditions/cold-cough",
      "Heart Care": "/health-conditions/heart",
      "Kidney Care": "/health-conditions/kidney",
      "Respiratory Care": "/health-conditions/respiratory",
      "Mental Wellness": "/health-conditions/mental",
      "Derma Care": "/health-conditions/derma"
    };

    if (routes[option]) {
      navigate(routes[option]);
    } else {
      setSelectedSubcategory(option);
    }
  };

  const filteredProducts = selectedSubcategory
    ? products.filter((p) => p.subcategory === selectedSubcategory)
    : products;

  return (
    <div className="healthcondition-container container py-4">
      {/* Hero Section */}
      <div className="hero-section text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">🩺 Health Condition Products</h1>
        <p className="lead text-muted">Targeted care for every health need—from joints to mental wellness</p>
      </div>

      {/* Category Cards */}
      <div className="row justify-content-center mb-5">
        {filterOptions.map((option) => (
          <div key={option} className="col-md-2 col-6 mb-3">
            <div
              className={`category-card text-center shadow-sm ${
                selectedSubcategory === option ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick(option)}
            >
              <img
                src={`/images/${option.toLowerCase().replace(/ /g, '-')}.png`}
                alt={option}
                className="category-icon mb-2"
              />
              <h6 className="text-primary">{option}</h6>
            </div>
          </div>
        ))}
        {selectedSubcategory && (
          <div className="text-center mt-3">
            <button className="btn btn-outline-secondary" onClick={() => setSelectedSubcategory('')}>
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="row">
        {filteredProducts.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 product-card shadow-sm position-relative">
              {product.discount && (
                <div className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 rounded-start">
                  {product.discount}
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top product-image"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{product.name}</h5>
                <p className="fw-bold mt-auto">₹{product.price}</p>
                {product.substitute && (
                  <p className="text-purple small">Save 50.1% with Substitute</p>
                )}
                <button className="btn btn-success w-100 mt-2">
                  <i className="bi bi-cart-plus me-2"></i>Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthCondition;
