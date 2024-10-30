// Sidebar.tsx
import React from "react";
import { FaHome, FaChartBar, FaUsers, FaCog, FaFileAlt, FaSignOutAlt } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-900 p-3 text-white flex flex-col items-center text-center h-screen fixed">
      {/* Logo */}
      
      {/* Main Navigation */}
      <nav className="flex flex-col items-center space-y-16 w-full mt-12">
        <SidebarLink href="/temp" icon={<FaHome />} tooltip="Home" />
        <SidebarLink href="/dashboard" icon={<FaChartBar />} tooltip="Dashboard" />
        <SidebarLink href="/users" icon={<FaUsers />} tooltip="Users" />
        <SidebarLink href="/settings" icon={<FaCog />} tooltip="Settings" />
        <SidebarLink href="/reports" icon={<FaFileAlt />} tooltip="Reports" />
        <SidebarLink href="/" icon={<FaSignOutAlt />} tooltip="Logout" />
      </nav>
    </aside>
  );
};

// SidebarLink component with tooltip and hover effect
const SidebarLink: React.FC<{ href: string; icon: React.ReactNode; tooltip: string }> = ({ href, icon, tooltip }) => {
  return (
    <a
      href={href}
      className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-800 transition-colors duration-300 group"
    >
      {icon}
      <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300">
        {tooltip}
      </span>
    </a>
  );
};

export default Sidebar;
