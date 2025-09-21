import React from 'react';
import './PainRelief.css';

const products = [
  { name: "Moov Active Spray 60gm", description: "10% OFF", price: 135, image: "/images/health/moov-active.jpg", discount: "10% OFF" },
  { name: "Moov Ointment 15gm", description: "10% OFF", price: 45, image: "/images/health/moov-ointment.jpg", discount: "10% OFF" },
  { name: "Moov Pain Relief Combo", description: "25% OFF", price: 150, image: "/images/health/moov-combo.jpg", discount: "25% OFF" },
  { name: "Omnigel Spray 100gm", description: "35% OFF", price: 120, image: "/images/health/omnigel-100.jpg", discount: "35% OFF" },
  { name: "Omnigel Spray 60gm", description: "17% OFF", price: 85, image: "/images/health/omnigel-60.jpg", discount: "17% OFF" },
  { name: "Omnigel Spray 100gm (Alt)", description: "40% OFF", price: 110, image: "/images/health/omnigel-100-alt.jpg", discount: "40% OFF" },
  { name: "Zandu Balm 75gm", description: "10% OFF", price: 90, image: "/images/health/zandu-balm.jpg", discount: "10% OFF" },
  { name: "Zandu Ultra Power Balm 8ml", description: "12% OFF", price: 55, image: "/images/health/zandu-ultra.jpg", discount: "12% OFF" },
  { name: "Sandiron Advance Tablets 10s", description: "18% OFF", price: 82, image: "/images/health/sandiron-advance.jpg", discount: "18% OFF" },
  { name: "Sandiron New Tablet 10s", description: "10% OFF", price: 72, image: "/images/health/sandiron-new.jpg", discount: "10% OFF" },
  { name: "Volini Spray 100gm", description: "19% OFF", price: 135, image: "/images/health/volini-100.jpg", discount: "19% OFF" },
  { name: "Volini Spray 60gm", description: "Save ₹4.25 with Substitutes", price: 95, image: "/images/health/volini-60.jpg", discount: "" },
  { name: "Megapasi Oil 50ml", description: "18% OFF", price: 110, image: "/images/health/megapasi.jpg", discount: "18% OFF" },
  { name: "Volini Gel 30gm", description: "Save ₹0.90 with Substitutes", price: 85, image: "/images/health/volini-gel-30.jpg", discount: "" },
  { name: "Volini Gel 15gm", description: "18% OFF", price: 65, image: "/images/health/volini-gel-15.jpg", discount: "18% OFF" },
];

const PainRelief = () => {
  return (
    <div className="painrelief-container container py-4">
      <h2 className="text-center mb-4">💪 Pain Relief</h2>

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

export default PainRelief;
