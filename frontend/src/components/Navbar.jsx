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

// export default AppNavbar;
import React from "react";
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
        width="50"
        height="50"
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
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Links */}
    <div className="collapse navbar-collapse" id="navbarNav">
     <ul className="nav-links">
  <li><a href="/">🏠 Home</a></li>
  <li><a href="/medicines">💊 Shop Medicines</a></li>
  <li><a href="/upload">📤 Upload Prescription</a></li>
  <li><a href="/cart">🛒 My Cart</a></li>
  <li><a href="/login" className="login-btn">🔑 Sign In</a></li>
</ul>


    </div>
  </div>
</nav>

  );
}

export default Navbar;


