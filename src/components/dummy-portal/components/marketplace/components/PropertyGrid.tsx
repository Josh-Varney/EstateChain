import React from "react";
import {
  FaAddressBook,
  FaArrowLeft,
  FaCalculator,
  FaHeart,
  FaInfoCircle,
  FaShare,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardDropdown from "./PropertyDetailDropdown";

// PropertyDetails Component
const PropertyDetails = ({ title, value }) => (
  <div className="space-y-1 whitespace-nowrap">
    <h2 className="font-semibold text-gray-400 text-sm">{title}</h2>
    <p className="text-white text-base">{value}</p>
  </div>
);

const PropertyGrid = ({ darkMode }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 overflow-y-auto pb-12 ${
        darkMode
          ? "bg-gradient-to-t from-gray-800 to-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      {/* Navigation Section */}
      <header
        className="flex items-center space-x-3 py-4 px-6 cursor-pointer"
        onClick={() => navigate("/simulation/mockmarketplace")}
      >
        <FaArrowLeft className="text-md" />
        <h1 className="text-sm font-medium">Return to Search</h1>
      </header>

      {/* Hero Image Section */}
      <section className="w-full h-[300px] relative overflow-hidden mb-8">
        <img
          src="https://via.placeholder.com/1920x500"
          alt="Large Display"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Main Content Section */}
      <main className="px-6 grid gap-8 grid-cols-1 md:grid-cols-5">
        {/* Property Information */}
        <section className="col-span-4 space-y-8">
          {/* Title and Navigation */}
          <div className="space-y-4">
            <h1 className="text-sm font-bold">New Home</h1>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Whittaker House</h2>
              <div className="flex space-x-4 text-lg">
                <FaHeart className="cursor-pointer" />
                <FaShare className="cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Price and Info */}
          <div className="flex justify-between items-center space-y-4">
            <div className="flex items-center space-x-2 text-lg">
              <span className="font-medium">$10,000</span>
              <FaInfoCircle />
            </div>
            <button className="border p-1 font-medium">Buy Token</button>
          </div>

          {/* Additional Info */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FaCalculator />
                <h1 className="text-sm">Monthly Mortgage Payments</h1>
              </div>
              <span className="text-sm text-gray-500">Added on 26/12/2024</span>
            </div>
            <hr className="border-t border-gray-300" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <PropertyDetails title="Property Type" value="Apartment" />
              <PropertyDetails title="Bedrooms" value="1" />
              <PropertyDetails title="Bathrooms" value="1" />
              <PropertyDetails title="Size" value="Ask Agent" />
              <PropertyDetails title="Tenure" value="Lease Hold" />
            </div>
            <hr className="border-t border-gray-300" />
          </section>

          {/* Additional Image */}
          <div className="w-full h-[100px] relative overflow-hidden rounded-md shadow mb-8">
            <img
              src="https://via.placeholder.com/1920x500"
              alt="Additional Display"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Features */}
          <section className="space-y-6">
            
            <div>
                <div>
                    <h1 className="text-lg font-semibold">Key Features</h1>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Bespoke building of 9 apartments</li>
                            <li>Secure undercover parking</li>
                            <li>Walking distance to the train station</li>
                            <li>Call us today for more information</li>
                            <li>Excellent location</li>
                            <li>Bright and airy apartments</li>
                            <li>Constructed by a well-renowned developer</li>
                        </ul>
                    </div>
                    <div>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Bespoke building of 9 apartments</li>
                            <li>Secure undercover parking</li>
                            <li>Walking distance to the train station</li>
                            <li>Call us today for more information</li>
                            <li>Excellent location</li>
                            <li>Bright and airy apartments</li>
                            <li>Constructed by a well-renowned developer</li>
                        </ul>
                    </div>
                </div>
            </div>
            
          </section>

          {/* Description */}
          <section className="space-y-6">
            <h1 className="text-lg font-semibold">Description</h1>
            <p>
              Discover Whittaker House, a visionary new development that sets the
              standard for modern living. Ideally situated in a prime location, this
              exquisite collection of residences seamlessly blends cutting-edge
              contemporary design with timeless elegance. Whether you're searching for
              your dream home or a premier investment opportunity, Whittaker House
              promises unparalleled quality and style tailored to every need.
            </p>
            <a href="#" className="text-blue-500 hover:underline">
              Explore the Full Description
            </a>
          </section>

          {/* Additional Details */}
          <section className="space-y-6">
            <hr className="border-t border-gray-300" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
              <PropertyDetails title="Council Tax" value="Band: TBC" />
              <PropertyDetails title="Parking" value="Yes" />
              <PropertyDetails title="Garden" value="Ask Agent" />
              <PropertyDetails title="Accessibility" value="Ask Agent" />
            </div>
            <hr className="border-b border-gray-300" />
          </section>

          {/* Additional Sections */}
          {[
            {
              title: "Lease Hold Card Dropdown",
              details: "Details about leasehold options.",
            },
            {
              title: "Energy Performance Certificate",
              details: "Details about the energy performance certificate.",
            },
            {
              title: "Utilities, Rights & Restrictions",
              details: "Details about utilities, rights, and restrictions.",
            },
            {
              title: "Broadband Speed",
              details: "Details about broadband speeds available in the area.",
            },
            {
              title: "Recently Sold & Under Offer",
              details: "Details about recently sold and under offer properties.",
            },
          ].map(({ title, details }, idx) => (
            <section key={idx} className="space-y-6">
              <h1 className="text-lg font-semibold mb-2">{title}</h1>
              <CardDropdown title={title} details={details} />
            </section>
          ))}

          <section className="space-y-6">
            <h1 className="text-lg font-semibold mb-2">Google Maps</h1>
            <p>Interactive map container here.</p>
          </section>

          <section className="space-y-6">
            <h1 className="text-lg font-semibold mb-2">Estate Agent</h1>
          </section>

          <section className="space-y-6">
            <h1 className="text-lg font-semibold mb-2">Stamp Duty Calculator</h1>
            <p>Interactive calculator here.</p>
          </section>
        </section>

        {/* Agent Information */}
        <aside
          className={`p-6 rounded-md shadow ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Marketed By</h3>
          <address className="text-sm">
            90 London Road, East Grinstead, Sussex, RH19 2ND
          </address>
          <a
            href="#"
            className="text-sm mt-2 inline-block text-blue-500 hover:underline"
          >
            More properties from this agent
          </a>
          <div className="mt-6 flex justify-center">
            <FaAddressBook className="text-4xl" />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PropertyGrid;
