import React from 'react';
import './EyeCare.css';

const products = [
  { name: "Itone Eye Drops 10ml", description: "50% OFF", price: 43.42, image: "/images/health/itone.jpg", discount: "50% OFF" },
  { name: "Everfresh Tears Eye Drops 10ml", description: "50% OFF", price: 65.49, image: "/images/health/everfresh.jpg", discount: "50% OFF" },
  { name: "Refresh Tears Eye Drops 10ml", description: "15% OFF", price: 126.36, image: "/images/health/refresh-tears.jpg", discount: "15% OFF" },
  { name: "Meb Eye M Capsule 10", description: "17% OFF", price: 61.88, image: "/images/health/meb.jpg", discount: "17% OFF" },
  { name: "Eysential Gel 10gm", description: "17% OFF", price: 126.36, image: "/images/health/eysential-gel.jpg", discount: "17% OFF" },
  { name: "Gloeye Tablet 10", description: "18% OFF", price: 126.36, image: "/images/health/gloeye.jpg", discount: "18% OFF" },
  { name: "Gentolad Eye Drops 10ml", description: "14% OFF", price: 25.46, image: "/images/health/gentolad.jpg", discount: "14% OFF" },
  { name: "Maxpure Tablet 10", description: "No Discount", price: 43.42, image: "/images/health/maxpure.jpg", discount: "" },
  { name: "Refresh Liquigel Eye Drops 10ml", description: "No Discount", price: 126.36, image: "/images/health/liquigel.jpg", discount: "" },
  { name: "Eyemist Eye Drops 10ml", description: "20% OFF", price: 126.36, image: "/images/health/eyemist.jpg", discount: "20% OFF" },
  { name: "Fair Eye Dark Circle Cream 15gm", description: "20% OFF", price: 126.36, image: "/images/health/fair-eye.jpg", discount: "20% OFF" },
  { name: "Eysential Tablet 10", description: "No Discount", price: 126.36, image: "/images/health/eysential-tab.jpg", discount: "" },
  { name: "LuteinNXT Capsule 10", description: "No Discount", price: 126.36, image: "/images/health/luteinnxt.jpg", discount: "" },
];

const EyeCare = () => {
  return (
    <div className="eyecare-container container py-4">
      <h2 className="text-center mb-4">👁️ Eye Care</h2>

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

export default EyeCare;
