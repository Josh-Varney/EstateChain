import React, { useEffect, useRef } from "react";
import { FaLuggageCart } from "react-icons/fa";

const PropertyMapDisplayContainer = ({ title, latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const scriptId = "google-maps-script";

      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=marker&v=weekly`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          if (window.google && window.google.maps) {
            initializeMap();
          } else {
            console.error("Google Maps script loaded but Google object is unavailable.");
          }
        };

        script.onerror = () => {
          console.error("Failed to load the Google Maps script.");
        };

        document.body.appendChild(script);
      } else if (window.google && window.google.maps) {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current) {
        const position = { lat: latitude, lng: longitude };

        const map = new window.google.maps.Map(mapRef.current, {
          center: position,
          zoom: 15,
          mapId: "87d7c47084b9320e", 
        });

        new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position,
          title: "Property Location",
        });
      } else {
        console.error("Map container (ref) is not available.");
      }
    };

    loadGoogleMapsScript();
  }, [latitude, longitude]);

  return (
    <div className="mb-4 border rounded-md shadow-md">
      <button className="w-full px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
        <div className="flex flex-row items-center space-x-2">
          <FaLuggageCart />
          <span>{title}</span>
        </div>
      </button>
      <div>
        <div
          ref={mapRef}
          style={{ height: "400px", width: "100%" }}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default PropertyMapDisplayContainer;
