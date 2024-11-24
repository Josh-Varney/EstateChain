import React from "react"
import { FaStar } from "react-icons/fa";

const LandingTitle: React.FC = () => {
    return(
        <div className="flex flex-col space-y-6 justify-center text-center mx-auto max-w-3xl">
            {/* Header Section */}
            <div className="flex flex-row mt-6 text-center justify-center space-x-2 text-sm bg-blue-500 text-white rounded-3xl md:text-sm lg:text-sm w-fit mx-auto px-2 py-1">
                <FaStar />
                <p>
                    Trusted Platform
                </p>
            </div>

            {/* Main Title Section */}
            <div className="w-full px-4">
                <h1 className="text-3xl text-white md:text-5xl lg:text-5xl justify-center text-balance">
                    Revolutionize Your Real Estate <br /> With Secure Blockchain Solutions
                </h1>
            </div>

            {/* Subtitle Section */}
            <div className="w-3/4 mx-auto px-4">
                <p className="text-gray-500 justify-center text-sm md:text-sm lg:text-sm text-balance">
                    Experience the future of digital transactions with our state-of-the-art blockchain technology. 
                    Our secure, decentralized platform ensures every transaction is transparent, immutable, and protected against fraud.
                </p>
            </div>

            {/* Call-to-Action Section */}
            <div className="w-fit mx-auto px-6 py-2 mt-4">
                <p className="text-white text-sm bg-blue-500 rounded-3xl md:text-sm lg:text-sm w-fit mx-auto px-2 py-1">
                    Get Started
                </p>
            </div>
        </div>
    );
}
export default LandingTitle;