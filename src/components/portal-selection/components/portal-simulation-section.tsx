import React from "react";

const SimulationSection: React.FC = () => {
    return (
        <div className=" p-6">
            <h2 className="text-2xl font-bold text-green-400">Experience Tokenization with Simulation Mode</h2>
            <p className="mt-4 text-gray-300 text-sm">
                Welcome to Simulation Mode—a safe and interactive environment to explore the transformative process of real estate tokenization. Whether you’re new to blockchain or looking to refine your strategies, this mode offers a hands-on experience to:
            </p>
            <ul className="mt-6 list-disc list-inside text-gray-200 text-sm space-y-3">
                <li>
                    <strong>Discover Opportunities:</strong> Identify real estate assets ideal for tokenization and explore their potential.
                </li>
                <li>
                    <strong>Digital Asset Creation:</strong> Learn how to map physical properties onto the blockchain as secure digital assets.
                </li>
                <li>
                    <strong>Tokenization Process:</strong> Break properties into fractional, tradable digital tokens.
                </li>
                <li>
                    <strong>Simulated Trading:</strong> Practice buying, selling, and trading tokens in a secure, controlled marketplace.
                </li>
                <li>
                    <strong>Regulatory Insights:</strong> Navigate KYC, AML, and other compliance steps in a risk-free sandbox.
                </li>
            </ul>
            <p className="mt-6 text-gray-300 text-sm">
                Simulation Mode bridges the gap between theory and practice, enabling you to understand how tokenization makes real estate investment accessible, liquid, and efficient. Dive in and see the future of property ownership unfold before your eyes!
            </p>
            <div className="mt-6">
                <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all"
                        onClick={() => window.location.href = "/simulation"}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default SimulationSection;
