import React from 'react';
import './DigestiveCare.css';

const products = [
  { name: "Digene Mint Flavour Gel 450ml", description: "Save ₹42 | MRP ₹210.00", price: 168, image: "/images/health/digene.jpg", discount: "20% OFF" },
  { name: "Softovac SF Powder 250gm", description: "Save ₹72 | MRP ₹332.00", price: 260, image: "/images/health/softovac-250.jpg", discount: "22% OFF" },
  { name: "Gas-O-Fast Sachet Lemon Flavour (Pack of 30)", description: "Save ₹24 | MRP ₹132.00", price: 108, image: "/images/health/gasofast.jpg", discount: "18% OFF" },
  { name: "Balagranth Triphala Liquid 500ml", description: "Save ₹65 | MRP ₹150.00", price: 85, image: "/images/health/triphala.jpg", discount: "43% OFF" },
  { name: "Enzyme Pineapple Syrup 200ml", description: "Save ₹15 | MRP ₹100.00", price: 85, image: "/images/health/enzyme.jpg", discount: "15% OFF" },
  { name: "Cremalax Mint Syrup 170ml", description: "Save ₹21.25 | MRP ₹106.25", price: 85, image: "/images/health/cremalax-170.jpg", discount: "20% OFF" },
  { name: "Duphalac Lemon Syrup 450ml", description: "Save ₹198 | MRP ₹450.00", price: 252, image: "/images/health/duphalac.jpg", discount: "44% OFF" },
  { name: "Tummy Star Probiotic Sachets (30)", description: "Save ₹300 | MRP ₹750.00", price: 450, image: "/images/health/tummystar.jpg", discount: "40% OFF" },
  { name: "Pet Saffa Tablet 60's", description: "Save ₹30 | MRP ₹150.00", price: 120, image: "/images/health/petsaffa.jpg", discount: "20% OFF" },
  { name: "Softovac SF Powder 500gm", description: "Save ₹130 | MRP ₹590.00", price: 460, image: "/images/health/softovac-500.jpg", discount: "22% OFF" },
  { name: "Unienzyme Tablet 15's", description: "Save ₹20 | MRP ₹105.00", price: 85, image: "/images/health/unienzyme.jpg", discount: "19% OFF" },
  { name: "Cremalax Mint Emulsion 450ml", description: "Save ₹45 | MRP ₹225.00", price: 180, image: "/images/health/cremalax-450.jpg", discount: "20% OFF" },
];

const DigestiveCare = () => {
  return (
    <div className="digestivecare-container container py-4">
      <h2 className="text-center mb-4">🧃 Digestive Care</h2>

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

export default DigestiveCare;
