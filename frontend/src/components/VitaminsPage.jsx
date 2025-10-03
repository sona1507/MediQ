import React from 'react';
import './VitaminsPage.css';

const products = [
  { name: "Vitamin C Chewable Tablets", description: "15% OFF", price: 120, image: "/images/allmed.jpg", discount: "15% OFF" },
  { name: "Multivitamin Capsules", description: "10% OFF", price: 180, image: "/images/allmed.jpg", discount: "10% OFF" },
  { name: "Calcium + D3 Tablets", description: "20% OFF", price: 150, image: "/images/allmed.jpg", discount: "20% OFF" },
  { name: "Zinc Supplement Syrup", description: "Save ₹5 with Combo", price: 95, image: "/images/allmed.jpg", discount: "" },
  { name: "Iron Folic Acid Tablets", description: "18% OFF", price: 110, image: "/images/allmed.jpg", discount: "18% OFF" },
  { name: "Omega-3 Fish Oil Capsules", description: "25% OFF", price: 250, image: "/images/allmed.jpg", discount: "25% OFF" },
  { name: "Biotin Hair & Nail Capsules", description: "12% OFF", price: 135, image: "/images/allmed.jpg", discount: "12% OFF" },
  { name: "Vitamin D3 Drops", description: "Save ₹3 with Combo", price: 85, image: "/images/allmed.jpg", discount: "" },
  { name: "Magnesium Tablets", description: "10% OFF", price: 140, image: "/images/allmed.jpg", discount: "10% OFF" },
];

const VitaminsPage = () => {
  return (
    <div className="vitamins-container container py-4">
      <h2 className="text-center mb-4">🧪 Vitamins & Supplements</h2>

      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 product-card shadow-sm position-relative">
              {product.discount && (
                <div className="position-absolute top-0 end-0 bg-warning text-dark px-2 py-1 rounded-start fw-bold">
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
                <button className="btn btn-outline-success w-100 mt-2">
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

export default VitaminsPage;
