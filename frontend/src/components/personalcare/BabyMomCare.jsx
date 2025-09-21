import React, { useState } from 'react';
import './BabyMomCare.css';

const filterOptions = [
  "Baby Healthcare",
  "Baby Diapers and Wipes",
  "Baby Lotion and Moisturising Cream",
  "Baby Bath Essentials",
  "Baby Skin Care",
  "Baby and Infant Food",
  "Women Multivitamins",
  "Ovulation Test Kit and Women Intimate Care",
  "Maternity Care",
  "Nutritional Drinks"
];

const products = [
  { name: 'Baby Thermometer', subcategory: 'Baby Healthcare', description: 'Accurate temperature reading for infants.', price: 250, image: '/images/allmed.jpg' },
  { name: 'Diaper Pack XL', subcategory: 'Baby Diapers and Wipes', description: 'Soft and absorbent diapers.', price: 480, image: '/images/allmed.jpg' },
  { name: 'Moisturising Baby Lotion', subcategory: 'Baby Lotion and Moisturising Cream', description: 'Gentle hydration for baby skin.', price: 180, image: '/images/allmed.jpg' },
  { name: 'Baby Shampoo & Soap Combo', subcategory: 'Baby Bath Essentials', description: 'Tear-free formula for daily bath.', price: 220, image: '/images/allmed.jpg' },
  { name: 'Baby Sunscreen Cream', subcategory: 'Baby Skin Care', description: 'Protects delicate skin from UV rays.', price: 200, image: '/images/allmed.jpg' },
  { name: 'Infant Cereal Mix', subcategory: 'Baby and Infant Food', description: 'Iron-rich food for 6+ months.', price: 150, image: '/images/allmed.jpg' },
  { name: 'Women’s Multivitamin Tablets', subcategory: 'Women Multivitamins', description: 'Supports immunity and energy.', price: 300, image: '/images/allmed.jpg' },
  { name: 'Ovulation Test Kit', subcategory: 'Ovulation Test Kit and Women Intimate Care', description: 'Easy-to-use fertility tracker.', price: 350, image: '/images/allmed.jpg' },
  { name: 'Maternity Belt', subcategory: 'Maternity Care', description: 'Back support during pregnancy.', price: 400, image: '/images/allmed.jpg' },
  { name: 'Protein Nutritional Shake', subcategory: 'Nutritional Drinks', description: 'Boosts strength and recovery.', price: 280, image: '/images/allmed.jpg' },
];

const BabyMomCare = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const filteredProducts = selectedSubcategory
    ? products.filter((p) => p.subcategory === selectedSubcategory)
    : products;

  return (
    <div className="babymomcare-container container py-4">
      <h2 className="text-center mb-4">👶 Mom & Baby Care Products</h2>

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

export default BabyMomCare;
