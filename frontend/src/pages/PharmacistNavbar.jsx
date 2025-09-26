import { NavLink } from "react-router-dom";
import "./PharmacistNavbar.css";

export default function PharmacistNavbar() {
  return (
    <nav className="pharmacist-navbar">
      <div className="navbar-brand">🧪 MediIQ Pharmacist Panel</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/pharmacist/dashboard" activeclassname="active">Prescriptions</NavLink>
        </li>
        <li>
          <NavLink to="/pharmacist/upload-medicine" activeclassname="active">Upload Medicine</NavLink>
        </li>
        <li>
          <NavLink to="/pharmacist/medicines" activeclassname="active">View Medicines</NavLink>
        </li>
      </ul>
    </nav>
  );
}
