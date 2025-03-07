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
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const [houseDetails, setHouseDetails] = React.useState<House[] | null>(null);
  const [isMessageVisible, setIsMessageVisible] = React.useState(true);

  
  const calculateZoomLevel = (radius: number, metric: "miles" | "km"): number => {
    if (metric === "miles") {
      if (radius <= 10) return 12;
      if (radius <= 20) return 11;
      if (radius <= 30) return 10;
      if (radius <= 50) return 9;
      return 9;
    } else if (metric === "km") {
      if (radius <= 10) return 12;
      if (radius <= 50) return 11;
      if (radius <= 100) return 10;
      return 9;
    }
    return 10;
  };

  const getCountryZoomLevel = async (
    latitude: number,
    longitude: number
  ): Promise<number> => {
    const geocoder = new google.maps.Geocoder();
  
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const country = results[0].address_components.find((component) =>
            component.types.includes("country")
          )?.long_name;
  
          if (country) {
            const smallCountries = ["Monaco", "Singapore", "Luxembourg", "Vatican City", "Liechtenstein"];
            const largeCountries = ["Russia", "United States", "Canada", "China", "Brazil", "Australia"];
  
            if (smallCountries.includes(country)) {
              resolve(10);
            } else if (largeCountries.includes(country)) {
              resolve(4);
            } else {
              resolve(6);
            }
          } else {
            console.error("Country not found in address components.");
            resolve(6);
          }
        } else {
          console.error("Geocoding failed or results are null:", status);
          reject(new Error("Geocoding failed or returned no results."));
        }
      });
    });
  };

  const initializeMap = async () => {
    if (mapRef.current) {
      // Default to 0, 0 if no search location or invalid lat/lng
      const defaultCenter = { lat: 0, lng: 0 };
      const radius = searchLocation?.distance && typeof searchLocation?.distance === "number" 
        ? searchLocation.distance 
        : 0;
  
      const mapCenter = (searchLocation?.latitude && searchLocation?.longitude && !isNaN(searchLocation.latitude) && !isNaN(searchLocation.longitude)) 
        ? { 
            lat: searchLocation.latitude, 
            lng: searchLocation.longitude 
          } 
        : defaultCenter;  // Fallback to default center if lat or lng is invalid or missing
  
      if (!mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center: defaultCenter,  // Default to {0, 0}
          zoom: radius > 0 ? 10 : 3,
          mapId: "87d7c47084b9320e",
        });
      } else {
        if (mapCenter && typeof mapCenter.lat === 'number' && typeof mapCenter.lng === 'number') {
          console.log(mapCenter);
          // Set the center of the map to the valid coordinates
          mapInstance.current.setCenter(mapCenter);
          adjustZoomBasedOnSearchLocation(radius);
        } else {
          console.log('Invalid mapCenter:', mapCenter);
        }
      }
  
      markersRef.current.forEach((marker) => {
        marker.map = null; // Remove old markers
      });
      markersRef.current = [];

      // const houseIcon = {
      //   url: "/public/house-svgrepo-com.svg",
      //   size: new google.maps.Size(50, 50),
      //   anchor: new google.maps.Point(25, 50),
      // };
    
      // const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      // const parser = new DOMParser();

      // Function to fetch and parse the SVG file
      // async function loadSVGFile(url) {
      //   const response = await fetch(url);
      //   const svgText = await response.text();
      //   const parser = new DOMParser();
      //   const pinSvg = parser.parseFromString(svgText, 'image/svg+xml').documentElement;
      //   return pinSvg;
      // }

      function buildContent(house: House) {
        const content = document.createElement("div");
        content.classList.add("property");
      
        // SVG pin shape and content structure using Tailwind CSS
        content.innerHTML = `
          <div class="relative w-12 h-12 rounded-full bg-white-500 text-white flex flex-col justify-center items-center overflow-hidden">
            <!-- Pin Icon (SVG) -->
            <svg class="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <!-- Pin Tail -->
            <div class="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-10 border-transparent border-t-red-500"></div>
            
            <!-- White Box (hidden initially) -->
            <div class="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-32 p-2 bg-white border border-gray-300 shadow-lg rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none">
              <div class="text-center text-sm font-bold text-gray-800">${house.propertyPrice}</div>
              <div class="text-center text-xs text-gray-600">${house.propertyAddress}</div>
            </div>
          </div>
        `;
        
        return content;
      }
      
  
      filteredHouses.forEach((house) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: house.propertyLocation.latitude, lng: house.propertyLocation.longitude },
          map: mapInstance.current, // Attach directly to the map
          content: buildContent(house)
        });
  
        marker.addListener("click", () => {
          if (!searchLocation) {
            setHouseDetails([house]);
          } else {
            setHouseDetails([house, ...filteredHouses.filter((h) => h.id !== house.id)]);
          }
        });
  
        markersRef.current.push(marker);
      });
  
      if (searchLocation && typeof radius === "number") {
        const metersRadius = radius * (searchLocation.metric === "miles" ? 1609.34 : 1000);
  
        if (!circleRef.current) {
          circleRef.current = new google.maps.Circle({
              center: { lat: searchLocation.latitude, lng: searchLocation.longitude },
              radius: metersRadius,
              map: mapInstance.current,
              fillOpacity: 0.1,
              fillColor: "#FF0000",  // Color of the filled area
              strokeColor: "#FF0000", // Border color
              strokeOpacity: 0.2, // Border opacity
              strokeWeight: 1, // Border thickness (in pixels)
          });
      } else {
          circleRef.current.setCenter({ lat: searchLocation.latitude, lng: searchLocation.longitude });
          circleRef.current.setRadius(metersRadius);
      }
  
        const insideHouses = filteredHouses.filter((house) => {
          const houseLatLng = new google.maps.LatLng(
              house.propertyLocation.latitude,
              house.propertyLocation.longitude
          );

        return google.maps.geometry.spherical.computeDistanceBetween(
            houseLatLng,
            circleRef.current!.getCenter()!
        ) <= metersRadius;
    });
  
        setHouseDetails(insideHouses.length > 0 ? insideHouses : null);
      } else {
        if (circleRef.current) {
          circleRef.current.setMap(null);
          circleRef.current = null;
        }
        setHouseDetails(null);
      }
    }
  };
  
  const adjustZoomBasedOnSearchLocation = (radius: number) => {
    console.log(radius);
    console.log(mapInstance)
    console.log(searchLocation)
    if (mapInstance.current && searchLocation) {
      // Validate if latitude and longitude are numbers before using them
      const latitude = (typeof searchLocation?.latitude === "number" && !isNaN(searchLocation?.latitude)) 
        ? searchLocation.latitude 
        : 0;  // Default to 0 if invalid
  
      const longitude = (typeof searchLocation?.longitude === "number" && !isNaN(searchLocation?.longitude)) 
        ? searchLocation.longitude 
        : 0;  // Default to 0 if invalid

  
      if (searchLocation?.distance === "Within Country") {
        getCountryZoomLevel(latitude, longitude)
          .then((zoomLevel) => {
            mapInstance.current?.setCenter({ lat: latitude, lng: longitude });
            mapInstance.current?.setZoom(zoomLevel);
          })
          .catch(() => {
            mapInstance.current?.setZoom(6);
          });
      } else if (searchLocation?.distance === "All Locations") {
        mapInstance.current.setZoom(radius > 0 ? 12 : 3);
      } else if (longitude == 0 && latitude == 0){  // The search Reset Error here
        // This may lead to bugs in the future
        mapInstance.current.setZoom(radius > 0 ? 12 : 3);
      }
      else {
        mapInstance.current.setZoom(calculateZoomLevel(radius, searchLocation?.metric || "miles"));
      }
    }
  };

  useEffect(() => {
    if (searchLocation) {
      localStorage.setItem('searchLocation', JSON.stringify(searchLocation));
      initializeMap();
    }
  }, [searchLocation]);

  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap();
    }
  }, [filteredHouses]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const scriptId = "google-maps-script";
  
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=geometry,marker,advanced-markers&v=weekly`;
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

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-screen z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-row w-full justify-between items-center">
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
          <SearchLocationMessage onClose={() => setIsMessageVisible(false)} />
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
