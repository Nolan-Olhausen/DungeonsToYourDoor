import React from "react";
import "../index.css";
import logo from "../assets/dndLogoDoor.png";

function Navbar({ activePage, onNavClick }) {
  const navItems = ["The DM", "Adventures", "Home", "Pricing", "Contact"];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item, index) => (
          <li key={item} className="nav-item">
            {item === "Home" ? (
              <button
                className={`nav-button logo-button ${
                  activePage === "Home" ? "active" : ""
                }`}
                onClick={() => onNavClick("Home")}
              >
                <img src={logo} alt="Home" className="nav-logo" />
              </button>
            ) : (
              <button
                className={`nav-button ${activePage === item ? "active" : ""}`}
                onClick={() => onNavClick(item)}
              >
                {item}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
