import React, { useEffect, useState } from "react";
import { ClipboardCopy } from "lucide-react";

interface Professional {
  id: number;
  first_name: string;
  last_name: string;
  profession: string;
  location: string;
  email: string;
  phone_number: string;
  linkedin_profile: string;
}

const CommunityPage: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchName, setSearchName] = useState('');
  const [searchProfession, setSearchProfession] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState('');

  // Fetch professionals from the backend
  const fetchCommunityProfessionals = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-professionals");
      if (!response.ok) {
        throw new Error("Failed to fetch professionals");
      }
      const data = await response.json();
      setProfessionals(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchCommunityProfessionals();
  }, []);

  // Filter professionals based on search inputs
  const filteredProfessionals = professionals.filter((professional) => {
    return (
      (professional.first_name ? professional.first_name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
      (professional.profession ? professional.profession.toLowerCase().includes(searchProfession.toLowerCase()) : true) &&
      (professional.location ? professional.location.toLowerCase().includes(searchLocation.toLowerCase()) : true)
    );
  });

  // Function to copy phone number
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000); // Reset after 2 seconds
  };

  // Handle the submission of the contact form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactMessage.trim()) {
      setContactStatus('Thank you for reaching out! We will get back to you soon.');
      setContactMessage('');
    } else {
      setContactStatus('Please enter a message before submitting.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 p-6 overflow-y-auto pb-24">

      {/* Search Filters - Align in a single row */}
      <div className="mb-6 flex gap-4 justify-start items-center">
        <input
          data-testid="search-field"
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-3 rounded-lg border border-gray-500 bg-gray-700 text-white placeholder-gray-500 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          data-testid="profession-field"
          type="text"
          placeholder="Search by Profession"
          value={searchProfession}
          onChange={(e) => setSearchProfession(e.target.value)}
          className="p-3 rounded-lg border border-gray-500 bg-gray-700 text-white placeholder-gray-500 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          data-testid="location-field"
          type="text"
          placeholder="Search by Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-3 rounded-lg border border-gray-500 bg-gray-700 text-white placeholder-gray-500 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Loading or Error message */}
      {loading && <p className="text-center text-gray-400">Loading professionals...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Professionals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.length > 0 ? (
          filteredProfessionals.map((professional) => (
            <div
              key={professional.id}
              className="bg-gray-700 p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 relative flex flex-col"
            >
              {/* Professional's Info */}
              <h3 className="text-lg font-semibold text-white mb-3">{professional.first_name} {professional.last_name}</h3>
              <p className="text-gray-400 mb-1"><strong>Profession:</strong> {professional.profession}</p>
              <p className="text-gray-400 mb-1"><strong>Location:</strong> {professional.location}</p>
              <p className="text-gray-400 mb-1"><strong>Email:</strong> <a href={`mailto:${professional.email}`} className="text-blue-400">{professional.email}</a></p>

              {/* Phone Number with Copy Functionality */}
              <div className="flex items-center">
                <p className="text-gray-400 mb-1"><strong>Phone:</strong> {professional.phone_number}</p>
                <button
                  onClick={() => handleCopyPhone(professional.phone_number)}
                  className="ml-3 text-gray-400 hover:text-white"
                  title="Copy Phone Number"
                >
                  <ClipboardCopy size={18} />
                </button>
              </div>

              {/* LinkedIn Profile */}
              <a
                href={professional.linkedin_profile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline mt-3"
              >
                LinkedIn Profile
              </a>

              {/* Copied Phone Notification */}
              {copiedPhone === professional.phone_number && (
                <div className="absolute top-12 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                  Copied!
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No results found.</p>
        )}
      </div>

      {/* Contact Us Module */}
      <div className="bg-gray-700 p-6 rounded-lg shadow-md mt-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
        <form onSubmit={handleContactSubmit}>
          <textarea
            placeholder="Enter your message here..."
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-lg bg-gray-600 text-white placeholder-gray-500 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition duration-300"
          >
            Send Message
          </button>
        </form>
        {contactStatus && (
          <p className="mt-4 text-center text-green-500">{contactStatus}</p>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
