import React from "react";

const Features:React.FC = () => {
    return (
        <div className="flex flex-col justify-center text-center bg-pink-500 mx-auto max-w-3xl">
            <div className="space-y-4 bg-red-400">
                <div className="">
                    <p>Our Features</p>
                </div>
                <div>
                    <h1> Innovative Features of Webtrix</h1>
                </div>
            </div>
            <div className="mt-14 bg-red-400">
                <h3 className="text-wrap">
                    Our platform comvines advanced security, real-time analywtics and user-fiendly design to provide an unparelleled trading experience.
                </h3>
            </div>
            <div className="mt-16">
                <p> Four Grid Analytics Cards</p>
            </div>
        </div>
    );
}

export default Features;