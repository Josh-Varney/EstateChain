import React from "react";

const PortalHero: React.FC = () => {
    return (
        <>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-center leading-tight">
                Choose Your System
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 text-center max-w-2xl leading-relaxed">
                Select the <span className="font-semibold text-green-400">Real System</span> to tokenize live real estate assets securely, or choose the <span className="font-semibold text-blue-400">Simulation System</span> to explore features and run test scenarios with ease.
            </p>
        </>
    );
};

export default PortalHero;
