import React from 'react';
import './DermaCare.css';

const products = [
  { name: "Ethiglo Tablet 10", description: "20% OFF", price: 412.00, image: "/images/health/ethiglo.jpg", discount: "20% OFF" },
  { name: "Glutone 1000 Effervescent Tablet 15", description: "20% OFF", price: 2200.00, image: "/images/health/glutone-1000.jpg", discount: "20% OFF" },
  { name: "Hamdard Safi Blood Purifier 500ml", description: "17% OFF", price: 145.00, image: "/images/health/safi.jpg", discount: "17% OFF" },
  { name: "Glutone Effervescent Tablet 15", description: "17% OFF", price: 2290.00, image: "/images/health/glutone.jpg", discount: "17% OFF" },
  { name: "Briotas Intense Cream 20gm", description: "17% OFF", price: 390.00, image: "/images/health/briotas.jpg", discount: "17% OFF" },
  { name: "Melbild Solution 5ml", description: "17% OFF", price: 720.00, image: "/images/health/melbild.jpg", discount: "17% OFF" },
  { name: "Priviva Tablet 10", description: "15% OFF", price: 157.00, image: "/images/health/priviva.jpg", discount: "15% OFF" },
  { name: "Reclaim AC Capsule 10", description: "11% OFF", price: 395.00, image: "/images/health/reclaim.jpg", discount: "11% OFF" },
  { name: "Dermi Antiseptic Liquid 125ml", description: "11% OFF", price: 67.00, image: "/images/health/dermi.jpg", discount: "11% OFF" },
  { name: "Amilil Luliconazole Cream 10gm", description: "11% OFF", price: 142.00, image: "/images/health/amilil.jpg", discount: "11% OFF" },
  { name: "Mederma Gel 20gm", description: "11% OFF", price: 552.00, image: "/images/health/mederma.jpg", discount: "11% OFF" },
  { name: "Retiglow Night Cream 20gm", description: "11% OFF", price: 396.00, image: "/images/health/retiglow.jpg", discount: "11% OFF" },
  { name: "Cutiyt CD Lotion 50ml", description: "11% OFF", price: 254.00, image: "/images/health/cutiyt.jpg", discount: "11% OFF" },
  { name: "Tyrodin Face Mask 100ml", description: "11% OFF", price: 779.00, image: "/images/health/tyrodin.jpg", discount: "11% OFF" },
];

const DermaCare = () => {
  return (
    <div className="dermacare-container container py-4">
      <h2 className="text-center mb-4">🧴 Derma Care</h2>

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

export default DermaCare;
