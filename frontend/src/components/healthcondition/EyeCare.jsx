import React from 'react';
import './EyeCare.css';

const products = [
  { name: "Itone Eye Drops 10ml", description: "50% OFF", price: 43.42, image: "/images/itone.jpg", discount: "50% OFF" },
  { name: "Everfresh Tears Eye Drops 10ml", description: "50% OFF", price: 65.49, image: "/images/everfresh.jpg", discount: "50% OFF" },
  { name: "Refresh Tears Eye Drops 10ml", description: "15% OFF", price: 126.36, image: "/images/refresh.jpg", discount: "15% OFF" },
  { name: "I Site Af Capsule 10", description: "17% OFF", price: 231, image: "/images/isite.jpg", discount: "17% OFF" },
  { name: "Eyemist Gel 10gm", description: "17% OFF", price: 373.5, image: "/images/eyemist.jpg", discount: "17% OFF" },
  { name: "Gloeye Tablet 10", description: "18% OFF", price: 126.36, image: "/images/gloeye.jpg", discount: "18% OFF" },
  { name: "Genteal Eye Drops 10ml", description: "14% OFF", price: 226.46, image: "/images/genteal.jpg", discount: "14% OFF" },
  { name: "Maqvue Tablet 10", description: "No Discount", price: 343.2, image: "/images/maqvue.jpg", discount: "" },
  { name: "Refresh Liquigel Eye Drops 10ml", description: "No Discount", price: 126.36, image: "/images/refreshliquigel.jpg", discount: "" },
  { name: "Irimist Eye Gel 10gml", description: "20% OFF", price: 352, image: "/images/irimist.jpg", discount: "20% OFF" },
  { name: "Faireye Advanced Dark Circle Care Cream 15gm", description: "20% OFF", price: 722, image: "/images/faireye.jpg", discount: "20% OFF" },
  { name: "Eyemist Forte Eye Drops 10ml", description: "No Discount", price: 233, image: "/images/eyemist.jpg", discount: "" },
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

export default EyeCare;
