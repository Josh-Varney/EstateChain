import React, { useRef } from "react";
import { useSwipeable } from "react-swipeable";

const TrainingDashboard: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => scrollRight(),
        onSwipedRight: () => scrollLeft(),
    });

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const properties = [
        { id: 1, img: "https://via.placeholder.com/500x300" },
        { id: 2, img: "https://via.placeholder.com/500x300" },
        { id: 3, img: "https://via.placeholder.com/500x300" },
        { id: 4, img: "https://via.placeholder.com/500x300" },
        { id: 5, img: "https://via.placeholder.com/500x300" },
    ];

    return (
        <div>
            <div className="space-y-5 justify-center text-center mt-12">
                <div className="w-fit mx-auto rounded-3xl bg-slate-700 px-6 py-2 text-center shadow-md mb-12">
                    <p className="text-xs uppercase tracking-widest text-white font-semibold">Our Marketplace</p>
                </div>
                <div className="w-full px-4">
                    <h1 className="text-4xl text-white md:text-5xl lg:text-5xl justify-center text-balance">
                        Most Popular Tokenised Properties
                    </h1>
                </div>

                <div className="w-3/4 mx-auto px-8">
                    <p className="text-gray-500 justify-center text-sm md:text-sm lg:text-sm mb-8">
                    Discover a handpicked collection of tokenized properties. <br/> Designed for investment opportunities, offering exceptional potential for returns
                    </p>
                </div>
            </div>
            <div>
                <div className="w-screen p-6 flex flex-col items-center">
                    <div className="relative w-full max-w-6xl" {...swipeHandlers}>
                        <div
                            ref={carouselRef}
                            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 scrollbar-hide"
                        >
                            {properties.map((property) => (
                                <div
                                    key={property.id}
                                    className="snap-center flex-shrink-0 w-full sm:w-[60%] md:w-[45%] lg:w-[30%] bg-slate-700 rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={property.img}
                                        alt={`Property ${property.id}`}
                                        className="w-[600px] h-[250px] object-cover mx-auto"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingDashboard;
