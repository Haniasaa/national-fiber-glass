import { useState } from "react";
import "./Header.css";

function Header({ showHero = true }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      id="home"
      className={`hero-header ${
        !showHero ? "navbar-only" : ""
      }`}
    >
      {showHero && <div className="overlay"></div>}

      <nav className="navbar">

        <div className="logo">
          National Fiber Glass
        </div>

        <ul
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >
          <li>
            <a
              href="/#home"
              onClick={closeMenu}
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="/#about"
              onClick={closeMenu}
            >
              About Us
            </a>
          </li>

          <li>
            <a
              href="/#products"
              onClick={closeMenu}
            >
              Products
            </a>
          </li>

          <li>
            <a
              href="/#dealers"
              onClick={closeMenu}
            >
              Our Brands
            </a>
          </li>

          <li>
            <a
              href="/#contact"
              onClick={closeMenu}
            >
              Contact Us
            </a>
          </li>
        </ul>

        <button
          className={`hamburger ${
            menuOpen ? "active" : ""
          }`}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </nav>

      {showHero && (
        <div className="hero-main">

          <div className="hero-content">

            <h1 className="hero-title">
              National Fiber Glass
            </h1>

            <p className="hero-subtitle">
              Shades, Windows, Doors, Car Porch
              & Factory Shade Solutions
            </p>

          </div>

          <a
            href="#contact"
            className="hero-btn primary-btn"
          >
            Order Now
          </a>

        </div>
      )}

    </header>
  );
}

export default Header;