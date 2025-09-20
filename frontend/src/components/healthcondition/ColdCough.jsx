import React from 'react';
import './ColdCough.css';

const products = [
  { name: "Vicks Lozenges 10s", description: "7% OFF", price: 22.47, image: "/images/health/vicks-lozenges.jpg", discount: "7% OFF" },
  { name: "Cofsils Lozenges 10s", description: "10% OFF", price: 45.00, image: "/images/health/cofsils.jpg", discount: "10% OFF" },
  { name: "Naselin Nasal Spray 10ml", description: "15% OFF", price: 85.00, image: "/images/health/naselin.jpg", discount: "15% OFF" },
  { name: "Solspre Inhaler 0.5ml", description: "50% OFF", price: 45.00, image: "/images/health/solspre.jpg", discount: "50% OFF" },
  { name: "Vicks Inhaler 0.5ml", description: "10% OFF", price: 45.00, image: "/images/health/vicks-inhaler.jpg", discount: "10% OFF" },
  { name: "Cofsils Syrup 100ml", description: "20% OFF", price: 85.00, image: "/images/health/cofsils-syrup.jpg", discount: "20% OFF" },
  { name: "Naselin Drops 10ml", description: "15% OFF", price: 64.00, image: "/images/health/naselin-drops.jpg", discount: "15% OFF" },
  { name: "Vicks Action 500 Tablet 10s", description: "10% OFF", price: 65.00, image: "/images/health/vicks-action.jpg", discount: "10% OFF" },
  { name: "Solspre Syrup 100ml", description: "20% OFF", price: 85.00, image: "/images/health/solspre-syrup.jpg", discount: "20% OFF" },
];

const ColdCough = () => {
  return (
    <div className="coldcough-container container py-4">
      <h2 className="text-center mb-4">🤧 Cold & Cough</h2>

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
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
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

export default ColdCough;
