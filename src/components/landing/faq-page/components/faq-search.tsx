import React from "react";

interface FAQSearchTermProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FAQSearchTerm: React.FC<FAQSearchTermProps> = ({
  searchQuery,
  setSearchQuery,
}) => (
  <div className="mt-8">
    <input
      type="text"
      placeholder="Search for a question..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
      aria-label="Search FAQs"
    />
  </div>
);

export default FAQSearchTerm;