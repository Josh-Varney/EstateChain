import React, { useEffect, useRef } from "react";
import { FaLuggageCart } from "react-icons/fa";

const PropertyMapDisplayContainer = ({ title, latitude, longitude }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Initialize the map
//     if (mapRef.current) {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat: latitude, lng: longitude },
//         zoom: 15,
//       });

//       // Add a marker
//       new window.google.maps.Marker({
//         position: { lat: latitude, lng: longitude },
//         map,
//         title: "Property Location",
//       });
//     }
//   }, [latitude, longitude]);

  return (
    <div className="mb-4 border rounded-md shadow-md">
      {/* Card Header */}
      <button
        className="w-full px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <div className="flex flex-row items-center space-x-2">
          <FaLuggageCart />
          <span>{title}</span>
        </div>
      </button>

      {/* Card Content */}
      {/* <div>
        <div ref={mapRef} style={{ height: "300px", width: "100%" }} />
      </div> */}
    </div>
  );
};

export default PropertyMapDisplayContainer;
