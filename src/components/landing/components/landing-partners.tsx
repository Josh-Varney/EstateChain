import React from "react";

const svgCards = [
    { id: 1, label: "Card 1", path: "/assets/metamask.svg" },
    { id: 2, label: "Card 2", path: "/assets/binance.svg" },
    { id: 3, label: "Card 3", path: "/assets/ethereum.svg" },
    { id: 4, label: "Card 4", path: "/assets/stellar-xlm-logo-full.svg" },
    { id: 5, label: "Card 5", path: "/assets/vechain-vet-logo.svg" },
    { id: 6, label: "Card 6", path: "/assets/coinbase.svg" },
];

const PartnerCards: React.FC = () => {
    return (
        <div className="p-6 space-y-8">
            {/* Header Section */}
            <div className="w-fit mx-auto rounded-3xl bg-slate-700 px-6 py-2 text-center shadow-md">
                <p className="text-white text-xs">Our Partners</p>
            </div>


            {/* Tagline Section */}
            <div className="text-white text-center">
                <p className="text-xl">
                    Leading the Way in Crypto Trust with Webtrix
                </p>
            </div>

            {/* Carousel Section */}
            <div className="rounded-lg shadow-md text-center text-white">
                <div className="grid grid-cols-6 gap-4">
                    {svgCards.map((card) => (
                        <div
                            key={card.id}
                            className="bg-slate-700 opacity-75 text-purple-600 rounded-lg p-6 flex flex-col items-center justify-center space-y-2"
                        >
                            {/* SVG Icon */}
                            <div className="w-22 h-12">
                                <img src={card.path} alt={`SVG for ${card.label}`} className="w-full h-full" />
                            </div>
                            {/* Card Label */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnerCards;
