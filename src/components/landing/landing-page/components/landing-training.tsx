import * as React from "react";
import { Card, CardContent } from "../../../../shadcn-components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../shadcn-components/ui/carousel";

const TrainingDashboard: React.FC = () => {
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
          <p className="text-xs uppercase tracking-widest text-white font-semibold">
            Our Marketplace
          </p>
        </div>
        <div className="w-full px-4">
          <h1 className="text-4xl text-white md:text-5xl lg:text-5xl justify-center text-balance">
            Most Popular Tokenised Properties
          </h1>
        </div>

        <div className="w-3/4 mx-auto px-8">
          <p className="text-gray-500 justify-center text-sm md:text-sm lg:text-sm mb-8">
            Discover a handpicked collection of tokenized properties. <br />
            Designed for investment opportunities, offering exceptional potential for returns
          </p>
        </div>
      </div>
      <div>
        <div className="w-screen p-6 flex flex-col items-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-6xl"
          >
            <CarouselContent>
              {properties.map((property) => (
                <CarouselItem
                  key={property.id}
                  className="snap-center flex-shrink-0 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={property.img}
                          alt={`Property ${property.id}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TrainingDashboard;
