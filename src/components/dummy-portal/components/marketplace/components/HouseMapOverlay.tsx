import React, { useEffect, useRef } from "react";
import FilterBar from "./FilterBar";
import HouseDetails from "./HouseDetailsMapOverlay";
import SearchLocationMessage from "./HouseMapSearchPrompt";

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
  const [houseDetails, setHouseDetails] = React.useState<House[] | null>(null);
  const [isMessageVisible, setIsMessageVisible] = React.useState(true); // State for message visibility

  const calculateZoomLevel = (radius: number, metric: "miles" | "km", optionalParam?: string): number => {
    if (metric === "miles") {
      if (radius <= 10) return 12; // Zoom in for small radius
      if (radius <= 20) return 11; // Slightly zoomed out
      if (radius <= 30) return 10;
      if (radius <= 50) return 9; // More zoomed out
      return 9; // Zoom out further for large radius
    } else if (metric === "km") {
      if (radius <= 10) return 12;
      if (radius <= 50) return 11;
      if (radius <= 100) return 10;
      return 9; // Adjust for kilometers
    }
    return 10; // Default zoom level
  };

  const getCountryZoomLevel = async (
    latitude: number,
    longitude: number
  ): Promise<number> => {
    const geocoder = new google.maps.Geocoder();
  
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          // Find the "country" component in the address
          const country = results[0].address_components.find((component) =>
            component.types.includes("country")
          )?.long_name;
  
          if (country) {
            // Determine zoom level based on country size
            const smallCountries = ["Monaco", "Singapore", "Luxembourg", "Vatican City", "Liechtenstein"];
            const largeCountries = ["Russia", "United States", "Canada", "China", "Brazil", "Australia"];
  
            if (smallCountries.includes(country)) {
              resolve(10); // Higher zoom for small countries
            } else if (largeCountries.includes(country)) {
              resolve(4); // Lower zoom for large countries
            } else {
              resolve(6); // Default zoom for medium-sized countries
            }
          } else {
            console.error("Country not found in address components.");
            resolve(6); // Default zoom if country is not determined
          }
        } else {
          console.error("Geocoding failed or results are null:", status);
          reject(new Error("Geocoding failed or returned no results."));
        }
      });
    });
  };  

  const initializeMap = () => {
    if (mapRef.current) {
      console.log(searchLocation);
      console.log(mapInstance);
      // Default center when latitude and longitude are null or invalid
      const defaultCenter = { lat: 0, lng: 0 }; // Fallback center (global center)
      
      // Provide default values for searchLocation if it's null
      const radius = (searchLocation?.distance ?? 0) && typeof searchLocation?.distance === "number"
        ? searchLocation.distance
        : 0;
  
      // Validate latitude and longitude, fall back to default center if invalid
      const mapCenter = (searchLocation?.latitude && searchLocation?.longitude) 
        ? {
            lat: isValidLatLng(searchLocation.latitude) ? searchLocation.latitude : defaultCenter.lat,
            lng: isValidLatLng(searchLocation.longitude) ? searchLocation.longitude : defaultCenter.lng,
          }
        : defaultCenter;
  
      // Initialize or re-center the map
      if (!mapInstance.current || (searchLocation?.latitude == null && searchLocation?.longitude == null && searchLocation?.metric == null)) {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: defaultCenter, // This as changed
          zoom: radius > 0 ? 10 : 3, // Default zoom level
          mapId: "87d7c47084b9320e",
        });
      } else {
        mapInstance.current.setCenter(mapCenter);
        adjustZoomBasedOnSearchLocation(radius);
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
          // Check if there's no searchLocation
          if (!searchLocation) {
            // Show only the clicked house details when no search is active
            setHouseDetails([house]);
          } else {
            // Highlight the selected house but retain all house details when search is active
            setHouseDetails([house, ...filteredHouses.filter((h) => h.id !== house.id)]);
          }
        });
  
        markersRef.current.push(marker);
      });
  
      // Add or update circle for search location
      if (searchLocation && typeof radius === "number") {
        const metersRadius =
          radius * (searchLocation.metric === "miles" ? 1609.34 : 1000);
  
        if (!circleRef.current) {
          circleRef.current = new window.google.maps.Circle({
            center: { lat: searchLocation.latitude, lng: searchLocation.longitude },
            radius: metersRadius,
            map: mapInstance.current,
            fillOpacity: 0.1,
            fillColor: "#FF0000",
            strokeColor: "#8B0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          });
        } else {
          circleRef.current.setCenter({
            lat: searchLocation.latitude,
            lng: searchLocation.longitude,
          });
          circleRef.current.setRadius(metersRadius);
        }
  
        // Update houses inside the circle
        const insideHouses = filteredHouses.filter((house) => {
          const houseLatLng = new google.maps.LatLng(
            house.propertyLocation.latitude,
            house.propertyLocation.longitude
          );
  
          return (
            google.maps.geometry.spherical.computeDistanceBetween(
              houseLatLng,
              circleRef.current!.getCenter()!
            ) <= metersRadius
          );
        });
  
        setHouseDetails(insideHouses.length > 0 ? insideHouses : null);
      } else {
        if (circleRef.current) {
          circleRef.current.setMap(null);
          circleRef.current = null;
        }
        // If no searchLocation, set houseDetails to null
        setHouseDetails(null);
      }
    }
  };
  
  
  // Helper function to check if lat/lng are valid numbers
  const getValidLatLng = (location: any) => {
    return (
      location &&
      typeof location.latitude === "number" &&
      !isNaN(location.latitude) &&
      typeof location.longitude === "number" &&
      !isNaN(location.longitude)
    );
  };
  
  // Helper function to adjust zoom level based on search location
  const adjustZoomBasedOnSearchLocation = (radius: number) => {
    if (mapInstance.current && searchLocation) {
      if (!searchLocation) {
        mapInstance.current.setZoom(radius > 0 ? 12 : 3); // Default zoom
        console.log("No Search in progress");
      } else {
        if (searchLocation?.distance === "Within Country") {
          const { latitude, longitude } = searchLocation;
  
          getCountryZoomLevel(latitude, longitude)
            .then((zoomLevel) => {
              mapInstance.current?.setCenter({ lat: latitude, lng: longitude });
              mapInstance.current?.setZoom(zoomLevel);
            })
            .catch((error) => {
              console.error("Error determining zoom level:", error);
              // Fallback to a default zoom level
              mapInstance.current?.setZoom(6);
            });
        } else if (searchLocation?.distance === "All Locations") {
          mapInstance.current.setZoom(radius > 0 ? 12 : 3); // Increase zoom here as well
        } else {
          mapInstance.current.setZoom(calculateZoomLevel(radius, searchLocation?.metric || "miles"));
        }
      }
    }
  };
  
  
  // Helper function to validate lat/lng
  const isValidLatLng = (value: any): boolean => {
    return typeof value === "number" && !isNaN(value);
  };
  
  useEffect(() => {
    console.log(searchLocation);
    if (searchLocation) {
      // Reinitialize the map when searchLocation changes
      initializeMap();
    }
  }, [searchLocation]);  // This will trigger when the searchLocation changes
  
  

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const scriptId = "google-maps-script";

      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=geometry,marker&v=weekly`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          if (window.google && window.google.maps) {
            initializeMap();
          }
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
      className={`fixed top-0 right-0 h-screen w-screen bg-white text-gray-700 z-50 transform ${
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

      <div className="flex-grow h-full relative">
        {filteredHouses.length === 0 && (
          <div className="absolute w-full h-full flex items-center justify-center text-gray-500">
            No houses available to display.
          </div>
        )}
        {!searchLocation && isMessageVisible && (
          <SearchLocationMessage onClose={() => setIsMessageVisible(false)} /> // Use the new component
        )}
        <div
          ref={mapRef}
          className="w-full h-full"
          style={{ minHeight: "300px" }}
        />
        {houseDetails && houseDetails.length > 0 && (
          <HouseDetails
            houses={houseDetails}
            onClose={() => setHouseDetails(null)}
          />
        )}
      </div>
    </div>
  );
};


export default Overlay;
