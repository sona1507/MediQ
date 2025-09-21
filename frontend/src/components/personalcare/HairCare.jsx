import React, { useState } from 'react';
import './HairCare.css';

const filterOptions = [
  "Hair Oils",
  "Hair Shampoo",
  "Hair Conditioners",
  "Hair Supplements",
  "Hair Colour",
  "Hair Serum"
];

const products = [
  { name: 'Coconut Hair Oil', subcategory: 'Hair Oils', description: 'Nourishes scalp and strengthens roots.', price: 120, image: '/images/allmed.jpg' },
  { name: 'Anti-Dandruff Shampoo', subcategory: 'Hair Shampoo', description: 'Fights flakes and itch.', price: 220, image: '/images/allmed.jpg' },
  { name: 'Keratin Conditioner', subcategory: 'Hair Conditioners', description: 'Smoothens and detangles hair.', price: 180, image: '/images/allmed.jpg' },
  { name: 'Biotin Hair Supplements', subcategory: 'Hair Supplements', description: 'Supports hair growth and thickness.', price: 300, image: '/images/allmed.jpg' },
  { name: 'Natural Hair Colour', subcategory: 'Hair Colour', description: 'Ammonia-free herbal dye.', price: 250, image: '/images/allmed.jpg' },
  { name: 'Argan Hair Serum', subcategory: 'Hair Serum', description: 'Adds shine and reduces frizz.', price: 200, image: '/images/allmed.jpg' },
];

const HairCare = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const filteredProducts = selectedSubcategory
    ? products.filter((p) => p.subcategory === selectedSubcategory)
    : products;

  return (
    <div className="haircare-container container py-4">
      <h2 className="text-center mb-4">💇‍♀️ Hair Care Products</h2>

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

export default HairCare;
