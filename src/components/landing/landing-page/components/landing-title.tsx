import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const LandingTitle: React.FC = () => {
    return (
        <div className="flex flex-col space-y-6 justify-center text-center mx-auto max-w-3xl">
            {/* Header Section */}
            <div className="flex flex-row items-center justify-center mt-6 space-x-2 bg-slate-700 text-gray-200 rounded-3xl w-fit mx-auto px-4 py-2 shadow-md">
                <FontAwesomeIcon className='h-3 w-5'icon={faStar} />
                <p className="font-medium text-xs">Trusted Platform</p>
            </div>

            {/* Main Title Section */}
            <div className="w-full px-4">
                <h1 className="text-4xl text-white md:text-5xl lg:text-5xl justify-center text-balance">
                    Revolutionize Your Real Estate <br /> With Secure Blockchain Solutions
                </h1>
            </div>

            {/* Subtitle Section */}
            <div className="w-3/4 mx-auto px-8">
                <p className="text-gray-500 justify-center text-sm md:text-sm lg:text-sm">
                    Experience the future of digital transactions with our state-of-the-art blockchain technology. Our secure,
                    decentralized platform ensures every transaction is transparent, immutable, and protected against fraud.
                </p>
            </div>

            {/* Call-to-Action Section */}
            <div className="w-fit mx-auto px-6 py-4 mt-4">
                <button className="text-black text-sm bg-white rounded-3xl md:text-sm lg:text-sm w-fit mx-auto px-20 py-3">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default LandingTitle;
