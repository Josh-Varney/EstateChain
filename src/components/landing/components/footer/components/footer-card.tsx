import React from "react";

const LinksCard: React.FC = () => {
    const links = [
        {
            title: "Product",
            links: ["Invest Your Future", "Find Our Stocks", "Find Our Crypto", "Earn Extra Money", "Bank Smarter"],
        },
        {
            title: "Who We Are",
            links: ["About Us", "Career", "News and Media", "Financial Statement"],
        },
        {
            title: "Support",
            links: ["FAQs", "Contacts", "Mobile", "Windows & Mac", "Desktop Version"],
        },
        {
            title: "Documentation",
            links: ["Public URLs", "Social Rooms", "User Guide", "Privacy Policy"],
        },
    ];

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 col-span-12 md:col-span-7">
            {links.map((section, index) => (
                <div key={index}>
                    <p className="text-white mb-4">{section.title}</p>
                    <ul className="text-gray-400 space-y-2 text-sm">
                        {section.links.map((link, idx) => (
                            <li key={idx} className="hover:text-white transition">
                                {link}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default LinksCard;
