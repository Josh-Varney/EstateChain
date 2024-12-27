import React from "react";
import HouseCard from "./HouseCard";

const HouseList = ({ houses }) => {
    return (
        <div className="space-y-6">
            {houses.length > 0 ? (
                houses.map((house) => <HouseCard key={house.id} house={house} />)
            ) : (
                <p>No houses match the filters.</p>
            )}
        </div>
    );
};

export default HouseList;
