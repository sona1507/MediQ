import React from 'react';
import './RespiratoryCare.css';

const products = [
  { name: "Asthopa Tablet 10", description: "12% OFF", price: 28.00, image: "/images/health/asthopa.jpg", discount: "12% OFF" },
  { name: "Himalaya Septilin Tablet 60", description: "12% OFF", price: 120.00, image: "/images/health/septilin-tab.jpg", discount: "12% OFF" },
  { name: "Himalaya Septilin Syrup 200ml", description: "12% OFF", price: 120.00, image: "/images/health/septilin-syrup.jpg", discount: "12% OFF" },
  { name: "Himalaya Bresol Syrup 200ml", description: "9% OFF", price: 128.00, image: "/images/health/bresol-syrup.jpg", discount: "9% OFF" },
  { name: "Himalaya Bresol Tablet 60", description: "13% OFF", price: 130.00, image: "/images/health/bresol-tab.jpg", discount: "13% OFF" },
  { name: "Huff Puff Kit", description: "20% OFF", price: 425.00, image: "/images/health/huffpuff.jpg", discount: "20% OFF" },
  { name: "Rotahaler Device", description: "20% OFF", price: 34.00, image: "/images/health/rotahaler.jpg", discount: "20% OFF" },
  { name: "Vicks Inhaler 0.5ml", description: "10% OFF", price: 45.00, image: "/images/health/vicks-inhaler.jpg", discount: "10% OFF" },
  { name: "Breathe Easy Granules 100gm", description: "5% OFF", price: 129.00, image: "/images/health/breathe-easy.jpg", discount: "5% OFF" },
  { name: "Revolizer Device", description: "17% OFF", price: 299.00, image: "/images/health/revolizer.jpg", discount: "17% OFF" },
  { name: "Lupihaler Device", description: "10% OFF", price: 299.00, image: "/images/health/lupihaler.jpg", discount: "10% OFF" },
  { name: "Lamino Resp Strawberry 1s", description: "10% OFF", price: 60.00, image: "/images/health/lamino.jpg", discount: "10% OFF" },
  { name: "Xylomist Nasal Drops 10ml", description: "20% OFF", price: 64.00, image: "/images/health/xylomist.jpg", discount: "20% OFF" },
];

const RespiratoryCare = () => {
  return (
    <div className="respiratorycare-container container py-4">
      <h2 className="text-center mb-4">🌬️ Respiratory Care</h2>

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

export default RespiratoryCare;
