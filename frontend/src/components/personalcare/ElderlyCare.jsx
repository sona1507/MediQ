import React, { useState } from 'react';
import './ElderlyCare.css';

const filterOptions = [
  "Orthopaedic Supports",
  "Adult Diapers",
  "Footwear",
  "Mobility and Support Accessories",
  "Urinary Support and Care"
];

const products = [
  { name: 'Knee Support Brace', subcategory: 'Orthopaedic Supports', description: 'Provides compression and joint stability.', price: 350, image: '/images/elderlycare/knee-brace.jpg' },
  { name: 'Adult Diapers XL', subcategory: 'Adult Diapers', description: 'Leak-proof and comfortable fit.', price: 480, image: '/images/elderlycare/adult-diapers.jpg' },
  { name: 'Anti-Slip Elderly Slippers', subcategory: 'Footwear', description: 'Soft sole with grip for safe walking.', price: 290, image: '/images/elderlycare/slippers.jpg' },
  { name: 'Walking Stick with Seat', subcategory: 'Mobility and Support Accessories', description: 'Foldable stick with built-in seat.', price: 600, image: '/images/elderlycare/walking-stick.jpg' },
  { name: 'Urine Collection Bag', subcategory: 'Urinary Support and Care', description: 'Hygienic and easy to use.', price: 150, image: '/images/elderlycare/urine-bag.jpg' },
];

const ElderlyCare = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const filteredProducts = selectedSubcategory
    ? products.filter((p) => p.subcategory === selectedSubcategory)
    : products;

  return (
    <div className="elderlycare-container container py-4">
      <h2 className="text-center mb-4">🧓 Elderly Care Products</h2>

      {/* Subcategory Filter */}
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

export default ElderlyCare;
