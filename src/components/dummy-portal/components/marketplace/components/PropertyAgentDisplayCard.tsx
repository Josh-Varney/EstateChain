import React from "react";
import { FaLuggageCart } from "react-icons/fa";

type AgentDetails = {
  agentName: string;
  agentIcon: string;
  agentNumber: string; 
  agentEmail: string;
  agentAddress: string;
  agentWhyDescription: string;
  agentSoldRecentlyDescription: string;
}

type PropertyAgentDisplayCardProps = {
  title: string;
  agent?: AgentDetails; // Made agent optional
}

const PropertyAgentDisplayCard = ({ title, agent }: PropertyAgentDisplayCardProps) => {
  // Set default values in case agent is undefined
  const agentInfo = agent || {
    agentName: "Unknown Agent",
    agentIcon: "",
    agentNumber: "Not Available",
    agentEmail: "Not Available"
  };

  return (
    <div className="mb-6 border border-gray-700 rounded-lg shadow-md overflow-hidden bg-gray-800">
      {/* Card Header */}
      <button className="w-full px-4 py-3 text-left bg-gray-700 hover:bg-gray-600 text-lg font-semibold text-white transition">
        <div className="flex items-center space-x-3">
          <FaLuggageCart className="text-xl text-blue-400" />
          <span>{title}</span>
        </div>
      </button>

      {/* Card Content */}
      <div className="px-5 py-4 bg-gray-800 text-gray-200">
        {/* About Section */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-white">About {agentInfo.agentName}</h2>
          <p className="mt-1 text-sm text-gray-300">
            <strong>Name:</strong> {agentInfo.agentName} <br />
            <strong>Phone:</strong> {agentInfo.agentNumber} <br />
            <strong>Email:</strong> {agentInfo.agentEmail}
          </p>
        </div>

        {/* Why Savills Section */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-white">Why Savills</h2>
          <p className="mt-1 text-sm text-gray-300">
            {agent?.agentWhyDescription ? agent.agentWhyDescription : "Check out their website!"}
          </p>
        </div>

        {/* Properties Section */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-white">Properties We Sold Recently</h2>
          <p className="mt-1 text-sm text-gray-300">
            {agent?.agentSoldRecentlyDescription ? agent.agentSoldRecentlyDescription : "We have sold the following properties"}
          </p>
        </div>

        {/* Property Slider */}
        <div className="w-full overflow-x-auto mb-5">
          <div className="flex space-x-4 pb-4">
            {/* Example property cards */}
            {[
              { title: "Property 1", description: "Details about property 1." },
              { title: "Property 2", description: "Details about property 2." },
              { title: "Property 3", description: "Details about property 3." },
              { title: "Property 4", description: "Details about property 4." },
            ].map((property, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md p-4 transform hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="font-semibold text-white text-lg">{property.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{property.description}</p>
                <button className="mt-4 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-lg font-semibold text-blue-400 hover:underline cursor-pointer">
              View our properties for sale
            </h1>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-blue-400 hover:underline cursor-pointer">
              Find out more about us
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAgentDisplayCard;
