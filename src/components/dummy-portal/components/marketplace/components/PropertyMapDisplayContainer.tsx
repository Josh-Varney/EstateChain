import React, { useEffect, useRef, useState } from "react";
import { FaLuggageCart } from "react-icons/fa";

interface PropertyMapDisplayContainerProps {
  title: string;
  latitude: number;
  longitude: number;
}

const PropertyMapDisplayContainer: React.FC<PropertyMapDisplayContainerProps> = ({
  title,
  latitude,
  longitude,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null); // Change the type to google.maps.Marker

  useEffect(() => {
    // Log the props to verify they're being passed correctly
    console.log("Latitude:", latitude, "Longitude:", longitude);

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
        // Ensure latitude and longitude are valid
        if (latitude && longitude) {
          const position = { lat: latitude, lng: longitude };

          if (map) {
            // Re-center the map if it already exists
            map.setCenter(position);
            if (markerRef.current) {
              markerRef.current.setPosition(position); // Now using setPosition on google.maps.Marker
            }
          } else {
            // Create a new map instance if one doesn't exist
            const newMap = new window.google.maps.Map(mapRef.current, {
              center: position,
              zoom: 15,
              mapId: "87d7c47084b9320e",
            });

            // Create and set marker using google.maps.Marker
            markerRef.current = new window.google.maps.Marker({
              map: newMap,
              position,
              title: "Property Location",
            });

            setMap(newMap);  // Save map instance to state
          }
        } else {
          console.error("Invalid latitude or longitude");
        }
      } else {
        console.error("Map container (ref) is not available.");
      }
    };

    loadGoogleMapsScript();

    // Cleanup function to remove the map when the component is unmounted
    return () => {
      if (map) {
        setMap(null); // Nullify the map to allow for cleanup
      }
    };
  }, [latitude, longitude, map]);  // Watch for changes to latitude, longitude, or map instance

  return (
    <div className="mb-4 shadow-md rounded-t-full">
      <button className="w-full px-4 py-3 text-left bg-gray-700 rounded-t-md hover:bg-gray-600 text-lg font-semibold text-white transition">
        <div className="flex flex-row items-center space-x-2">
          <FaLuggageCart />
          <span>{title}</span>
        </div>
      </button>
      <div>
        <div
          ref={mapRef}
          style={{ height: "400px", width: "100%" }}
          className="rounded-b-md"
        />
      </div>
    </div>
  );
};

export default PropertyMapDisplayContainer;
