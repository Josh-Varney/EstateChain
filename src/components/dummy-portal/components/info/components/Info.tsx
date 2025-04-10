import { useEffect, useState } from "react";
import { ClipboardCopy, CheckCircle, AlertTriangle } from "lucide-react";
import React from "react";

const EmbeddedInfoPage: React.FC = () => {
  const [complianceData, setComplianceData] = useState<any[]>([]);
  const [searchToken, setSearchToken] = useState("");
  const [searchGovBody, setSearchGovBody] = useState("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const fetchCompliance = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-compliance-info");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setComplianceData(data);
    } catch (err) {
      console.error("Error fetching compliance data:", err);
    }
  };

  useEffect(() => {
    fetchCompliance();
  }, []);

  // Filter by tokenName (fireURL) & governing body (govBody)
  const filteredData = complianceData.filter(
    (item) =>
      item.fireURL.toLowerCase().includes(searchToken.toLowerCase()) &&
      item.govBody.toLowerCase().includes(searchGovBody.toLowerCase())
  );

  // Function to copy token name to clipboard
  const handleCopy = (tokenName: string) => {
    navigator.clipboard.writeText(tokenName);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 flex flex-col p-6 pb-24 overflow-auto">

      {/* Search Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Search by Token Name */}
        <input
          type="text"
          placeholder="Search by Token Name..."
          className="p-3 rounded-lg border border-gray-500 bg-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchToken}
          onChange={(e) => setSearchToken(e.target.value)}
        />

        {/* Search by Governing Body */}
        <input
          type="text"
          placeholder="Search by Governing Body..."
          className="p-3 rounded-lg border border-gray-500 bg-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchGovBody}
          onChange={(e) => setSearchGovBody(e.target.value)}
        />
      </div>

      {/* Compliance Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.cID}
              className="bg-gray-700 p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 relative flex flex-col"
            >
              {/* Top Row: Compliance Badge + Copy Button */}
              <div className="flex justify-between items-center mb-4">
                {/* Compliance Badge */}
                <span
                  className={`px-3 py-1 text-xs font-bold rounded flex items-center ${
                    item.regionCode.startsWith("US-")
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-gray-900"
                  }`}
                >
                  {item.regionCode.startsWith("US-") ? (
                    <>
                      <CheckCircle size={14} className="mr-1" /> Compliant
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={14} className="mr-1" /> Pending
                    </>
                  )}
                </span>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(item.fireURL)}
                  className="bg-gray-600 hover:bg-gray-500 p-2 rounded-full"
                  title="Copy Token"
                  data-testid={`copy-button-${item.cID}`}
                >
                  <ClipboardCopy size={16} className="text-white" />
                </button>
              </div>

              {/* Clickable Token Name */}
              <a
                href={`https://example.com/${item.fireURL}`} // Replace with actual URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-lg font-semibold mb-3"
              >
                {item.fireURL}
              </a>

              {/* Token Information */}
              <p className="mb-1"><strong>Region:</strong> {item.regionCode}</p>
              <p className="mb-1"><strong>Governing Body:</strong> {item.govBody}</p>
              <p><strong>Law Code:</strong> {item.lawCode}</p>

              {/* Copied Notification */}
              {copiedToken === item.fireURL && (
                <div className="absolute top-12 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                  Copied!
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default EmbeddedInfoPage;
