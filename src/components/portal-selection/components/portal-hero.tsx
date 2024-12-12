import React from "react";

interface PortalHeroProps {
    title?: string;
    description?: string;
}

const PortalHero: React.FC<PortalHeroProps> = ({
    title = "Choose Your System",
    description = "Select the Real System to tokenize live real estate assets securely, or choose the Simulation System to explore features and run test scenarios with ease.",
}) => {
    return (
        <section
            className="text-center px-4 py-8 sm:py-8 md:py-8 lg:py-8"
            aria-label="System Selection Hero"
        >
            <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 animate-fade-in"
            >
                {title}
            </h1>
            <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
            >
                {description.split(" ").map((word, index) =>
                    word === "Real System" ? (
                        <span key={index} className="font-semibold text-green-400">
                            {word}
                        </span>
                    ) : word === "Simulation System" ? (
                        <span key={index} className="font-semibold text-blue-400">
                            {word}
                        </span>
                    ) : (
                        <span key={index}>{word} </span>
                    )
                )}
            </p>
        </section>
    );
};

export default PortalHero;
