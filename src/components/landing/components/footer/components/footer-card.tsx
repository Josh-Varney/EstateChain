import React from "react";

const LinksCard: React.FC = () => {
    const links = [
        {
            title: "Explore",
            links: [
                { name: "Property Listings", href: "/product/invest-your-future" },
                { name: "Tokenized Properties", href: "/product/find-our-stocks" },
                { name: "Marketplace", href: "/product/find-our-crypto" },
                { name: "How It Works", href: "/product/earn-extra-money" },
                { name: "FAQs", href: "/faq" },
            ],
        },
        {
            title: "Invest",
            links: [
                { name: "Start Investing", href: "" },
                { name: "Tokenization Benefits", href: "" },
                { name: "Investment Opportunities", href: "" },
                { name: "Portfolio Dashboard", href: "" },
            ],
        },
        {
            title: "Resources",
            links: [
                { name: "Learn About Tokenization", href: "" },
                { name: "White Papers", href: "" },
                { name: "Case Studies", href: "" },
                { name: "News and Insights", href: "" },
            ],
        },
        {
            title: "Support",
            links: [
                { name: "Contact Us", href: "/support/contact" },
                { name: "Help Center", href: "/support/help-center" },
                { name: "Community Forums", href: "/support/community" },
                { name: "Privacy Policy", href: "/support/privacy-policy" },
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
