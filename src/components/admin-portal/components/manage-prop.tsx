import { useEffect, useState } from "react";
import { Button } from "../../../shadcn-components/ui/button";
import { Textarea } from "../../../shadcn-components/ui/textarea";
import { Card } from "../../../shadcn-components/ui/card";
import { Send, Trash, CheckCircle, XCircle } from "lucide-react"; // Icons
import React from "react";
import { approvePropertyAndSendNotification, fetchProperties, rejectAndSubmitFeedback } from "../admin-manager/get-prop";

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
  propertyAddedBy: string;
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
  const [refetch, setRefetch] = useState(false);

  // Fetch properties from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProperties();
      setProperties(Object.values(data));
    };

    fetchData();
  }, [refetch]);

  const approvePropertyHandler = async (propertyID: number, propertyAddedBy: string) => {
    await approvePropertyAndSendNotification(propertyID, propertyAddedBy);
    setRefetch(true); 
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
  const handleRejectAndSendFeedback = async (propertyID: number, propertyAddedBy: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card click

    const feedback = adminFeedback[propertyID];
    if (!feedback || feedback.trim() === "") {
      alert("Feedback is required to reject the property.");
      return;
    }
    if (feedback && propertyID && propertyAddedBy){
      const boolVal = await rejectAndSubmitFeedback(propertyID, propertyAddedBy, feedback);

      if (boolVal){
        console.log("Success");
        setRefetch(true); // Trigger refetch after success
      }
      else {
        console.log("Failure");
        alert("Property Rejection Failed");
      }
    }
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
                <p className="text-sm text-gray-500 mb-3">Client: {property.propertyAddedBy}</p>
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
                  onClick={(e) => handleRejectAndSendFeedback(property.propertyID, property.propertyAddedBy, e)}
                  className="flex-1 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Reject & Send Feedback
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center w-full h-[50vh]">
            <p className="text-xl font-bold text-green-400 text-center">No pending Property Listings.</p>
          </div>
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
            <div className="mt-6 mb-6 space-y-6">
              {selectedProperty.propertyRental ? (
                <div className="p-6">
                  <p className="text-lg text-gray-700 mt-2">
                    The client wishes to tokenize the property into{" "}
                    <span className="font-bold text-indigo-700">{selectedProperty.propertyTokensLeft}</span> tokens, 
                    for a price of{" "}
                    <span className="font-bold text-green-700">{atob(selectedProperty.propertyTokenPrice)}</span> per token, 
                    with a total property valuation of{" "}
                    <span className="font-bold text-blue-700">{atob(selectedProperty.propertyPrice)}</span>.
                  </p>
                  <p className="text-lg text-gray-700 mt-4">
                    As this is a rental property, the client is required to pay{" "}
                    <span className="font-bold text-red-600">{selectedProperty.rentalDistributionExpectancy }</span> 
                    {" "} to the owners of the property as part of the rental agreement.
                  </p>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Tokenization Details
                  </h1>
                  <p className="text-lg text-gray-700 mt-2">
                    The client wishes to split the property into{" "}
                    <span className="font-bold text-indigo-700">{selectedProperty.propertyTokensLeft}</span> tokens, 
                    each priced at{" "}
                    <span className="font-bold text-green-700">{atob(selectedProperty.propertyTokenPrice)}</span>, 
                    with a total property valuation of{" "}
                    <span className="font-bold text-blue-700">{atob(selectedProperty.propertyPrice)}</span>.
                  </p>
                </div>
              )}
            </div>
            <div className="overflow-y-auto max-h-96">
              <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(
                {
                  address: selectedProperty.propertyAddress,
                  city: selectedProperty.propertyCity,
                  country: selectedProperty.propertyCountry,
                  postcode: selectedProperty.propertyPostcode,
                  isRental: selectedProperty.propertyRental,
                  clientPaysToOwners: selectedProperty.rentalDistributionExpectancy,
                  price: atob(selectedProperty.propertyPrice), // Decoded price
                  tokenPrice: atob(selectedProperty.propertyTokenPrice),
                  tokenNumber: selectedProperty.propertyTokensLeft,
                  agentID: selectedProperty.agentID,
                  agentEmail: selectedProperty.agentEmail,
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
                  approvePropertyHandler(selectedProperty.propertyID, selectedProperty.propertyAddedBy);
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
