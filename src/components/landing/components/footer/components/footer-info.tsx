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
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 space-y-4 sm:space-y-0">
            <p className="text-center sm:text-left">© 2024 Webtrix. All Rights Reserved.</p>
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
                        <Icon className="w-6 h-6" title={alt} />
                    </a>
                ))}
            </div>
            <div className="flex items-center space-x-4">
                <a href="/privacy-policy" className="hover:text-teal-500 transition">
                    Privacy Policy
                </a>
                <a href="/terms-of-service" className="hover:text-teal-500 transition">
                    Terms of Service
                </a>
            </div>
        </div>
    );
};

export default Footer;
