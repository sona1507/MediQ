import React from "react";
import { Link } from "react-router-dom";

const CategoryNavbar = ({ scrolled }) => (
  <div className={`category-navbar ${scrolled ? "scrolled" : ""}`}>
    <div className="container">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/medicines">Medicines</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/personal-care">Personal Care</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/health-conditions">Health Conditions</Link>
        </li>
        <Link to="/vitamins" className="nav-link">
          Vitamins & Supplements
        </Link>

        <li className="nav-item">
          <Link className="nav-link" to="/health-guide">Health Guide</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ayurveda">Ayurveda</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default CategoryNavbar;
