import React, { useState, useEffect } from "react";
import LandingHeader from "../../components/header/header";
import LandingSubscription from "../../components/footer/footer";
import PortfolioOverview from "./components/portfolio";
import AssetManagement from "./components/asset-management";
import WhyChooseUs from "./components/why-choose-us";
import AOS from "aos";
import "aos/dist/aos.css";

const TokenInformation = () => {
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true,     // Whether animation should happen only once
        });
    }, []);

    const renderContent = () => {
        if (activeTab === "overview") return <PortfolioOverview />;
        if (activeTab === "management") return <AssetManagement />;
    };

    return (
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 min-h-screen">
            <LandingHeader />
            <div className="container mx-auto py-6 px-6">
                {/* Hero Section */}
                <div className="flex flex-row items-center justify-center mt-8 mb-6 space-x-2 bg-gray-700 text-gray-200 rounded-3xl w-fit mx-auto px-4 py-2 shadow-md">
                    <p className="text-xs uppercase tracking-widest font-semibold">Our Benefits</p>
                </div>
                <div className="text-center mb-12" data-aos="fade-down">
                    <h1 className="text-4xl text-white md:text-5xl lg:text-5xl justify-center text-balance mb-6">
                        Empower Your Tokenized Real Estate Portfolio
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Our platform provides the tools and insights you need to take control, grow, and optimize your investments in tokenized real estate.
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-gray-800 shadow-xl rounded-2xl p-10" data-aos="fade-up">
                    <div className="flex border-b border-gray-700 mb-8">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`flex-1 text-center py-4 font-medium transition-all focus:outline-none ${
                                activeTab === "overview"
                                    ? "text-teal-500 border-b-4 border-teal-500"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Portfolio Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("management")}
                            className={`flex-1 text-center py-4 font-medium transition-all focus:outline-none ${
                                activeTab === "management"
                                    ? "text-teal-500 border-b-4 border-teal-500"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Asset Management
                        </button>
                    </div>
                    {renderContent()}
                </div>

                {/* Why Choose Us */}
                <WhyChooseUs />
            </div>

            {/* Divider */}
            <hr
                className="border-gray-600 mb-8"
                data-aos="scale-up"
                data-aos-duration="500"
            />
            
            <div className="pb-8">
                <LandingSubscription />
            </div>
        </div>
    );
};

export default TokenInformation;
