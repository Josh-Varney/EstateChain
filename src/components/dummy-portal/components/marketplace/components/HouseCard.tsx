import React from "react";

const HouseCard = ({ house }) => {
    return (
        <div className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">{house.name}</h3>
            <p><strong>Price:</strong> ${house.price.toLocaleString()}</p>
            <p><strong>Location:</strong> {house.location}</p>
            <p><strong>Size:</strong> {house.size}</p>
            <p><strong>Bathrooms:</strong> {house.bathrooms}</p> {/* Fixed missing closing tag */}
            <p><strong>Token Price:</strong> ${house.tokenPrice}</p>
            <p><strong>Tokens Left:</strong> {house.tokensLeft}</p>
            <p><strong>Type:</strong> {house.type}</p>
            <p><strong>Rental:</strong> {house.rental ? "Yes" : "No"}</p>
        </div>
    );
};

export default HouseCard;
