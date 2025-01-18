import React, { useEffect, useRef } from "react";
import FilterBar from "./FilterBar";

interface FilterType {
  propertyMinPrice: string;
  propertyMaxPrice: string;
  propertyLocation: string;
  propertySettlement: string;
  propertyKeywords: string[];
  dontShowKeywords: string[];
  propertyMinBedrooms: string;
  propertyMaxBedrooms: string;
  propertyMinBathrooms: string;
  propertyMaxBathrooms: string;
  propertyMinTokensLeft: string;
  propertyMaxTokensLeft: string;
  propertyMinTokenPrice: string;
  propertyMaxTokenPrice: string;
  propertyAdded: string;
  propertyType: string;
  propertyRental: string;
  searchLocation: {
    latitude: number;
    longitude: number;
    metric: "miles" | "km";
    distance: number | "Within Country" | "All Locations";
    country_from_search: string;
  } | null;
}

type House = {
  id: number;
  propertyAddress: string;
  propertySettlement: string;
  propertyDescription: string;
  propertyAdded: string;
  propertyAddedBy: string;
  propertyAgent: {
    agentName: string;
    agentIcon: string;
    agentNumber: string;
    agentEmail: string;
  };
  propertyKeywords: string[];
  propertyPrice: number;
  propertyLocation: {
    latitude: number;
    longitude: number;
  };
  propertyCountry: string;
  propertySize: string;
  propertyBedrooms: number;
  propertyBathrooms: number;
  propertyTokenPrice: number;
  propertyTokensLeft: number;
  propertyType: string;
  propertyPostcode: string;
  propertyRental: boolean;
  propertyImage: string;
  propertyFeatured: boolean;
};

type SearchLocation = {
  latitude: number;
  longitude: number;
  metric: "miles" | "km";
  distance: number | "Within Country" | "All Locations";
  country_from_search: string;
};

interface OverlayProps {
  isOpen: boolean;
  closeOverlay: () => void;
  darkMode: boolean;
  filters: FilterType;
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    optionalParam?: string
  ) => void;
  filteredHouses: House[];
  searchLocation: SearchLocation | null;
}

const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  closeOverlay,
  darkMode,
  filters,
  onFilterChange,
  filteredHouses,
  searchLocation,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const circleRef = useRef<google.maps.Circle | null>(null);

  const initializeMap = () => {
    if (mapRef.current) {
      const defaultCenter = { lat: 0, lng: 0 }; // Default center if no searchLocation
      const radius = searchLocation?.distance
        ? typeof searchLocation.distance === "number"
          ? searchLocation.distance
          : 0
        : 0;

      const mapCenter =
        searchLocation && radius > 0
          ? {
              lat: searchLocation.latitude,
              lng: searchLocation.longitude,
            }
          : defaultCenter;

      // Initialize or re-center the map
      if (!mapInstance.current) {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: mapCenter,
          zoom: radius > 0 ? 10 : 2,
          mapId: "87d7c47084b9320e",
        });
      } else {
        mapInstance.current.setCenter(mapCenter);
        mapInstance.current.setZoom(radius > 0 ? 11 : 2);
      }

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      filteredHouses.forEach((house) => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: house.propertyLocation.latitude,
            lng: house.propertyLocation.longitude,
          },
          map: mapInstance.current,
          title: house.propertyAddress,
        });

        marker.addListener("click", () => {
          console.log(
            `House clicked: ID=${house.id}, Address=${house.propertyAddress}`
          );
        });

        markersRef.current.push(marker);
      });

      // Add or update circle for search location
      if (searchLocation && typeof radius === "number") {
        if (!circleRef.current) {
          circleRef.current = new window.google.maps.Circle({
            center: { lat: searchLocation.latitude, lng: searchLocation.longitude },
            radius: radius * (searchLocation.metric === "miles" ? 1609.34 : 1000), // Convert to meters
            map: mapInstance.current,
            fillOpacity: 0, // No fill
            strokeColor: "#8B0000", // Dark red
            strokeOpacity: 1,
            strokeWeight: 2,
          });
        } else {
          circleRef.current.setCenter({
            lat: searchLocation.latitude,
            lng: searchLocation.longitude,
          });
          circleRef.current.setRadius(
            radius * (searchLocation.metric === "miles" ? 1609.34 : 1000)
          );
        }
      } else if (circleRef.current) {
        circleRef.current.setMap(null); // Remove circle if no search location
        circleRef.current = null;
      }
    }
  };

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
            console.error(
              "Google Maps script loaded but Google object is unavailable."
            );
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

    loadGoogleMapsScript();
  }, [searchLocation]);

  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap();
    }
  }, [filteredHouses]);

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-screen bg-white z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-row w-full justify-between items-center bg-red-400">
        <div className="flex-grow">
          <FilterBar
            darkMode={darkMode}
            filters={filters}
            onFilterChange={onFilterChange}
            isOverlay={true}
            closeOverlay={closeOverlay}
          />
        </div>
      </div>

      <div className="flex-grow h-full">
        {filteredHouses.length === 0 && (
          <div className="absolute w-full h-full flex items-center justify-center text-gray-500">
            No houses available to display.
          </div>
        )}
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
