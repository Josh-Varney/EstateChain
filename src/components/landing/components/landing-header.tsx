import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LandingHeader: React.FC = () => {
    // List of navigation links with their respective routes (default or placeholders where needed)
    const navLinks = [
        { label: "Home", path: "/landing" }, // Home is associated with /landing
        { label: "Technology", path: "/technology" }, // Technology is associated with /technology
        { label: "Features", path: "/features" }, // Default for Features
        { label: "Pricing", path: "/pricing" }, // Default for Pricing
        { label: "FAQ", path: "/faq" }, // FAQ is associated with /faq
    ];

    return (
        <div className="flex flex-wrap w-full items-center mt-4">
            {/* Logo Section */}
            <div className="flex-shrink-0">
                <p className="bg-red-50 ml-5 mr-10 p-2">Logo</p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-row items-center justify-center space-x-5 flex-1 overflow-x-auto">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path} // Route for the link
                        className={({ isActive }) =>
                            `text-sm font-sans selection:bg-cyan-600 selection:text-white cursor-pointer ${
                                isActive ? "text-white" : "text-gray-500"
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </div>

            {/* Button Section */}
            <div className="flex-shrink-0 mr-6">
                <button className="flex flex-row items-center space-x-1 rounded-xl bg-gray-700 text-white p-2 text-xs hover:bg-gray-500">
                    {/* Icon */}
                    <FontAwesomeIcon icon={faUser} size="1x" />

                    {/* Button Text */}
                    <p className="text-center whitespace-nowrap">Create Account</p>
                </button>
            </div>
        </div>
    );
};

export default LandingHeader;
