import React from "react";

const LandingSubscription: React.FC = () => {
    return (
        <div className="w-full px-4 sm:px-8 lg:px-12 overflow-hidden">
            {/* Main Container */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Subscription Card */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col col-span-12 md:col-span-5">
                    <div>
                        <p className="text-white font-extrabold text-2xl">Logo</p>
                    </div>
                    <div className="mt-6">
                        <h1 className="text-2xl sm:text-3xl font-sem text-white leading-snug">
                            Stay Ahead with Webtrix Insights
                        </h1>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm mt-4">
                            Be the first to know about new features, upcoming events, and everything happening in the world of Webtrix.
                        </p>
                    </div>
                    {/* Input & Button Form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const email = (document.getElementById("entry") as HTMLInputElement).value;
                            if (email) {
                                alert(`Subscribed with email: ${email}`);
                                // Add email subscription logic here
                            } else {
                                alert("Please enter a valid email.");
                            }
                        }}
                        className="mt-6"
                    >
                 {/* Input & Button */}
                        <div className="mt-6 flex flex-row items-stretch rounded-md overflow-hidden border border-gray-600 bg-gray-700">
                            <input
                                type="email"
                                id="entry"
                                placeholder="Enter your email address"
                                className="flex-grow px-4 py-3 text-sm bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                aria-label="Email Address"
                            />
                            <button
                                type="submit"
                                className="flex-shrink-0 px-6 py-3 bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:outline-none transition whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>

                {/* Links Card */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 col-span-12 md:col-span-7">
                    {[
                        {
                            title: "Product",
                            links: [
                                "Invest Your Future",
                                "Find Our Stocks",
                                "Find Our Crypto",
                                "Earn Extra Money",
                                "Bank Smarter",
                            ],
                        },
                        {
                            title: "Who We Are",
                            links: [
                                "About Us",
                                "Career",
                                "News and Media",
                                "Financial Statement",
                            ],
                        },
                        {
                            title: "Support",
                            links: [
                                "FAQs",
                                "Contacts",
                                "Mobile",
                                "Windows & Mac",
                                "Desktop Version",
                            ],
                        },
                        {
                            title: "Documentation",
                            links: [
                                "Public URLs",
                                "Social Rooms",
                                "User Guide",
                                "Privacy Policy",
                            ],
                        },
                    ].map((section, index) => (
                        <div key={index}>
                            <p className=" text-white mb-4">{section.title}</p>
                            <ul className="text-gray-400 space-y-2 text-sm">
                                {section.links.map((link, idx) => (
                                    <li
                                        key={idx}
                                        className="hover:text-white transition"
                                    >
                                        {link}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 space-y-4 sm:space-y-0">
                <p className="text-center sm:text-left">
                    © 2024 Webtrix. All Rights Reserved.
                </p>
                <div className="flex space-x-4">
                    {[
                        { src: "/assets/icons8-twitter.svg", alt: "Twitter Icon" },
                        { src: "/assets/icons8-gmail-30.svg", alt: "Gmail Icon" },
                        { src: "/assets/icons8-facebook-32.svg", alt: "Facebook Icon" },
                        { src: "/assets/icons8-instagram-32.svg", alt: "Instagram Icon" },
                    ].map((icon, idx) => (
                        <img
                            key={idx}
                            src={icon.src}
                            alt={icon.alt}
                            className="w-6 h-6 hover:opacity-80 transition"
                        />
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <a
                        href="/privacy-policy"
                        className="hover:text-teal-500 transition"
                    >
                        Privacy Policy
                    </a>
                    {/* <div className="h-full border-l border-gray-400"></div> Vertical Line */}
                    <a
                        href="/terms-of-service"
                        className="hover:text-teal-500 transition"
                    >
                        Terms of Service
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LandingSubscription;
