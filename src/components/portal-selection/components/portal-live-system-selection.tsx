import React from "react";

const LiveSystemSection: React.FC = () => {
    return (
        <div className="bg-gray-800 p-6">
            <h2 className="text-2xl font-bold text-blue-400">Unlock Real Estate with Live Tokenization</h2>
            <p className="mt-4 text-gray-300 text-sm">
                Welcome to the Live System—a groundbreaking platform where innovation meets real estate. With tokenization, we empower property owners and investors to reshape the future of asset management and trading. Here’s what makes the Live System exceptional:
            </p>
            <ul className="mt-6 list-disc list-inside text-gray-200 text-sm space-y-3">
                <li>
                    <strong>Blockchain Integration:</strong> Securely register real estate assets on an immutable, decentralized ledger.
                </li>
                <li>
                    <strong>Token Generation:</strong> Create unique digital tokens that represent ownership shares in your properties.
                </li>
                <li>
                    <strong>Compliance First:</strong> Simplified KYC and AML checks to meet global regulatory standards.
                </li>
                <li>
                    <strong>Decentralized Trading:</strong> Enable secure, frictionless trading of tokens on a global marketplace.
                </li>
                <li>
                    <strong>Real-Time Insights:</strong> Track ownership, market value, and performance metrics in one place.
                </li>
            </ul>
            <p className="mt-6 text-gray-300 text-sm">
                The Live System bridges the gap between traditional real estate and the digital economy. By tokenizing your assets, you open the doors to a global investor base, enhance liquidity, and ensure unparalleled transparency. Let’s build a future where ownership is accessible, seamless, and innovative.
            </p>
            <div className="mt-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default LiveSystemSection;
