import React, { useEffect, useRef } from "react";
import FilterBar from "./FilterBar";
import { FaCrosshairs } from "react-icons/fa";

interface OverlayProps {
  isOpen: boolean;
  closeOverlay: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, closeOverlay }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

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
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 37.7749, lng: -122.4194 }, // Center the map
          zoom: 12,
          mapId: "87d7c47084b9320e",
        });
    
        // Example marker data
        const markersData = [
          { id: 1, lat: 37.7749, lng: -122.4194, title: "San Francisco" },
          { id: 2, lat: 37.7849, lng: -122.4294, title: "Location 2" },
          { id: 3, lat: 37.7649, lng: -122.4094, title: "Location 3" },
        ];
    
        // Create markers
        markersData.forEach((data) => {
          const marker = new window.google.maps.Marker({
            position: { lat: data.lat, lng: data.lng },
            map: map,
            title: data.title, // Tooltip when hovering over the pin
          });
    
          // Add click event listener
          marker.addListener("click", () => {
            console.log(`Pin clicked: ID=${data.id}, Title=${data.title}`);
          });
        });
      } else {
        console.error("Map container (ref) is not available.");
      }
    };
    

    loadGoogleMapsScript();
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-screen bg-white z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Header Section */}
      <div className="flex flex-row w-full justify-between items-center bg-red-400">
        {/* FilterBar */}
        <div className="flex-grow">
          <FilterBar
            darkMode={""}
            filters={{
              propertyMinPrice: "",
              propertyMaxPrice: "",
              propertyLocation: "",
              propertySettlement: "",
              propertyMinBedrooms: "",
              propertyMinBathrooms: "",
              propertyMinTokensLeft: "",
              propertyMaxTokenPrice: "",
              propertyKeywords: [],
              dontShowKeywords: [],
              propertyAdded: "",
              propertyType: "",
              propertyRental: "",
            }}
            onFilterChange={(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
              console.log("Filter change detected:", event.target.value);
            } }    />
        </div>

        {/* Close Button */}
        <button
          className="text-gray-600 hover:text-red-500 focus:outline-none shrink-0 px-6"
          onClick={closeOverlay}
          aria-label="Close Overlay"
        >
          <FaCrosshairs />
        </button>
      </div>

      {/* Google Maps Section */}
      <div className="flex-grow h-full">
        <div
          ref={mapRef}
          className="w-full h-full"
          style={{ minHeight: "300px" }}
        />
      </div>
    </div>
  );
};

export default Overlay;
