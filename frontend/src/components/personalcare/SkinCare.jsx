import React, { useState } from 'react';
import './SkinCare.css';

const filterOptions = [
  "Skin Cream",
  "Sunscreen",
  "Face Wash",
  "Skin and Body Soap",
  "Acne Care",
  "Body Lotions",
  "Mosquito Repellent",
  "Body Wash",
  "Moisturisers"
];

const subcategoryMap = {
  "Skin Cream": "Skin Cream",
  "Sunscreen": "Sunscreen",
  "Face Wash": "Face Wash",
  "Skin and Body Soap": "Skin and Body Soap",
  "Acne Care": "Acne Care",
  "Body Lotions": "Body Lotions",
  "Mosquito Repellent": "Mosquito Repellent",
  "Body Wash": "Body Wash",
  "Moisturising Cream": "Moisturisers",
  "Moisturising Lotion": "Moisturisers",
  "Moisturising Gel": "Moisturisers"
};

const products = [
  { name: 'Aloe Vera Gel', subcategory: 'Moisturising Gel', description: 'Hydrates and soothes skin.', price: 180, image: '/images/skincare/aloe-vera.jpg' },
  { name: 'SPF 50 Sunscreen', subcategory: 'Sunscreen', description: 'Protects against UV rays.', price: 250, image: '/images/skincare/sunscreen.jpg' },
  { name: 'Neem Face Wash', subcategory: 'Face Wash', description: 'Cleanses and prevents acne.', price: 160, image: '/images/skincare/face-wash.jpg' },
  { name: 'Anti-Acne Gel', subcategory: 'Acne Care', description: 'Targets breakouts and inflammation.', price: 220, image: '/images/skincare/acne-gel.jpg' },
  { name: 'Moisturising Cream', subcategory: 'Moisturising Cream', description: 'Deep hydration for dry skin.', price: 200, image: '/images/skincare/moist-cream.jpg' },
  { name: 'Moisturising Lotion', subcategory: 'Moisturising Lotion', description: 'Lightweight daily moisturizer.', price: 190, image: '/images/skincare/moist-lotion.jpg' },
  { name: 'Herbal Body Soap', subcategory: 'Skin and Body Soap', description: 'Gentle cleansing with herbs.', price: 90, image: '/images/skincare/body-soap.jpg' },
  { name: 'Body Wash', subcategory: 'Body Wash', description: 'Refreshing and gentle.', price: 160, image: '/images/skincare/body-wash.jpg' },
  { name: 'Mosquito Repellent Spray', subcategory: 'Mosquito Repellent', description: 'Long-lasting protection.', price: 140, image: '/images/skincare/mosquito.jpg' },
  { name: 'Body Lotion', subcategory: 'Body Lotions', description: 'Softens and nourishes skin.', price: 210, image: '/images/skincare/body-lotion.jpg' },
  { name: 'Skin Cream', subcategory: 'Skin Cream', description: 'Rich cream for dry patches.', price: 230, image: '/images/skincare/skin-cream.jpg' },
];

const SkinCare = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const filteredProducts = selectedSubcategory
    ? products.filter((p) => subcategoryMap[p.subcategory] === selectedSubcategory)
    : products;

  return (
    <div className="skincare-container container py-4">
      <h2 className="text-center mb-4">🧴 Skin Care Products</h2>

      {/* Filter Buttons */}
      <div className="d-flex flex-wrap justify-content-center mb-4">
        {filterOptions.map((option) => (
          <button
            key={option}
            className={`btn m-2 ${
              selectedSubcategory === option ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => setSelectedSubcategory(option)}
          >
            {option}
          </button>
        ))}
        {selectedSubcategory && (
          <button className="btn btn-outline-secondary m-2" onClick={() => setSelectedSubcategory('')}>
            Clear Filter
          </button>
        )}
      </div>

      {/* Product Cards */}
      <div className="row">
        {filteredProducts.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <p className="fw-bold">₹{product.price}</p>
                <button className="btn btn-outline-success w-100">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkinCare;
