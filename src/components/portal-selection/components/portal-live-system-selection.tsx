import React from "react";

const LiveSystemSection: React.FC = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800">Live System</h2>
            <p className="mt-2 text-sm">
                Welcome to the live system. Here, you can tokenize real estate assets in real-time and make them available to investors. Key features of the live system include:
            </p>
            <ul className="mt-4 list-disc list-inside text-sm space-y-2">
                <li>Securely registering your real estate assets on the blockchain.</li>
                <li>Generating and issuing tokens that represent ownership stakes in the asset.</li>
                <li>Ensuring regulatory compliance, including KYC (Know Your Customer) and AML (Anti-Money Laundering) checks.</li>
                <li>Facilitating token trading on a decentralized marketplace.</li>
                <li>Providing real-time tracking of ownership and value changes.</li>
            </ul>
            <p className="mt-4 text-sm">
                By using the live system, you can unlock the potential of your real estate assets by making them accessible to a global network of investors. Tokenization transforms how assets are managed, traded, and owned, ensuring transparency and efficiency.
            </p>
        </div>
    );
};

export default LiveSystemSection;
