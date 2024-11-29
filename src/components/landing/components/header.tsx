import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const LandingHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // List of navigation links with their respective routes
  const navLinks = [
    { label: "Home", path: "/landing" },
    { label: "Technology", path: "/technology" },
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact Us", path: "/contact"},
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-gray-800 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <p className="bg-red-50 text-gray-800 font-bold px-4 py-2 rounded-md">
              Logo
            </p>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-row items-center justify-center space-x-6 pl-14">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium hover:text-white ${
                    isActive ? "text-white" : "text-gray-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Button Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 rounded-md bg-gray-700 text-white px-4 py-2 text-sm hover:bg-gray-600">
              <FontAwesomeIcon icon={faUser} />
              <span>Create Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="space-y-2 px-4 py-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                className={({ isActive }) =>
                  `block text-sm font-medium py-2 ${
                    isActive ? "text-white" : "text-gray-400"
                  } hover:text-white`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button className="w-full flex items-center justify-center space-x-2 rounded-md bg-gray-700 text-white px-4 py-2 text-sm hover:bg-gray-600 mt-4">
              <FontAwesomeIcon icon={faUser} />
              <span>Create Account</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
