import React from "react";

const Footer: React.FC = () => {
    const socialIcons = [
        { src: "/assets/icons8-twitter.svg", alt: "Twitter Icon" },
        { src: "/assets/icons8-gmail-30.svg", alt: "Gmail Icon" },
        { src: "/assets/icons8-facebook-32.svg", alt: "Facebook Icon" },
        { src: "/assets/icons8-instagram-32.svg", alt: "Instagram Icon" },
    ];

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 space-y-4 sm:space-y-0">
            <p className="text-center sm:text-left">© 2024 Webtrix. All Rights Reserved.</p>
            <div className="flex space-x-4">
                {socialIcons.map((icon, idx) => (
                    <img key={idx} src={icon.src} alt={icon.alt} className="w-6 h-6 hover:opacity-80 transition" />
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
