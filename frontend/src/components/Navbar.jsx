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
import "./Navbar.css"; // we'll add styles here

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img
               src="/images/logo.png"
               alt="Logo"
               width="70"
               height="70"
               className="d-inline-block align-text-middle"
             />
      <span>Medi<b >Q</b></span>


      </div>

      {/* Links */}
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/medicines">Medicines</a></li>
        <li><a href="/upload">Upload Prescription</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

