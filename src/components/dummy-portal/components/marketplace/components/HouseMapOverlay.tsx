import React, { useEffect, useRef } from "react";
import FilterBar from "./FilterBar";

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
        const position = { lat: 37.7749, lng: -122.4194 }; // Example: San Francisco

        const map = new window.google.maps.Map(mapRef.current, {
          center: position,
          zoom: 12,
          mapId: "87d7c47084b9320e",
        });

        new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position,
          title: "Overlay Map Location",
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
            }}
          />
        </div>

        {/* Close Button */}
        <button
          className="text-gray-600 hover:text-red-500 focus:outline-none shrink-0 px-6"
          onClick={closeOverlay}
          aria-label="Close Overlay"
        >
          Close
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
