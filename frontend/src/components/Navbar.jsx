import { Link } from "react-router-dom";

function Navbar({ scrolled }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Left: Logo + Search bar when scrolled */}
        <div className="d-flex align-items-center flex-grow-1">
          <Link className="navbar-brand d-flex align-items-center me-3" to="/">
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

          {/* Search bar inline when scrolled */}
          {scrolled && (
            <form className="search-bar-container compact">
              <input
                type="text"
                className="form-control"
                placeholder="Search for medicines"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          )}
        </div>

        {/* Right: Nav links + Cart + Auth */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">🏠 Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/medicines">💊 Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">📤 Upload</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">🛒 Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-primary ms-lg-3 mt-2 mt-lg-0 px-3" to="/login">
                🔑 Sign In / Join
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
