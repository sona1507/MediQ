import React, { useRef } from "react";

function CategorySection() {
  const scrollRef = useRef(null);

  const categories = [
    { name: "Medicines",     image: "/images/medicines.jpg" },
    { name: "Personal Care", image: "/images/personalcare.jpg" },
    { name: "Health Care",   image: "/images/healthcare.jpg" },
    { name: "Vitamins",      image: "/images/vitamins.jpg" },
    { name: "Ayurveda",      image: "/images/ayurveda.jpg" },
    { name: "Derma Care",    image: "/images/dermacare.jpg" },
    { name: "Women",         image: "/images/women.jpg" },
    { name: "Mom & Baby",    image: "/images/momandbaby.jpg" },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="category-strip my-5">
      <div className="strip-wrapper">
        <h2 className="fw-bold mb-4">Shop by Categories</h2>

        {/* Scroll buttons */}
        <button
          className="strip-btn left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="strip-row" ref={scrollRef}>
          {categories.map((cat, i) => (
            <div key={i} className="strip-card text-center">
              <img src={cat.image} alt={cat.name} className="strip-img" />
              <p className="mt-2 mb-0 fw-semibold">{cat.name}</p>
            </div>
          ))}
        </div>

        <button
          className="strip-btn right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default CategorySection;
