import React from 'react';
import './HeartCare.css';

const products = [
  { name: "Co Q 300 Capsule (10)", description: "50% OFF", price: 471.45, image: "/images/health/coq300.jpg", discount: "50% OFF" },
  { name: "Qcard Capsule (10)", description: "17% OFF", price: 467.91, image: "/images/health/qcard.jpg", discount: "17% OFF" },
  { name: "Nrgmax Forte Capsule (10)", description: "17% OFF", price: 128.00, image: "/images/health/nrgmax.jpg", discount: "17% OFF" },
  { name: "Omega 3-6-9 Capsule (10)", description: "17% OFF", price: 128.00, image: "/images/health/omega369.jpg", discount: "17% OFF" },
  { name: "Biodynevit Ayurjanita 450ml", description: "20% OFF", price: 437.24, image: "/images/health/biodynevit.jpg", discount: "20% OFF" },
  { name: "Mayur Tablet (10)", description: "13% OFF", price: 437.24, image: "/images/health/mayur.jpg", discount: "13% OFF" },
  { name: "Himalaya Arjuna Tablet (60)", description: "13% OFF", price: 243.00, image: "/images/health/arjuna.jpg", discount: "13% OFF" },
  { name: "Kapiva Heart Care Juice 1L", description: "10% OFF", price: 449.00, image: "/images/health/kapiva.jpg", discount: "10% OFF" },
  { name: "Snee 300 Capsule (10)", description: "17% OFF", price: 243.00, image: "/images/health/snee.jpg", discount: "17% OFF" },
  { name: "Harty Plus Capsule (10)", description: "17% OFF", price: 437.24, image: "/images/health/hartyplus.jpg", discount: "17% OFF" },
  { name: "Covibant Capsule (10)", description: "20% OFF", price: 437.24, image: "/images/health/covibant.jpg", discount: "20% OFF" },
  { name: "Q Shine 300 Soft Gelatin Capsule (10)", description: "13% OFF", price: 699.97, image: "/images/health/qshine.jpg", discount: "13% OFF" },
  { name: "Resvita Capsule (10)", description: "17% OFF", price: 437.24, image: "/images/health/resvita.jpg", discount: "17% OFF" },
];

const HeartCare = () => {
  return (
    <div className="heartcare-container container py-4">
      <h2 className="text-center mb-4">❤️ Heart Care</h2>

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

export default HeartCare;
