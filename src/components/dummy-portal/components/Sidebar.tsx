// Sidebar.tsx
import React from "react";
import { FaUsers, FaCog, FaSignOutAlt, FaMoneyCheck, FaInfo, FaInnosoft, FaChartArea } from "react-icons/fa";
import { samePageRedirectIssue } from "./errors/redirect";

interface SidebarProps {
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode }) => {
  return (
    <aside className={`p-4 flex flex-col items-center text-center h-screen fixed ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Main Navigation */}
      <nav className="flex flex-col items-center space-y-12 w-full mt-12">
        <SidebarLink location="/home" icon={<FaInnosoft />} tooltip="Home" darkMode={darkMode} />
        <SidebarLink location="/dashboard" icon={<FaChartArea />} tooltip="Dashboard" darkMode={darkMode} />
        <SidebarLink location="/history" icon={<FaMoneyCheck />} tooltip="Transactions" darkMode={darkMode} />
        <SidebarLink location="/community" icon={<FaUsers />} tooltip="Community" darkMode={darkMode} />
        <SidebarLink location="/information" icon={<FaInfo />} tooltip="Information" darkMode={darkMode} />
        <SidebarLink location="/settings" icon={<FaCog />} tooltip="Settings" darkMode={darkMode} />
        <SidebarLink location="/" icon={<FaSignOutAlt />} tooltip="Logout" darkMode={darkMode} />
      </nav>
    </aside>
  );
};

// SidebarLink component with tooltip and hover effect
const SidebarLink: React.FC<{ location: string; icon: React.ReactNode; tooltip: string; darkMode: boolean }> = ({ location, icon, tooltip, darkMode }) => {
  return (
    <a
      // href={href}
      onClick={() => samePageRedirectIssue(window.location.href)}
      className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 group ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
    >
      {icon}
      <span className={`absolute left-16 opacity-0 group-hover:opacity-100 text-xs rounded-md px-2 py-1 transition-opacity duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`}>
        {tooltip}
      </span>
    </a>
  );
};

export default Sidebar;
