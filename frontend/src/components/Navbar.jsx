// import React from 'react';

// const AppNavbar = () => {
//   return (
//     <div>
//       <nav className="navbar bg-body-tertiary">
//         <div className="container-fluid">
//           <a className="navbar-brand brand-text" href="#">
//             <img
//               src="/images/logo.png"
//               alt="Logo"
//               width="70"
//               height="70"
//               className="d-inline-block align-text-middle"
//             />
//             MediQ
//           </a>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default AppNavbar;import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/logo.png"
            alt="Logo"
            width="45"
            height="45"
            className="me-2"
          />
          <span className="fw-bold text-primary">
            Medi<span className="text-dark">Q</span>
          </span>
        </Link>

        {/* Toggler (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ms-auto text-end">
            <li className="nav-item">
              <Link className="nav-link" to="/">🏠 Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/medicines">💊 Shop Medicines</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">📤 Upload Prescription</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">🛒 My Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary ms-lg-3 mt-2 mt-lg-0" to="/login">
                🔑 Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
