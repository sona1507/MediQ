import React from 'react';
import './LiverCare.css';

const products = [
  { name: "Himalaya Liv.52 Tablet 10", description: "5% OFF", price: 95, image: "/images/health/liv52-tab.jpg", discount: "5% OFF" },
  { name: "Himalaya Liv.52 Syrup 200ml", description: "10% OFF", price: 135, image: "/images/health/liv52-syrup.jpg", discount: "10% OFF" },
  { name: "Livrite Capsule 10", description: "15% OFF", price: 120, image: "/images/health/livrite.jpg", discount: "15% OFF" },
  { name: "Livercare Syrup 200ml", description: "18% OFF", price: 135, image: "/images/health/livercare.jpg", discount: "18% OFF" },
  { name: "Livon Syrup 200ml", description: "10% OFF", price: 135, image: "/images/health/livon.jpg", discount: "10% OFF" },
  { name: "Ami Liv Syrup 200ml", description: "10% OFF", price: 135, image: "/images/health/ami-liv.jpg", discount: "10% OFF" },
  { name: "Kananon Liv Syrup 200ml", description: "10% OFF", price: 135, image: "/images/health/kananon.jpg", discount: "10% OFF" },
  { name: "Live52 DS Syrup 200ml", description: "10% OFF", price: 135, image: "/images/health/live52-ds.jpg", discount: "10% OFF" },
  { name: "Hepa Capsule 10", description: "10% OFF", price: 135, image: "/images/health/hepa.jpg", discount: "10% OFF" },
];

const LiverCare = () => {
  return (
    <div className="livercare-container container py-4">
      <h2 className="text-center mb-4">🧬 Liver Care</h2>

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

export default LiverCare;
