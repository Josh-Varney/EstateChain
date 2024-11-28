import React from "react";

const LandingSubscription: React.FC = () => {
    return (
        <div className="w-full px-6 sm:px-10 overflow-x-hidden">
            {/* Main Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Card 1 */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col col-span-12 md:col-span-5">
                    {/* Logo */}
                    <div>
                        <p className="text-white font-bold text-xl">Logo</p>
                    </div>
                    {/* Title */}
                    <div className="mt-8">
                        <h1 className="text-xl font-bold text-white leading-tight">
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
                    <div className="flex items-center mt-6 rounded-full border border-gray-600 bg-gray-700 overflow-hidden">
                        <input
                            type="email"
                            id="entry"
                            placeholder="Enter Email Address"
                            className="flex-grow px-4 py-3 text-sm bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Email Address"
                        />
                        <button
                            className="px-4 py-3 bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 focus:ring-blue-500 rounded-full"
                        >
                            Submit
                        </button>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-wrap md:flex-nowrap col-span-12 md:col-span-7 justify-between overflow-hidden">
                    {/* Column 1 */}
                    <div className="flex flex-col mb-6 md:mb-0">
                        <p className="font-bold text-white mb-4">Product</p>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li>Invest Your Future</li>
                            <li>Find Our Stocks</li>
                            <li>Find Our Crypto</li>
                            <li>Earn Extra Money</li>
                            <li>Bank Smarter</li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col mb-6 md:mb-0">
                        <p className="font-bold text-white mb-4">Who We Are</p>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li>About Us</li>
                            <li>Career</li>
                            <li>News and Media</li>
                            <li>Financial Statement</li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col mb-6 md:mb-0">
                        <p className="font-bold text-white mb-4">Support</p>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li>FAQs</li>
                            <li>Contacts</li>
                            <li>Mobile</li>
                            <li>Windows & Mac</li>
                            <li>Desktop Version</li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div className="flex flex-col">
                        <p className="font-bold text-white mb-4">Documentation</p>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li>Public URLs</li>
                            <li>Social Rooms</li>
                            <li>User Guide</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 rounded-lg shadow-md p-4 mt-6 mb-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-sm text-gray-400">
                <p>© 2024 Webtrix. All Rights Reserved.</p>
                <div className="flex space-x-4">
                    <img src={"/assets/icons8-twitter.svg"} alt="Twitter Icon" className="w-6 h-6" />
                    <img src={"/assets/icons8-gmail-30.svg"} alt="Gmail Icon" className="w-6 h-6" />
                    <img src={"/assets/icons8-facebook-32.svg"} alt="Facebook Icon" className="w-6 h-6" />
                    <img src={"/assets/icons8-instagram-32.svg"} alt="Instagram Icon" className="w-6 h-6" />
                </div>
                <div className="flex space-x-4">
                    <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
                    <a href="/terms-of-service" className="hover:text-white">Terms of Service</a>
                </div>
            </div>
        </div>
    );
};

export default LandingSubscription;
