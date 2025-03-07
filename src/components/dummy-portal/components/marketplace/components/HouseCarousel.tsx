import React, { useState } from "react";

const HouseCarousel: React.FC = () => {
    const placeholderImages = [
        "https://via.placeholder.com/500x300?text=Placeholder+Image+1",
        "https://via.placeholder.com/500x300?text=Placeholder+Image+2",
        "https://via.placeholder.com/500x300?text=Placeholder+Image+3",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? placeholderImages.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderImages.length);
    };

    return (
        <div className="relative w-full h-full overflow-hidden rounded-lg">
            {/* Images */}
            <div className="relative w-full h-full">
                {placeholderImages.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    />
                ))}
            </div>

            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 z-20"
            >
                &#8592;
            </button>

            {/* Next Button */}
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 z-20"
            >
                &#8594;
            </button>
        </div>
    );
};

export default HouseCarousel;
