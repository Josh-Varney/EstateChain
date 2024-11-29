import React from "react";

const LandingSubscription: React.FC = () => {
    return (
        <div className="w-full px-4 sm:px-8 lg:px-12 overflow-x-hidden">
            {/* Main Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Card 1 */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col col-span-12 md:col-span-5">
                    {/* Logo */}
                    <div>
                        <p className="text-white font-extrabold text-2xl">Logo</p>
                    </div>
                    {/* Title */}
                    <div className="mt-6">
                        <h1 className="text-2xl font-extrabold text-white leading-snug">
                            Stay Ahead with Webtrix Insights
                        </h1>
                    </div>
                    {/* Description */}
                    <div>
                        <p className="text-gray-400 text-sm mt-4">
                            Be the first to know about new features, upcoming events, and
                            everything happening in the world of Webtrix.
                        </p>
                    </div>
                    {/* Input & Button */}
                    <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center rounded-md border border-gray-600 bg-gray-700 overflow-hidden">
                        <input
                            type="email"
                            id="entry"
                            placeholder="Enter your email address"
                            className="flex-grow px-4 py-3 text-sm bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            aria-label="Email Address"
                        />
                        <button
                            className="px-6 py-3 bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 md:flex-nowrap col-span-12 md:col-span-7">
                    {/* Column 1 */}
                    <div>
                        <p className="font-bold text-white mb-4">Product</p>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li className="hover:text-white transition">Invest Your Future</li>
                            <li className="hover:text-white transition">Find Our Stocks</li>
                            <li className="hover:text-white transition">Find Our Crypto</li>
                            <li className="hover:text-white transition">Earn Extra Money</li>
                            <li className="hover:text-white transition">Bank Smarter</li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <p className="font-bold text-white mb-4">Who We Are</p>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li className="hover:text-white transition">About Us</li>
                            <li className="hover:text-white transition">Career</li>
                            <li className="hover:text-white transition">News and Media</li>
                            <li className="hover:text-white transition">Financial Statement</li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <p className="font-bold text-white mb-4">Support</p>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li className="hover:text-white transition">FAQs</li>
                            <li className="hover:text-white transition">Contacts</li>
                            <li className="hover:text-white transition">Mobile</li>
                            <li className="hover:text-white transition">Windows & Mac</li>
                            <li className="hover:text-white transition">Desktop Version</li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <p className="font-bold text-white mb-4">Documentation</p>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li className="hover:text-white transition">Public URLs</li>
                            <li className="hover:text-white transition">Social Rooms</li>
                            <li className="hover:text-white transition">User Guide</li>
                            <li className="hover:text-white transition">Privacy Policy</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6 mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-sm text-gray-400">
                <p className="text-center sm:text-left">© 2024 Webtrix. All Rights Reserved.</p>
                <div className="flex space-x-4">
                    <img
                        src="/assets/icons8-twitter.svg"
                        alt="Twitter Icon"
                        className="w-6 h-6 hover:opacity-80 transition"
                    />
                    <img
                        src="/assets/icons8-gmail-30.svg"
                        alt="Gmail Icon"
                        className="w-6 h-6 hover:opacity-80 transition"
                    />
                    <img
                        src="/assets/icons8-facebook-32.svg"
                        alt="Facebook Icon"
                        className="w-6 h-6 hover:opacity-80 transition"
                    />
                    <img
                        src="/assets/icons8-instagram-32.svg"
                        alt="Instagram Icon"
                        className="w-6 h-6 hover:opacity-80 transition"
                    />
                </div>
                <div className="flex space-x-4">
                    <a href="/privacy-policy" className="hover:text-teal-500 transition">
                        Privacy Policy
                    </a>
                    <a href="/terms-of-service" className="hover:text-teal-500 transition">
                        Terms of Service
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LandingSubscription;
