// src/components/personalcare/PersonalCare.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalCare.css';

const categories = [
  'Skin Care',
  'Hair Care',
  'Baby and Mom Care',
  'Oral Care',
  'Elderly Care',
];

const products = [
  { name: 'Aloe Vera Gel', category: 'Skin Care', description: 'Hydrates and soothes skin.', price: 180, image: '/images/skincare/aloe-vera.jpg' },
  { name: 'Anti-Dandruff Shampoo', category: 'Hair Care', description: 'Fights flakes and itch.', price: 220, image: '/images/haircare/shampoo.jpg' },
  { name: 'Baby Lotion', category: 'Baby and Mom Care', description: 'Gentle moisturizer for babies.', price: 150, image: '/images/babymomcare/baby-lotion.jpg' },
  { name: 'Herbal Toothpaste', category: 'Oral Care', description: 'Natural protection for teeth and gums.', price: 90, image: '/images/oralcare/toothpaste.jpg' },
  { name: 'Joint Pain Cream', category: 'Elderly Care', description: 'Relieves joint pain and inflammation.', price: 120, image: '/images/elderlycare/joint-pain.jpg' },
];

const PersonalCare = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    const routeMap = {
      'Skin Care': '/personal-care/skin',
      'Hair Care': '/personal-care/hair',
      'Baby and Mom Care': '/personal-care/baby-mom',
      'Oral Care': '/personal-care/oral',
      'Elderly Care': '/personal-care/elderly',
    };
    navigate(routeMap[cat]);
  };

  return (
    <div className="personal-care-container container py-4">
      {/* Hero Section */}
      <div className="hero-section text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">🧼 Personal Care</h1>
        <p className="lead text-muted">Curated essentials for skin, hair, baby, oral & elderly wellness</p>
      </div>

      {/* Category Cards */}
      <div className="row justify-content-center mb-5">
        {categories.map((cat) => (
          <div key={cat} className="col-md-2 col-6 mb-3">
            <div className="category-card text-center shadow-sm" onClick={() => handleCategoryClick(cat)}>
              <img
                src={`/icons/${cat.toLowerCase().replace(/ /g, '-')}.png`}
                alt={cat}
                className="category-icon mb-2"
              />
              <h6 className="text-primary">{cat}</h6>
            </div>
          </div>
        ))}
      </div>

      {/* Mixed Product Grid */}
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 product-card shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h6 className="text-muted mb-1">{product.category}</h6>
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

export default PersonalCare;
