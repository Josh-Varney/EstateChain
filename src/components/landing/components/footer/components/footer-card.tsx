import React from "react";

const LinksCard: React.FC = () => {
    const links = [
        {
            title: "Explore",
            links: [
                { name: "Property Listings", href: "/home" },
                { name: "Tokenized Properties", href: "/home" },
                { name: "Marketplace", href: "/home" },
                { name: "How It Works", href: "/info/tokenisation" },
            ],
        },
        {
            title: "Invest",
            links: [
                { name: "Start Investing", href: "/home" },
                { name: "Tokenization Benefits", href: "/info/tokenisation" },
                { name: "Investment Opportunities", href: "/info/tokenisation" },
                { name: "Portfolio Dashboard", href: "/home" },
            ],
        },
        {
            title: "Resources",
            links: [
                { name: "Learn About Tokenization", href: "/info/tokenisation" },
                { name: "Case Studies", href: "/info/case-studies" },
                { name: "News and Insights", href: "/info/news&insights" },
            ],
        },
        {
            title: "Support",
            links: [
                { name: "Contact Us", href: "/contact" },
                { name: "FAQs", href: "/faq" },
                { name: "Privacy Policy", href: "/policy/privacy-policy" },
                { name: "Cookie Policy", href: "/policy/cookie-policy"}
            ],
        },
    ];

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 col-span-12 md:col-span-7">
            {links.map((section, index) => (
                <div key={index}>
                    <p className="text-white mb-4">{section.title}</p>
                    <ul className="text-gray-400 space-y-2 text-sm">
                        {section.links.map((link, idx) => (
                            <li key={idx}>
                                <a
                                    href={link.href}
                                    className="hover:text-white transition"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default LinksCard;
