import React, { useState } from 'react';

const CommunityPage: React.FC = () => {
  const [view, setView] = useState<'professionals' | 'contact'>('professionals');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const professionals = [
    { id: 1, name: 'Dr. Jane Smith', expertise: 'Psychologist', location: 'Downtown' },
    { id: 2, name: 'Mr. John Doe', expertise: 'Career Coach', location: 'Midtown' },
    { id: 3, name: 'Ms. Lisa Ray', expertise: 'Nutritionist', location: 'Uptown' },
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! Your message has been sent.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Community Portal</h1>
          <nav className="flex space-x-6">
            <button
              className={`hover:underline ${
                view === 'professionals' ? 'underline font-bold' : ''
              }`}
              onClick={() => setView('professionals')}
            >
              Professionals
            </button>
            <button
              className={`hover:underline ${
                view === 'contact' ? 'underline font-bold' : ''
              }`}
              onClick={() => setView('contact')}
            >
              Contact Us
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">
        {view === 'professionals' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Meet Our Professionals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionals.map((prof) => (
                <div
                  key={prof.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl"
                >
                  <h3 className="text-xl font-bold text-gray-700">{prof.name}</h3>
                  <p className="text-gray-600">{prof.expertise}</p>
                  <p className="text-gray-500 text-sm">{prof.location}</p>
                  <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'contact' && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Contact Us
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default CommunityPage;
