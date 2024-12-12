import React from "react";

const SimulationSection: React.FC = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800">Simulation Mode</h2>
            <p className="mt-2 text-sm">
                In the simulation mode, you can explore the process of tokenizing real estate assets in a controlled environment. This mode is designed for testing and understanding the steps involved in:
            </p>
            <ul className="mt-4 list-disc list-inside text-sm space-y-2">
                <li>Identifying suitable real estate assets for tokenization.</li>
                <li>Creating a digital representation of the asset on the blockchain.</li>
                <li>Breaking the asset into smaller tokenized units.</li>
                <li>Simulating the trading of these tokens on a secure platform.</li>
                <li>Understanding compliance and regulatory requirements in a safe sandbox.</li>
            </ul>
            <p className="mt-4 text-sm">
                This simulation helps you visualize how tokenization can democratize real estate investment by enabling fractional ownership, increasing liquidity, and reducing transaction costs.
            </p>
        </div>
    );
};

export default SimulationSection;
