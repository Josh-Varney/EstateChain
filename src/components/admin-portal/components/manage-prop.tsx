import { useEffect, useState } from "react";
import { Button } from "../../../shadcn-components/ui/button";
import { Textarea } from "../../../shadcn-components/ui/textarea";
import { Card } from "../../../shadcn-components/ui/card";
import { Send, Trash, CheckCircle, XCircle } from "lucide-react"; // Icons
import React from "react";
import { fetchProperties } from "../admin-manager/get-prop";

// Mock Property interface
interface Property {
  createdAt: string; // Unique identifier
  address: string;
  description: string;
  ownerEmail: string;
  status: string; // Pending, Approved, Rejected
}

export default function ManageProperties() {
    const [properties, setProperties] = useState<Property[]>([
      {
        createdAt: "1",
        address: "123 Main St",
        description: "Spacious 3-bedroom house",
        ownerEmail: "owner1@example.com",
        status: "Pending",
      },
      {
        createdAt: "2",
        address: "456 Elm St",
        description: "Modern 2-bedroom apartment",
        ownerEmail: "owner2@example.com",
        status: "Pending",
      },
    ]);
  
    const [adminFeedback, setAdminFeedback] = useState<{ [key: string]: string }>({});
    const [showRawModal, setShowRawModal] = useState<boolean>(false); // Raw JSON Modal state
    const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false); // Approval Modal state
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
    // Mock functions for button actions
    const approvePropertyHandler = (createdAt: string) => {
      console.log(`Property ${createdAt} approved!`);
    };
  
    const rejectPropertyHandler = (createdAt: string) => {
      console.log(`Property ${createdAt} rejected!`);
    };
  
    const removePropertyHandler = (createdAt: string) => {
      console.log(`Property ${createdAt} removed!`);
    };
  
    const submitFeedbackHandler = (createdAt: string) => {
      const feedback = adminFeedback[createdAt];
      if (!feedback) return;
      console.log(`Feedback for property ${createdAt}: ${feedback}`);
    };
  
    const handleFeedbackChange = (createdAt: string, feedback: string) => {
      setAdminFeedback({ ...adminFeedback, [createdAt]: feedback });
    };
  
    // Function to show the modal when the card is clicked
    const handleCardClick = (property: Property) => {
      setSelectedProperty(property);
      setShowRawModal(true); // Show raw JSON modal
    };
  
    // Function to show the approval modal when the "Submit Approval" button is clicked
    const handleSubmitApprovalClick = (property: Property, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent triggering other click handlers
      setSelectedProperty(property);
      setShowApprovalModal(true); // Show approval modal
    };
  
    // Close the modals
    const closeRawModal = () => {
      setShowRawModal(false);
      setSelectedProperty(null);
    };
  
    const closeApprovalModal = () => {
      setShowApprovalModal(false);
      setSelectedProperty(null);
    };
  
    // Submit Approval (after showing contract details)
    const handleSubmitApproval = () => {
      if (selectedProperty) {
        approvePropertyHandler(selectedProperty.createdAt);
        setShowApprovalModal(false); // Close the approval modal after submitting
      }
    };
  
    // Validate and handle Reject & Send Feedback
    const handleRejectAndSendFeedback = (createdAt: string, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent triggering other click handlers
      
      const feedback = adminFeedback[createdAt];
      if (!feedback || feedback.trim() === "") {
        alert("Feedback is required to reject the property."); // Show alert instead of inline error message
        return; // Stop execution if feedback is not provided
      }
  
      rejectPropertyHandler(createdAt);
      submitFeedbackHandler(createdAt);
    };

    useEffect(() => {
        const fetchData = async () => {
          const data = await fetchProperties(); // Call the async function and get the data
          console.log(data);
        //   setProperties(data); // Update the state with the fetched data
        };
    
        fetchData(); // Call the fetchData function to fetch and store data
      }, []);
  
    return (
      <div className="p-6 w-full mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Manage Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.createdAt}>
                <Card
                  className="p-4 shadow-lg border rounded-lg w-full cursor-pointer"
                  onClick={() => handleCardClick(property)} // Show raw modal on card click
                >
                  <h2 className="font-semibold text-lg mb-2">{property.address}</h2>
                  <p className="text-gray-600 mb-1">{property.description || "No description provided."}</p>
                  <p className="text-sm text-gray-500 mb-3">Owner: {property.ownerEmail}</p>
                  <p className="text-sm text-gray-500 mb-3">Status: {property.status}</p>
  
                  <Textarea
                    placeholder="Add your feedback..."
                    value={adminFeedback[property.createdAt] || ""}
                    onChange={(e) => handleFeedbackChange(property.createdAt, e.target.value)}
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
                    onClick={(e) => handleRejectAndSendFeedback(property.createdAt, e)}
                    className="flex-1 flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" /> Reject & Send Feedback
                  </Button>
                  {/* Remove Button */}
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering card click
                      removePropertyHandler(property.createdAt);
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
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
              <pre className="bg-gray-100 text-black p-4 rounded text-sm">
                {JSON.stringify(selectedProperty, null, 2)}
              </pre>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={closeRawModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
  
        {/* Modal for Submit Approval (Contract Details) */}
        {showApprovalModal && selectedProperty && (
          <div className="fixed inset-0 text-black bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Contract Details</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm">
                {JSON.stringify(
                  {
                    contract: {
                      property: selectedProperty.address,
                      owner: selectedProperty.ownerEmail,
                      description: selectedProperty.description,
                      status: "Approved",
                      approvalDate: new Date().toISOString(),
                    },
                  },
                  null,
                  2
                )}
              </pre>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={closeApprovalModal}>
                  Close
                </Button>
                <Button variant="default" onClick={handleSubmitApproval}>
                  Submit Approval
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  
  