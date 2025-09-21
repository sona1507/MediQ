import React from 'react';
import './KidneyCare.css';

const products = [
  { name: "Ketokind Tablet 10's", description: "50% OFF", price: 22.75, image: "/images/allmed.jpg", discount: "50% OFF" },
  { name: "Uriston-K Suspension 100ml", description: "50% OFF", price: 67.5, image: "/images/allmed.jpg", discount: "50% OFF" },
  { name: "Stoncare Tablet 10's", description: "37% OFF", price: 27.3, image: "/images/allmed.jpg", discount: "37% OFF" },
  { name: "Prostonil Tablet 10's", description: "5% OFF", price: 42.75, image: "/images/allmed.jpg", discount: "5% OFF" },
  { name: "Neeri Tablet 30's", description: "13% OFF", price: 87, image: "/images/allmed.jpg", discount: "13% OFF" },
  { name: "Ami Neeri-Kft Syrup 200ml", description: "13% OFF", price: 135, image: "/images/allmed.jpg", discount: "13% OFF" },
  { name: "Himalaya Himpipha Tablet 60's", description: "13% OFF", price: 135, image: "/images/allmed.jpg", discount: "13% OFF" },
  { name: "Neeri Syrup 200ml", description: "13% OFF", price: 135, image: "/images/allmed.jpg", discount: "13% OFF" },
  { name: "Himalaya Cystone Tablet 60", description: "13% OFF", price: 135, image: "/images/allmed.jpg", discount: "13% OFF" },
  { name: "Photant Tablet 10's", description: "13% OFF", price: 27.3, image: "/images/allmed.jpg", discount: "13% OFF" },
  { name: "Carbac Tablet 10's", description: "13% OFF", price: 27.3, image: "/images/allmed.jpg", discount: "13% OFF" },
  { name: "Cramwel Capsule 10", description: "13% OFF", price: 27.3, image: "/images/allmed.jpg", discount: "13% OFF" },
  { name: "Uriston Capsule 10's", description: "13% OFF", price: 27.3, image: "/images/allmed.jpg", discount: "13% OFF" },
  { name: "Protinule Capsule 10's", description: "13% OFF", price: 27.3, image: "/images/allmed.jpg", discount: "13% OFF" },
];

const KidneyCare = () => {
  return (
    <div className="kidneycare-container container py-4">
      <h2 className="text-center mb-4">🩺 Kidney Care</h2>

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

export default KidneyCare;
