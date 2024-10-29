import React from "react";

const Sidebar: React.FC = () => {
    return (
      <aside className="bg-gray-800 w-64 h-screen p-6 text-white">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <a href="/" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Home</a>
          <a href="/dashboard" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Dashboard</a>
          <a href="/users" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Users</a>
          <a href="/settings" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Settings</a>
          <a href="/reports" className="block py-2 px-4 rounded-lg hover:bg-gray-700">Reports</a>
        </nav>
      </aside>
    );
  };

export default Sidebar;