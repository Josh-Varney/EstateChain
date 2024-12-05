import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Features: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in ms
            easing: "ease-in-out", // Easing style for the animations
            offset: 50, // Offset for triggering animations
        });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center text-center max-w-3xl mx-auto space-y-10">
            {/* Our Features - Circular Card */}
            <div
                className="w-fit mx-auto rounded-3xl bg-slate-700 px-6 py-2 text-center shadow-md"
                data-aos="fade-down"
            >
                <p className="text-xs uppercase tracking-widest text-white font-semibold">Our Features</p>
            </div>

            {/* Heading Section */}
            <div className="space-y-5" data-aos="fade-up">
                <div className="w-full px-4">
                    <h1 className="text-4xl text-white md:text-5xl lg:text-5xl justify-center text-balance">
                        Innovative Features of EquiSpace
                    </h1>
                </div>

                <div className="w-3/4 mx-auto px-8">
                    <p className="text-gray-500 justify-center text-sm md:text-sm lg:text-sm mb-2">
                        Our platform combines advanced security, real-time analytics, and user-friendly design to provide an unparalleled trading experience.
                    </p>
                </div>
            </div>

            {/* Analytics Cards Section */}
            <div
                className="w-screen pl-20 pr-20 text-center justify-center"
                data-aos="fade-up"
                data-aos-delay="300"
            >
                <div className="grid grid-cols-12 grid-rows-8 gap-4 mt-4 h-screen">
                    {/* Enlarged cards */}
                    <div
                        className="bg-gray-700 rounded-lg shadow-md col-span-7 row-span-5"
                        data-aos="zoom-in"
                        data-aos-delay="400"
                    ></div>
                    <div
                        className="bg-gray-700 rounded-lg shadow-md col-span-5 row-span-5"
                        data-aos="zoom-in"
                        data-aos-delay="600"
                    ></div>
                    <div
                        className="bg-gray-700 rounded-lg shadow-md col-span-6 row-span-5"
                        data-aos="zoom-in"
                        data-aos-delay="800"
                    ></div>
                    <div
                        className="bg-gray-700 rounded-lg shadow-md col-span-6 row-span-5"
                        data-aos="zoom-in"
                        data-aos-delay="1000"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Features;
