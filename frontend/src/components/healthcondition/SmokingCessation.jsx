import React from 'react';
import './SmokingCessation.css';

const products = [
  { name: "Nicotinell 2mg Mint Gum", description: "40% OFF", price: 180, image: "/images/allmed.jpg", discount: "40% OFF" },
  { name: "Nicotinell 2mg Fruit Gum", description: "10% OFF", price: 270, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Nicotinell 2mg Plain Gum", description: "10% OFF", price: 270, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Nicotinell 2mg Patch", description: "20% OFF", price: 320, image: "/images/allmed.jpg", discount: "20% OFF" },
  { name: "Zonnic 2mg Mint Gum", description: "10% OFF", price: 270, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Zonnic 4mg Mint Gum", description: "10% OFF", price: 270, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Nicorette 2mg Mint Plus Gum", description: "20% OFF", price: 320, image: "/images/allmed.jpg", discount: "20% OFF" },
  { name: "Nicorette 4mg Mint Plus Gum", description: "20% OFF", price: 320, image: "/images/allmed.jpg", discount: "20% OFF" },
  { name: "Nicogum 2mg Mint Gum", description: "10% OFF", price: 270, image: "/images/allmed.jpg", discount: "10% OFF" },
];

const SmokingCessation = () => {
  return (
    <div className="smokingcessation-container container py-4">
      <h2 className="text-center mb-4">🚭 Smoking Cessation</h2>

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

export default SmokingCessation;
