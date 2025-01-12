import React from "react";

interface PropertyInvestPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PropertyInvestPopup: React.FC<PropertyInvestPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the popup if it's not open

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Popup content */}
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        <h2 className="text-lg font-bold mb-4">Popup Title</h2>
        <p className="mb-4">This is the content of the popup. Click outside or the close button to dismiss.</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PropertyInvestPopup;
