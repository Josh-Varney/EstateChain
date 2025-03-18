import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
    const socialIcons = [
        { component: FaTwitter, alt: "Twitter Icon", href: "https://twitter.com" },
        { component: FaEnvelope, alt: "Gmail Icon", href: "mailto:joshua.varney1@gmail.com" },
        { component: FaFacebook, alt: "Facebook Icon", href: "https://facebook.com" },
        { component: FaInstagram, alt: "Instagram Icon", href: "https://instagram.com" },
    ];

    return (
        <footer role="contentinfo" className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 space-y-4 sm:space-y-0">
            <p className="text-center sm:text-left">© 2024 EquiSpace. All Rights Reserved.</p>
            <div className="flex space-x-4">
                {socialIcons.map(({ component: Icon, alt, href }, idx) => (
                    <a
                        key={idx}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={alt}
                        className="text-gray-400 hover:text-teal-500 transition"
                    >
                        {/* <Icon className="w-6 h-6" title={alt} /> */}
                    </a>
                ))}
            </div>
            <div className="flex items-center space-x-4">
                <a href="/policy/privacy-policy" aria-label="Privacy Policy" className="hover:text-teal-500 transition">
                    Privacy Policy
                </a>
                <a href="/policy/t&c-policy" aria-label="Terms of Service" className="hover:text-teal-500 transition">
                    Terms of Service
                </a>
            </div>
        </footer>
    );
};

export default Footer;
