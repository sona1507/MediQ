import React, { useState } from 'react';
import './OralCare.css';

const filterOptions = [
  "Tooth Paste",
  "Mouth Ulcer Gel",
  "Mouthwash",
  "Toothache and Gum Pain",
  "Tooth Brush",
  "Gargle Solution"
];

const products = [
  { name: 'Herbal Toothpaste', subcategory: 'Tooth Paste', description: 'Natural protection for teeth and gums.', price: 90, image: '/images/oralcare/toothpaste.jpg' },
  { name: 'Mouth Ulcer Gel', subcategory: 'Mouth Ulcer Gel', description: 'Soothes and heals mouth ulcers.', price: 120, image: '/images/oralcare/ulcer-gel.jpg' },
  { name: 'Mint Mouthwash', subcategory: 'Mouthwash', description: 'Fresh breath and antibacterial protection.', price: 150, image: '/images/oralcare/mouthwash.jpg' },
  { name: 'Gum Pain Relief Cream', subcategory: 'Toothache and Gum Pain', description: 'Relieves gum inflammation and pain.', price: 130, image: '/images/oralcare/gum-pain.jpg' },
  { name: 'Soft Bristle Toothbrush', subcategory: 'Tooth Brush', description: 'Gentle cleaning for sensitive teeth.', price: 60, image: '/images/oralcare/toothbrush.jpg' },
  { name: 'Antiseptic Gargle Solution', subcategory: 'Gargle Solution', description: 'Kills germs and soothes throat.', price: 110, image: '/images/oralcare/gargle.jpg' },
];

const OralCare = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const filteredProducts = selectedSubcategory
    ? products.filter((p) => p.subcategory === selectedSubcategory)
    : products;

  return (
    <div className="oralcare-container container py-4">
      <h2 className="text-center mb-4">🦷 Oral Care Products</h2>

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

export default OralCare;
