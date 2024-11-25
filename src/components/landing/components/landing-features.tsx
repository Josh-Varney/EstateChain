import React from "react";

const Features: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center max-w-3xl mx-auto space-y-10">
            {/* Our Features - Circular Card */}
            <div className="w-fit mx-auto rounded-3xl bg-slate-700 px-6 py-2 text-center shadow-md">
                <p className="text-white text-xs">Our Features</p>
            </div>
            {/* Heading Section */}
            <div className="space-y-5">
                <div className="w-full px-4">
                    <h1 className="text-4xl text-white md:text-5xl lg:text-5xl justify-center text-balance">
                        Innovative Features of Webtrix
                    </h1>
                </div>

                <div className="w-3/4 mx-auto px-8">
                    <p className="text-gray-500 justify-center text-xs md:text-xs lg:text-xs">
                        Our platform combines advanced security, real-time analytics, and user friendly design to provide an unparallel trading experience.
                    </p>
                </div>
            </div>

            {/* Analytics Cards Section */}
            <div className="w-screen pl-20 pr-20 text-center justify-center">
                <div className="grid grid-cols-12 grid-rows-8 gap-4 mt-4 h-screen">
                    {/* Enlarged cards */}
                    <div className="bg-gray-700 rounded-lg shadow-md col-span-7 row-span-5">
                        <p className="text-white text-center text-xl">Card 1</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg shadow-md col-span-5 row-span-5">
                        <p className="text-white text-center text-xl">Card 2</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg shadow-md col-span-6 row-span-5">
                        <p className="text-white text-center text-xl">Card 3</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg shadow-md col-span-6 row-span-5">
                        <p className="text-white text-center text-xl">Card 4</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
