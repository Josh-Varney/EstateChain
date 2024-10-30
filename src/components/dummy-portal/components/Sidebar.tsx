// Sidebar.tsx
import React from "react";
import { FaHome, FaChartBar, FaUsers, FaCog, FaFileAlt, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode }) => {
  return (
    <aside className={`p-3 flex flex-col items-center text-center h-screen fixed ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Main Navigation */}
      <nav className="flex flex-col items-center space-y-16 w-full mt-12">
        <SidebarLink href="/temp" icon={<FaHome />} tooltip="Home" darkMode={darkMode} />
        <SidebarLink href="/dashboard" icon={<FaChartBar />} tooltip="Dashboard" darkMode={darkMode} />
        <SidebarLink href="/users" icon={<FaUsers />} tooltip="Users" darkMode={darkMode} />
        <SidebarLink href="/settings" icon={<FaCog />} tooltip="Settings" darkMode={darkMode} />
        <SidebarLink href="/reports" icon={<FaFileAlt />} tooltip="Reports" darkMode={darkMode} />
        <SidebarLink href="/" icon={<FaSignOutAlt />} tooltip="Logout" darkMode={darkMode} />
      </nav>
    </aside>
  );
};

// SidebarLink component with tooltip and hover effect
const SidebarLink: React.FC<{ href: string; icon: React.ReactNode; tooltip: string; darkMode: boolean }> = ({ href, icon, tooltip, darkMode }) => {
  return (
    <a
      href={href}
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
