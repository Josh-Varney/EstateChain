// Sidebar.tsx
import React from "react";
import { FaHome, FaChartBar, FaUsers, FaCog, FaFileAlt } from "react-icons/fa";
import Logo from "./Logo";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-900 w-full h-full p-6 text-white flex flex-col space-y-8">
      {/* Logo / Title */}
      <Logo />
      {/* Main Navigation */}
      <nav className="space-y-6">
        <a href="/" className="flex items-center py-2 px-4 rounded-full hover:bg-gray-800">
          <FaHome className="mr-4" />Home
        </a>
        <a href="/dashboard" className="flex items-center py-2 px-4 rounded-full hover:bg-gray-800">
          <FaChartBar className="mr-4" />Chart
        </a>
        <a href="/users" className="flex items-center py-2 px-4 rounded-full hover:bg-gray-800">
          <FaUsers className="mr-4" /> Users
        </a>
        <a href="/settings" className="flex items-center py-2 px-4 rounded-full hover:bg-gray-800">
          <FaCog className="mr-4" /> Settings
        </a>
        <a href="/reports" className="flex items-center py-2 px-4 rounded-full hover:bg-gray-800">
          <FaFileAlt className="mr-4" />Reports
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
