import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../../shadcn-components/ui/carousel";

const HouseCarousel: React.FC = () => {
  const placeholderImages = [
    "https://via.placeholder.com/300x200?text=House+Image+1",
    "https://via.placeholder.com/300x200?text=House+Image+2",
    "https://via.placeholder.com/300x200?text=House+Image+3",
    "https://via.placeholder.com/300x200?text=House+Image+4",
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
    <div className="relative w-full max-w-lg mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {placeholderImages.map((src, index) => (
            <CarouselItem
              key={index}
              className={`w-full flex-shrink-0 ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <img
                src={src}
                alt={`House Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          onClick={handlePrevious}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
        >
          &#8594;
        </button>
      </Carousel>
    </div>
  );
};

export default HouseCarousel;
