import React from "react";
import Card from "./HomeCard";

interface CardGridProps {
  darkMode: boolean;
}

const CardGrid: React.FC<CardGridProps> = ({ darkMode }) => {
  return (
    // Main Content Area
    <div
      className={`flex w-full h-full p-6 ${
        darkMode ? "bg-gray-800" : "bg-gray-200"
      } overflow-auto`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 lg:grid-rows-5 gap-8 w-full">
        {/* Large Cards */}
        <Card
          title="Large Card 1"
          description="This is a large card."
          darkMode={darkMode}
          className="row-span-3 col-span-2"
        />
        <Card
          title="Current Simulation"
          description="Simulation Type: Buyer"
          darkMode={darkMode}
          className="row-span-2 col-span-2"
        />
        <Card
          title="Large Card 2"
          description="This is another large card."
          darkMode={darkMode}
          className="row-span-2 col-span-2"
        />
        {/* Small Card */}
        <Card
          title="Small Card 3"
          description="This is a small card."
          darkMode={darkMode}
          className="row-span-2 col-span-2"
        />
        {/* Tall Large Card */}
        <Card
          title="Large Card 3"
          description="This is a tall large card."
          darkMode={darkMode}
          className="col-span-2 row-span-1"
        />
      </div>
    </div>
  );
};

export default CardGrid;