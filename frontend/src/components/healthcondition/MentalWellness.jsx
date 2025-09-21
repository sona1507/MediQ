import React from 'react';
import './MentalWellness.css';

const products = [
  { name: "Doconilive Isp Suspension 100ml", description: "15% OFF", price: 78, image: "/images/allmed.jpg", discount: "15% OFF" },
  { name: "Engross Unisize B Syrup 200ml", description: "15% OFF", price: 85, image: "/images/allmed.jpg", discount: "15% OFF" },
  { name: "Neurozan Ashwagandha Tablet 60", description: "5% OFF", price: 449, image: "/images/allmed.jpg", discount: "5% OFF" },
  { name: "Neurozan Tablet 30", description: "5% OFF", price: 449, image: "/images/allmed.jpg", discount: "5% OFF" },
  { name: "Brahup Syrup 100ml", description: "10% OFF", price: 85, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Himalaya Geriforte Syrup 200ml", description: "10% OFF", price: 145.5, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Ignicar Tablet 10", description: "10% OFF", price: 42.75, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Olino Capsule 10", description: "20% OFF", price: 178, image: "/images/allmed.jpg", discount: "20% OFF" },
  { name: "Himalaya Geriforte Tablet 100ml", description: "10% OFF", price: 225.5, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Himalaya Mentat Tablet 60", description: "10% OFF", price: 225.5, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Cognitol Tablet 10", description: "10% OFF", price: 225.5, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Himalaya Mentat Syrup 200ml", description: "10% OFF", price: 200, image: "/images/allmed.jpg", discount: "10% OFF" },
];

const MentalWellness = () => {
  return (
    <div className="mentalwellness-container container py-4">
      <h2 className="text-center mb-4">🧠 Mental Wellness</h2>

      <div className="row">
        {products.map((product, index) => (
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
                <p className="card-text text-muted">{product.description}</p>
                <p className="fw-bold mt-auto">₹{product.price}</p>
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

export default MentalWellness;
