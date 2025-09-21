import React from 'react';
import './BoneJointCare.css';

const products = [
  {
    name: "Cartigen Pro Tablet 10",
    description: "Save ₹164 | MRP ₹820.00",
    price: 656,
    image: "/images/cartigen-pro.jpg",
    discount: "20% OFF"
  },
  {
    name: "Tendocare Forte Tablet 10",
    description: "Save ₹264 | MRP ₹528.00",
    price: 264,
    image: "/images/tendocare-10.jpg",
    discount: "50% OFF"
  },
  {
    name: "Shelcal Joints Capsule 10",
    description: "Save ₹21.75 | MRP ₹670",
    price: 699.2,
    image: "/images/shelcal.jpg",
    discount: "20% OFF"
  },
  {
    name: "Rejoint New Tablet 10",
    description: "Save ₹16.50 | MRP ₹82.50",
    price: 66,
    image: "/images/rejoint-new.jpg",
    discount: "20% OFF"
  },
  {
    name: "Rosiflex Trio Capsule 14",
    description: "Save ₹11.63 | MRP ₹670",
    price: 658.76,
    image: "/images/rosiflex.jpg",
    discount: "15% OFF"
  },
  {
    name: "Tendocare Forte Tablet 15",
    description: "Save ₹159 | MRP ₹792.00",
    price: 633,
    image: "/images/tendocare-15.jpg",
    discount: "20% OFF"
  },
  {
    name: "Macvestin Neo Tablet 10",
    description: "Save ₹32.40 | MRP ₹180.00",
    price: 147.6,
    image: "/images/macvestin.jpg",
    discount: "18% OFF"
  },
  {
    name: "Gemcal Plus Capsule 15",
    description: "Save ₹24 | MRP ₹427.00",
    price: 394,
    image: "/images/gemcal.jpg",
    discount: "20% OFF"
  },
  {
    name: "Jointace Iso Capsule 10",
    description: "Save ₹45 | MRP ₹225.00",
    price: 180,
    image: "/images/jointace.jpg",
    discount: "20% OFF"
  },
  {
    name: "CalcimaxP Tablet 15",
    description: "Save ₹36 | MRP ₹180.00",
    price: 144,
    image: "/images/calcimax.jpg",
    discount: "20% OFF"
  },
  {
    name: "Cal 123 Total Tablet 15",
    description: "Save ₹36 | MRP ₹180.00",
    price: 144,
    image: "/images/cal123.jpg",
    discount: "20% OFF"
  },
  {
    name: "T Heal Capsule 10",
    description: "Save ₹48 | MRP ₹240.00",
    price: 192,
    image: "/images/theal.jpg",
    discount: "20% OFF"
  }
];

const BoneJointCare = () => {
  return (
    <div className="bonejointcare-container container py-4">
      <h2 className="text-center mb-4">🦴 Bone & Joint Care</h2>

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

export default BoneJointCare;
