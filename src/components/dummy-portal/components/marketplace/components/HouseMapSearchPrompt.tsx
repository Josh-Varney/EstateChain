import React from "react";

interface SearchLocationMessageProps {
  onClose: () => void;
}

const SearchLocationMessage: React.FC<SearchLocationMessageProps> = ({ onClose }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md z-10 text-center">
      <p className="text-lg text-gray-700 mb-4">Enter a Search Location for a more specific search</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
        onClick={onClose} // Call onClose to hide the message
      >
        Close
      </button>
    </div>
  );
};

export default SearchLocationMessage;
