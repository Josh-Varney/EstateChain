import React from "react";

const LinksCard: React.FC = () => {
    const links = [
        {
            title: "Product",
            links: [
                { name: "Invest Your Future", href: "/product/invest-your-future" },
                { name: "Find Our Stocks", href: "/product/find-our-stocks" },
                { name: "Find Our Crypto", href: "/product/find-our-crypto" },
                { name: "Earn Extra Money", href: "/product/earn-extra-money" },
                { name: "Bank Smarter", href: "/product/bank-smarter" },
            ],
        },
        {
            title: "Who We Are",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Career", href: "/career" },
                { name: "News and Media", href: "/news-and-media" },
                { name: "Financial Statement", href: "/financial-statement" },
            ],
        },
        {
            title: "Support",
            links: [
                { name: "FAQs", href: "/support/faqs" },
                { name: "Contacts", href: "/support/contacts" },
                { name: "Mobile", href: "/support/mobile" },
                { name: "Windows & Mac", href: "/support/windows-mac" },
                { name: "Desktop Version", href: "/support/desktop-version" },
            ],
        },
        {
            title: "Documentation",
            links: [
                { name: "Public URLs", href: "/docs/public-urls" },
                { name: "Social Rooms", href: "/docs/social-rooms" },
                { name: "User Guide", href: "/docs/user-guide" },
                { name: "Privacy Policy", href: "/docs/privacy-policy" },
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
