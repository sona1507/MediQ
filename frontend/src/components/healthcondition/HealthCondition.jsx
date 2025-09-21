// src/components/healthcondition/HealthCondition.jsx
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
  { name: 'Calcium Tablets', subcategory: 'Bone and Joint Care', description: 'Supports bone strength and density.', price: 220, image: '/images/bone-care.jpg' },
  { name: 'Probiotic Capsules', subcategory: 'Digestive & Stomach Care', description: 'Improves gut health and digestion.', price: 180, image: '/images/digestive.jpg' },
  { name: 'Antacid Tablets', subcategory: 'Digestive & Stomach Care', description: 'Relieves acidity and indigestion.', price: 100, image: '/images/stomach.jpg' },
  { name: 'Eye Drops', subcategory: 'Eye Care', description: 'Relieves dryness and irritation.', price: 60, image: '/images/eye-care.jpg' },
  { name: 'Pain Relief Spray', subcategory: 'Pain Relief', description: 'Quick relief from muscle pain.', price: 130, image: '/images/pain-relief.jpg' },
  { name: 'Nicotine Patches', subcategory: 'Smoking Cessation', description: 'Helps reduce cravings.', price: 300, image: '/images/smoking.jpg' },
  { name: 'Liver Detox Syrup', subcategory: 'Liver Care', description: 'Supports liver function.', price: 150, image: '/images/liver.jpg' },
  { name: 'Cough Syrup', subcategory: 'Cold and Cough', description: 'Soothes throat and clears congestion.', price: 120, image: '/images/cough.jpg' },
  { name: 'Heart Health Capsules', subcategory: 'Heart Care', description: 'Supports cardiovascular wellness.', price: 250, image: '/images/heart.jpg' },
  { name: 'Kidney Support Tablets', subcategory: 'Kidney Care', description: 'Promotes kidney function.', price: 200, image: '/images/kidney.jpg' },
  { name: 'Inhaler', subcategory: 'Respiratory Care', description: 'Relieves asthma and breathing issues.', price: 180, image: '/images/respiratory.jpg' },
  { name: 'Mood Support Capsules', subcategory: 'Mental Wellness', description: 'Helps reduce stress and anxiety.', price: 270, image: '/images/mental.jpg' },
  { name: 'Anti-Acne Gel', subcategory: 'Derma Care', description: 'Treats pimples and blemishes.', price: 160, image: '/images/derma.jpg' },
];

const HealthCondition = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const navigate = useNavigate();

  const filteredProducts = selectedSubcategory
    ? products.filter((p) => p.subcategory === selectedSubcategory)
    : products;

  const handleCategoryClick = (option) => {
    if (option === 'Bone and Joint Care') {
      navigate('/health-conditions/bone-joint');
    } else if (option === 'Digestive Care') {
      navigate('/health-conditions/digestive');
    } else if(option === 'Eye Care') {
      navigate('/health-conditions/eye');
}else if (option === 'Pain Relief') {
  navigate('/health-conditions/pain');
}else if (option === 'Smoking Cessation') {
  navigate('/health-conditions/smoking');
}else if (option === 'Liver Care') {
  navigate('/health-conditions/liver');
}else if (option === 'Cold and Cough') {
  navigate('/health-conditions/cold-cough');
}else if (option === 'Heart Care') {
  navigate('/health-conditions/heart');
}else if (option === 'Kidney Care') {
  navigate('/health-conditions/kidney');
}else if (option === 'Respiratory Care') {
  navigate('/health-conditions/respiratory');
}else if (option === 'Mental Wellness') {
  navigate('/health-conditions/mental');
}else if (option === 'Derma Care') {
  navigate('/health-conditions/derma');
}








else {
      setSelectedSubcategory(option);
    }
  };

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
            <div className="card h-100 product-card shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h6 className="text-muted mb-1">{product.subcategory}</h6>
                <h5 className="card-title text-primary">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <p className="fw-bold">₹{product.price}</p>
                <button className="btn btn-success w-100">
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
