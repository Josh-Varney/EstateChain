import React from "react";

interface SearchLocationMessageProps {
  onClose: () => void;
}

const SearchLocationMessage: React.FC<SearchLocationMessageProps> = ({ onClose }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg shadow-lg z-10 text-center max-w-xs w-full">
      <p className="text-xl text-white mb-6">Enter a search location for a more specific search</p>
      <button
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
        onClick={onClose} // Call onClose to hide the message
      >
        Close
      </button>
    </div>
  );
};

export default SearchLocationMessage;
