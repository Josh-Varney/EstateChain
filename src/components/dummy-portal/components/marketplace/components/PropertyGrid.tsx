import React, { useState } from "react";
import {
  FaAddressBook,
  FaArrowLeft,
  FaCalculator,
  FaHeart,
  FaInfoCircle,
  FaShare,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EPCDropdown from "./EnergyPerformanceDropdown";
import UtilitiesDropdown from "./UtilitiesRightsDropdown";
import FunctionActivatedDropdown from "./ButtonActivatedDropdown";
import PropertyMapDisplayContainer from "./PropertyMapDisplayContainer";
import PropertyAgentDisplayCard from "./PropertyAgentDisplayCard";
import PropertyNotesWritten from "./PropertyNotes";
import PropertyStampDutyCalculator from "./PropertyStampDutyCalculator";
import PropertyInvestPopup from "./PropertyInvestPopUp";

// PropertyDetails Component
const PropertyDetails = ({ title, value }) => (
  <div className="space-y-1 whitespace-nowrap">
    <h2 className="font-semibold text-gray-400 text-sm">{title}</h2>
    <p className="text-white text-base">{value}</p>
  </div>
);

const PropertyGrid = ({ darkMode }) => {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 overflow-y-auto ${
        darkMode
          ? "bg-gradient-to-t from-gray-800 to-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      {/* Navigation Section */}
      <header
        className="flex items-center space-x-3 py-4 px-4 md:px-6 cursor-pointer"
        onClick={() => navigate("/simulation/mockmarketplace")}
      >
        <FaArrowLeft className="text-md" />
        <h1 className="text-sm font-medium">Return to Search</h1>
      </header>

      {/* Hero Image Section */}
      <section className="w-full h-[250px] md:h-[300px] relative overflow-hidden mb-6">
        <img
          src="https://via.placeholder.com/1920x500"
          alt="Large Display"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Main Content Section */}
      <main className="px-4 md:px-6 grid gap-8 grid-cols-1 lg:grid-cols-5">
        {/* Property Information */}
        <section className="col-span-4 space-y-6">
          {/* Title and Navigation */}
          <div className="space-y-2">
            <h1 className="text-xs font-bold bg-teal-500 rounded-full w-fit p-1">
              New Home
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
              <h2 className="text-lg font-semibold">Whittaker House</h2>
              <div className="flex space-x-4 text-lg">
                <FaHeart className="cursor-pointer hover:text-red-700" />
                <FaShare className="cursor-pointer hover:text-green-600" />
              </div>
            </div>
            {/* Price and Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
              <div className="flex items-center space-x-2 text-lg">
                <span className="font-medium">$10,000</span>
                <FaInfoCircle />
              </div>
              <button className="rounded-full px-4 py-1 text-sm font-medium bg-blue-500" onClick={openPopup}>
                Invest Now
              </button>

              {/* PropertyInvestPopup component */}
              <PropertyInvestPopup isOpen={isPopupOpen} onClose={closePopup} />
            </div>
          </div>

          {/* Additional Info */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex items-center space-x-2 mb-4">
                <FaCalculator />
                <h1 className="text-sm">Monthly Mortgage Payments</h1>
              </div>
              <span className="text-sm text-gray-500">
                Added on 26/12/2024
              </span>
            </div>
            <hr className="border-t border-gray-500" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
              <PropertyDetails title="Property Type" value="Apartment" />
              <PropertyDetails title="Bedrooms" value="1" />
              <PropertyDetails title="Bathrooms" value="1" />
              <PropertyDetails title="Size" value="Ask Agent" />
              <PropertyDetails title="Tenure" value="Lease Hold" />
            </div>
            <hr className="border-t border-gray-500" />
          </section>

          {/* Additional Image */}
          <div className="w-full h-[100px] relative overflow-hidden rounded-md shadow mb-6">
            <img
              src="https://via.placeholder.com/1920x500"
              alt="Additional Display"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Features */}
          <section className="space-y-6">
            <h1 className="text-lg font-semibold mb-2">Key Features</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="list-disc pl-5 space-y-2">
                <li>Bespoke building of 9 apartments</li>
                <li>Secure undercover parking</li>
                <li>Walking distance to the train station</li>
                <li>Call us today for more information</li>
                <li>Excellent location</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Bright and airy apartments</li>
                <li>Constructed by a well-renowned developer</li>
                <li>High-quality finishes</li>
              </ul>
            </div>
          </section>

          {/* Description */}
          <section className="space-y-4">
            <h1 className="text-lg font-semibold">Description</h1>
            <p>
              Discover Whittaker House, a visionary new development that sets the
              standard for modern living. Ideally situated in a prime location, this
              exquisite collection of residences seamlessly blends cutting-edge
              contemporary design with timeless elegance.
            </p>
            <a href="#" className="text-blue-500 hover:underline">
              Explore the Full Description
            </a>
          </section>

          {/* Additional Details */}
          <section className="space-y-6">
            <hr className="border-t border-gray-300" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <PropertyDetails title="Council Tax" value="Band: TBC" />
              <PropertyDetails title="Parking" value="Yes" />
              <PropertyDetails title="Garden" value="Ask Agent" />
              <PropertyDetails title="Accessibility" value="Ask Agent" />
            </div>
            <hr className="border-b border-gray-300" />
          </section>

          {/* Dropdowns */}
          <section className="space-y-6">
            <EPCDropdown title={"EPC Certification"} imageSrc={undefined} />
            <UtilitiesDropdown title={"Utilities, rights & restrictions "} />
            <FunctionActivatedDropdown title={"Recently sold & under offer"} />
          </section>

          <section>
            <PropertyMapDisplayContainer title={"Whittaker House"} latitude={0} longitude={0} />
          </section>

          <section>
            <PropertyAgentDisplayCard title={"Agent Card"} />
          </section>

          <section>
            <PropertyNotesWritten title={"Take Notes"} />
          </section>
        </section>

        {/* Agent Information */}
        <aside
        className={`p-4 md:p-6 rounded-md shadow h-fit ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        } hidden lg:block`}
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
