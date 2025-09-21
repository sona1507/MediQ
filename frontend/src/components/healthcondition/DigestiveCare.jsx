import React from 'react';
import './DigestiveCare.css';

const products = [
  { name: "Digene Mint Flavour Gel 450ml", description: "Save ₹42 | MRP ₹210.00", price: 168, image: "/images/Digene.jpg", discount: "20% OFF" },
  { name: "Softovac Sf Powder 250gm", description: "Save ₹72 | MRP ₹332.00", price: 260, image: "/images/softovac.jpg", discount: "22% OFF" },
  { name: "Gaviscon Peppermint Liquid 150ml", description: "Save ₹24 | MRP ₹132.00", price: 108, image: "/images/Gaviscon.jpg", discount: "18% OFF" },
  { name: "Baidyanath Triphala Churna 500gm", description: "Save ₹65 | MRP ₹150.00", price: 85, image: "/images/Baidyanath.jpg", discount: "43% OFF" },
  { name: "Omee Mint Flavour Chewable Tablet 12", description: "Save ₹15 | MRP ₹100.00", price: 85, image: "/images/Omee.jpg", discount: "15% OFF" },
  { name: "Etazyme Pineapple Flavoured Syrup 200ml", description: "Save ₹21.25 | MRP ₹106.25", price: 85, image: "/images/Etazyme.jpg", discount: "20% OFF" },
  { name: "Cremaffin Mixed Fruit Flavour Emulsion 225ml", description: "Save ₹198 | MRP ₹450.00", price: 252, image: "/images/Cremaffin.jpg", discount: "44% OFF" },
  { name: "Duphalac Lemon Flavour Solution 450ml", description: "Save ₹300 | MRP ₹750.00", price: 450, image: "/images/Duphalac.jpg", discount: "40% OFF" },
  { name: "Tummy Saaf Churan 80gm+20gm", description: "Save ₹30 | MRP ₹150.00", price: 120, image: "/images/Tummy.jpg", discount: "20% OFF" },
  { name: "Pet Saffa Tablet 30", description: "Save ₹130 | MRP ₹590.00", price: 460, image: "/images/Pet.jpg", discount: "22% OFF" },
  { name: "Softovac Sf Powder 450gm", description: "Save ₹20 | MRP ₹105.00", price: 85, image: "/images/Softovac.jpg", discount: "19% OFF" },
  { name: "Unienzyme Tablet 15", description: "Save ₹45 | MRP ₹225.00", price: 180, image: "/images/Unienzyme.jpg", discount: "20% OFF" },
];

const DigestiveCare = () => {
  return (
    <div className="digestivecare-container container py-4">
      <h2 className="text-center mb-4">🧃 Digestive Care</h2>

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

export default DigestiveCare;
