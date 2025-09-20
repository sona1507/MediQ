import React from 'react';
import './BoneJointCare.css';

const products = [
  {
    name: "Cartigen Forte Tablet 10",
    description: "Save ₹164 | MRP ₹820.00",
    price: 656,
    image: "/images/health/cartigen-forte.jpg",
    discount: "20% OFF"
  },
  {
    name: "Tendocare Forte Tablet 10",
    description: "Save ₹264 | MRP ₹528.00",
    price: 264,
    image: "/images/health/tendocare-10.jpg",
    discount: "50% OFF"
  },
  {
    name: "Shelcal 500mg Tablet 15",
    description: "Save ₹21.75 | MRP ₹108.75",
    price: 87,
    image: "/images/health/shelcal.jpg",
    discount: "20% OFF"
  },
  {
    name: "Rejoint New Tablet 10",
    description: "Save ₹16.50 | MRP ₹82.50",
    price: 66,
    image: "/images/health/rejoint-new.jpg",
    discount: "20% OFF"
  },
  {
    name: "Roseday 10mg Capsule 10",
    description: "Save ₹11.63 | MRP ₹77.50",
    price: 65.87,
    image: "/images/health/roseday.jpg",
    discount: "15% OFF"
  },
  {
    name: "Tendocare Forte Tablet 15",
    description: "Save ₹159 | MRP ₹792.00",
    price: 633,
    image: "/images/health/tendocare-15.jpg",
    discount: "20% OFF"
  },
  {
    name: "Movonext Nano Gel 30gm",
    description: "Save ₹32.40 | MRP ₹180.00",
    price: 147.6,
    image: "/images/health/movonext.jpg",
    discount: "18% OFF"
  },
  {
    name: "Gemcal D3 Capsule 4",
    description: "Save ₹24 | MRP ₹120.00",
    price: 96,
    image: "/images/health/gemcal.jpg",
    discount: "20% OFF"
  },
  {
    name: "Jointace Iso Capsule 10",
    description: "Save ₹45 | MRP ₹225.00",
    price: 180,
    image: "/images/health/jointace.jpg",
    discount: "20% OFF"
  },
  {
    name: "Calcimax Total Tablet 15",
    description: "Save ₹36 | MRP ₹180.00",
    price: 144,
    image: "/images/health/calcimax.jpg",
    discount: "20% OFF"
  },
  {
    name: "Rejoint Tablet 10",
    description: "Save ₹16.50 | MRP ₹82.50",
    price: 66,
    image: "/images/health/rejoint.jpg",
    discount: "20% OFF"
  },
  {
    name: "Cal 123 Total Tablet 15",
    description: "Save ₹36 | MRP ₹180.00",
    price: 144,
    image: "/images/health/cal123.jpg",
    discount: "20% OFF"
  },
  {
    name: "T Heal Capsule 10",
    description: "Save ₹48 | MRP ₹240.00",
    price: 192,
    image: "/images/health/theal.jpg",
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
              <div className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 rounded-start">
                {product.discount}
              </div>
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

export default BoneJointCare;
