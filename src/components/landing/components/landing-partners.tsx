import React from "react";

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
                <div className="grid grid-cols-6 gap-2">
                    {/* Example cards */}
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-slate-400 text-purple-600 rounded-lg pl-10 pr-10 pb-6 pt-6 flex items-center justify-center"
                        >
                            <p className="">Card {index + 1}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnerCards;
