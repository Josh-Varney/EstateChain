import { useEffect, useState } from "react";
import { Button } from "../../../shadcn-components/ui/button";
import { Textarea } from "../../../shadcn-components/ui/textarea";
import { Card } from "../../../shadcn-components/ui/card";
import { Send, Trash, CheckCircle, XCircle } from "lucide-react"; // Icons
import React from "react";
import { fetchProperties } from "../admin-manager/get-prop";

// Property interface based on your data
interface Property {
  agentAddress: string;
  agentContactNumber: string;
  agentEmail: string;
  agentID: number;
  agentIcon: string;
  agentName: string;
  agentSoldRecentlyDescription: string;
  agentWhyDescription: string;
  pApproved: boolean;
  pId: number;
  propertyAddress: string;
  propertyAgentID: number;
  propertyBathrooms: number;
  propertyBedrooms: number;
  propertyCity: string;
  propertyCountry: string;
  propertyDescription: string;
  propertyFeatured: boolean;
  propertyGeoLat: string;
  propertyGeoLong: string;
  propertyID: number;
  propertyImage: string;
  propertyKeyFeatures: string;
  propertyKeywords: string;
  propertyLocationLatitude: string;
  propertyLocationLongitude: string;
  propertyName: string;
  propertyPostalCode: string;
  propertyPostcode: string;
  propertyPrice: string; // Base64 encoded
  propertyRental: boolean;
  propertySettlement: string;
  propertySize: string;
  propertyStreet: string;
  propertyStreetNum: string;
  propertyTenure: string;
  propertyTokenPrice: string; // Base64 encoded
  propertyTokensLeft: number;
  rentalDistributionExpectancy: string;
}

export default function ManageProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [adminFeedback, setAdminFeedback] = useState<{ [key: string]: string }>({});
  const [showRawModal, setShowRawModal] = useState<boolean>(false);
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);


  // Fetch properties from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProperties();
      setProperties(Object.values(data));
    };
    fetchData();
  }, []);

  const approvePropertyHandler = (propertyID: Number) => {
    console.log(propertyID);
  };

  const rejectPropertyHandler = (propertyID: Number) => {
    console.log(propertyID);
  };

  const removePropertyHandler = (propertyID: Number) => {
    console.log(propertyID)
  };

  const submitFeedbackHandler = (propertyID: number) => {
    const feedback = adminFeedback[propertyID];
    if (!feedback) return;
    console.log(`Feedback for property ${propertyID}: ${feedback}`);
  };

  const handleCardClick = (property: Property) => {
    setSelectedProperty(property);
    setShowRawModal(true); // Show raw JSON modal on card click
  };

  const closeRawModal = () => {
    setShowRawModal(false);
    setSelectedProperty(null);
  };

  const handleSubmitApprovalClick = (property: Property, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering other click handlers
    setSelectedProperty(property);
    setShowApprovalModal(true); // Show approval modal
  };

  const closeApprovalModal = () => {
    setShowApprovalModal(false);
    setSelectedProperty(null);
  };

  const handleFeedbackChange = (propertyID: number, feedback: string) => {
    setAdminFeedback((prev) => ({ ...prev, [propertyID]: feedback }));
  };

  // Reject property & send feedback
  const handleRejectAndSendFeedback = (propertyID: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card click

    const feedback = adminFeedback[propertyID];
    if (!feedback || feedback.trim() === "") {
      alert("Feedback is required to reject the property.");
      return;
    }

    rejectPropertyHandler(propertyID);
    submitFeedbackHandler(propertyID);
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.propertyID}>
              <Card
                className="p-4 shadow-lg border rounded-lg w-full cursor-pointer"
                onClick={() => handleCardClick(property)} // Show raw modal on card click
              >
                <h2 className="font-semibold text-lg mb-2">{property.propertyAddress}</h2>
                <p className="text-sm text-gray-500 mb-3">Agent: {property.agentName}</p>
                <p className="text-sm text-gray-500 mb-3">Location: {property.propertyCity}, {property.propertyCountry}, {property.agentAddress}, {property.propertyPostcode}</p>
                <p className="text-sm text-gray-500 mb-3">Status: {property.pApproved ? "Approved" : "Pending"}</p>

                <Textarea
                  placeholder="Add your feedback..."
                  value={adminFeedback[property.propertyID] || ""}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevents triggering the card click
                    handleFeedbackChange(property.propertyID, e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()} // Prevent card click on focus
                  className="mt-2"
                />
              </Card>

              <div className="flex bg-slate-500 p-1 gap-2 mt-2 ">
                {/* Submit Approval Button */}
                <Button
                  variant="default"
                  size="sm"
                  onClick={(e) => handleSubmitApprovalClick(property, e)} // Show approval modal
                  className="flex-1 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Submit Approval
                </Button>
                {/* Reject and Submit Feedback Button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => handleRejectAndSendFeedback(property.propertyID, e)}
                  className="flex-1 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Reject & Send Feedback
                </Button>
                {/* Remove Button */}
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering card click
                    removePropertyHandler(property.propertyID);
                  }}
                  className="flex-1 flex items-center gap-2"
                >
                  <Trash className="w-4 h-4" /> Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No properties available for review.</p>
        )}
      </div>

      {/* Modal for Raw JSON (when card is clicked) */}
      {showRawModal && selectedProperty && (
        <div className="fixed inset-0 text-black bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-auto">
            <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
            <div className="overflow-y-auto max-h-96">
              <pre className="bg-gray-100 text-black p-4 rounded text-sm">
                {JSON.stringify(selectedProperty, null, 2)}
              </pre>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={closeRawModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Submit Approval */}
      {showApprovalModal && selectedProperty && (
        <div className="fixed inset-0 text-black bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-auto">
            <h2 className="text-2xl font-semibold mb-4">Contract Details</h2>
            <div className="overflow-y-auto max-h-96">
              <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(
                {
                  propertyName: selectedProperty.propertyName,
                  address: selectedProperty.propertyAddress,
                  city: selectedProperty.propertyCity,
                  country: selectedProperty.propertyCountry,
                  agentName: selectedProperty.agentName,
                  agentEmail: selectedProperty.agentEmail,
                  price: atob(selectedProperty.propertyPrice), // Decoded price
                  size: selectedProperty.propertySize,
                  bedrooms: selectedProperty.propertyBedrooms,
                  bathrooms: selectedProperty.propertyBathrooms,
                  status: selectedProperty.pApproved ? "Approved" : "Pending",
                },
                null,
                2
              )}
              </pre>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              {/* Close Button */}
              <Button variant="outline" onClick={closeApprovalModal}>
                Close
              </Button>
              
              {/* Accept Button */}
              <Button
                variant="default"
                onClick={() => {
                  approvePropertyHandler(selectedProperty.propertyID);
                  closeApprovalModal();
                }}
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
