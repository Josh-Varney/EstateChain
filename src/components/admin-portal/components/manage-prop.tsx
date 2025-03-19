import { useEffect, useState } from "react";
import { Button } from "../../../shadcn-components/ui/button";
import { Textarea } from "../../../shadcn-components/ui/textarea";
import { Card } from "../../../shadcn-components/ui/card";
import { Send, Trash, CheckCircle, XCircle } from "lucide-react"; // Icons
import React from "react";
import { approvePropertyAndSendNotification, fetchProperties, rejectAndSubmitFeedback } from "../admin-manager/get-prop";
import { updateProperty } from "../admin-manager/deploy";

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
  const [error, setError] = useState<boolean>(false);
  const [errorTwo, setErrorTwo] = useState<boolean>(false);
  const [errorThree, setErrorThree] = useState<boolean>(false);

  const [contractAddress, setContractAddress] = useState<string>('');
  const [contractName, setContractName] = useState<string>('');
  const [networkName, setNetworkName] = useState<string>('')

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContractAddress(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContractName(e.target.value);
  }

  const handleNetworkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNetworkName(e.target.value);
  }

  // Fetch properties from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProperties();
      setProperties(Object.values(data));
    };

    fetchData();
  }, [refetch]);


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

    // Check if feedback exceeds 65 words
    const wordCount = feedback.trim().split(/\s+/).length;
    if (wordCount > 65) {
      alert("Feedback cannot exceed 65 words.");
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
                {JSON.stringify({
                  name: selectedProperty.propertyName,
                  address: selectedProperty.propertyAddress,
                  latitude: selectedProperty.propertyGeoLat,
                  longitude: selectedProperty.propertyGeoLong,
                  bedrooms: selectedProperty.propertyBedrooms,
                  bathrooms: selectedProperty.propertyBathrooms,
                  description: selectedProperty.propertyDescription,
                  keywords: selectedProperty.propertyKeywords,
                  type: selectedProperty.propertySettlement,
                  tenure: selectedProperty.propertyTenure,
                  rental: selectedProperty.propertyRental,
                  rentalDistributionExpectancy: selectedProperty.rentalDistributionExpectancy,
                  addedBy: selectedProperty.propertyAddedBy,
                  agentID: selectedProperty.agentID,
                  agentName: selectedProperty.agentName,
                  agentNumber: selectedProperty.agentContactNumber,
                  agentEmail: selectedProperty.agentEmail
                }, null, 2)}
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
      <div className="fixed inset-0 text-black bg-gray-500 bg-opacity-50 flex items-center justify-center z-10 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-auto max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Contract Details</h2>
          <div className="mt-6 mb-6 space-y-6">
            {selectedProperty.propertyRental ? (
              <div className="p-6">
                <p className="text-lg text-gray-700 mt-2">
                  The client wishes to tokenize the property into
                  <span className="font-bold text-indigo-700"> {selectedProperty.propertyTokensLeft} </span>
                  tokens, for a price of
                  <span className="font-bold text-green-700"> {atob(selectedProperty.propertyTokenPrice)} </span>
                  per token, with a total property valuation of
                  <span className="font-bold text-blue-700"> {atob(selectedProperty.propertyPrice)} </span>.
                </p>
                <p className="text-lg text-gray-700 mt-4">
                  As this is a rental property, the client is required to pay
                  <span className="font-bold text-red-600"> {selectedProperty.rentalDistributionExpectancy} </span>
                  to the owners of the property as part of the rental agreement.
                </p>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900">Tokenization Details</h1>
                <p className="text-lg text-gray-700 mt-2">
                  The client wishes to split the property into
                  <span className="font-bold text-indigo-700"> {selectedProperty.propertyTokensLeft} </span>
                  tokens, each priced at
                  <span className="font-bold text-green-700"> {atob(selectedProperty.propertyTokenPrice)} </span>,
                  with a total property valuation of
                  <span className="font-bold text-blue-700"> {atob(selectedProperty.propertyPrice)} </span>.
                </p>
              </div>
            )}
          </div>
          <div className="overflow-y-auto max-h-64 border border-gray-300 p-4 rounded-lg">
            <pre className="bg-gray-100 p-4 rounded text-sm">
              {JSON.stringify(
                {
                  address: selectedProperty.propertyAddress,
                  city: selectedProperty.propertyCity,
                  country: selectedProperty.propertyCountry,
                  postcode: selectedProperty.propertyPostcode,
                  isRental: selectedProperty.propertyRental,
                  clientPaysToOwners: selectedProperty.rentalDistributionExpectancy,
                  price: atob(selectedProperty.propertyPrice),
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

          <div className="p-6 font-sans">
            <h2 className="text-2xl text-gray-800 mb-4">Deploy The Property</h2>
            <p className="text-lg text-gray-600 mb-6">
              To deploy the application, simply copy and paste the following command into your terminal:
              Ensure there is enough ETH in the owner's account.
            </p>
            <div className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto">
              <code>
                (base) josh-v@joshuas-mbp EstateChain % MODULE_NAME="PropertyName" \
                PROPERTY_TOKEN_SUPPLY=1000 \
                PROPERTY_TOKEN_PRICE=10 \
                PROPERTY_OWNER="0x12345" \
                PROPERTY_IS_RENTAL=true \
                PROPERTY_MONTHLY_INCOME=500 \
                PROPERTY_NAME="Property Name" \
                PROPERTY_ABR="PNM" \
                npx hardhat ignition deploy ./ignition/modules/TokenOwnership.js --network holesky
              </code>
            </div>

            <p className="text-lg text-gray-600 mt-6">
              Ensure you have Node.js and npm installed before proceeding with the deployment.
              Please ensure that the property has been correctly added to the blockchain ensuring that the correct fields have been entered.
            </p>

            <p className="text-lg text-black mt-6">
              Please enter the smart contract address if successfully deployed.
            </p>

            <div className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto">
              <code>
                Deployed Addresses:
                MODULE_NAME#PropertyERC20 - 0x566bB67F7304C45A497a45a9b0f0F477a79060DE
              </code>
            </div>
          </div>

          {error && (
            <p className="text-lg font-semibold text-red-500 text-center mt-2">Please deploy the contract and note the deployed address before submission</p>
          )}

          <div className="mt-4">
            <label htmlFor="contractAddress" className="block text-gray-700 text-sm font-medium mb-2">
              Smart Contract Address
            </label>
            <input
              type="text"
              id="contractAddress"
              value={contractAddress}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter smart contract address"
            />
          </div>

          {errorTwo && (
            <p className="text-lg font-semibold text-red-500 text-center mt-2">Please enter the MODULE_NAME used to deploy the contract</p>
          )}

          <div className="mt-4">
            <label htmlFor="contractAddress" className="block text-gray-700 text-sm font-medium mb-2">
              Smart Contract Name
            </label>
            <input
              type="text"
              id="contractName"
              value={contractName}
              onChange={handleNameChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter smart contract name"
            />
          </div>

          {errorThree && (
            <p className="text-lg font-semibold text-red-500 text-center mt-2">Please enter the network name used to deploy the contract</p>
          )}

          <div className="mt-4">
            <label htmlFor="contractAddress" className="block text-gray-700 text-sm font-medium mb-2">
              Network Name
            </label>
            <input
              type="text"
              id="networkName"
              value={networkName}
              onChange={handleNetworkChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter smart contract name"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeApprovalModal}>Close</Button>
            <Button
              variant="default"
              onClick={async () => {
                console.log(contractAddress);
                // Step 1: Check if contractAddress exists
                if (!contractAddress) {
                  setError(true);  // Display error message if contractAddress is missing
                  return;
                }

                if (!contractName){
                  setErrorTwo(true);
                  return;
                }

                if(!networkName){
                  setErrorThree(true);
                  return;
                }
              
                try {
                  // Step 2: Attempt to update the property
                  await updateProperty(selectedProperty.propertyID, contractAddress, networkName, "ETH", contractName);
              
                  // Step 3: If updateProperty was successful, proceed with the next function
                  await approvePropertyAndSendNotification(selectedProperty.propertyID, selectedProperty.propertyAddedBy);
              
                  // Step 4: Reset state and close modal
                  setRefetch(true);
                  setContractAddress("");
                  closeApprovalModal();
              
                } catch (error) {
                  // Step 5: Catch and handle errors from any of the operations
                  console.error("Error during property update or approval:", error);
                  setError(true);  // Optionally show an error to the user
                }
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
