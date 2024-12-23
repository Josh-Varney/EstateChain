import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaMoneyCheck,
  FaInfo,
  FaInnosoft,
  FaChartArea,
  FaBars,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, setDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [shouldRenderText, setShouldRenderText] = useState(!isCollapsed);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    if (!isCollapsed) {
      setShouldRenderText(true);
    } else {
      const timeout = setTimeout(() => setShouldRenderText(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed h-screen flex flex-col justify-between transition-all duration-300 z-50 shadow-lg ${
        isCollapsed ? "w-20" : "w-64"
      } ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-md transition-transform transform ${
              isCollapsed ? "rotate-180" : ""
            } ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            aria-label="Toggle Sidebar"
          >
            <FontAwesomeIcon icon={faChevronCircleRight} className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 space-y-4">
          {[
            { location: "/home", icon: <FaInnosoft />, label: "Home" },
            { location: "/dashboard", icon: <FaChartArea />, label: "Dashboard" },
            { location: "/history", icon: <FaMoneyCheck />, label: "Transactions" },
            { location: "/community", icon: <FaUsers />, label: "Community" },
            { location: "/information", icon: <FaInfo />, label: "Information" },
          ].map(({ location, icon, label }) => (
            <SidebarLink
              key={location}
              location={location}
              icon={icon}
              label={label}
              darkMode={darkMode}
              isCollapsed={isCollapsed}
              shouldRenderText={shouldRenderText}
            />
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mb-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between px-4 py-3">
          {shouldRenderText && !isCollapsed && (
            <span className="text-sm font-medium whitespace-nowrap">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </span>
          )}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only"
              aria-label="Toggle dark mode"
            />
            <div
              className={`w-10 h-6 rounded-full transition-colors duration-300 ${
                darkMode ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <span
              className={`absolute w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ${
                darkMode ? "translate-x-5" : "translate-x-1"
              } flex items-center justify-center shadow-md`}
            >
              {darkMode ? (
                <FaMoon className="text-gray-400 text-xs" />
              ) : (
                <FaSun className="text-yellow-400 text-xs" />
              )}
            </span>
          </label>
        </div>

        <nav className="mt-4 space-y-2">
          <SidebarLink
            location="/profile"
            icon={<FaUserCircle />}
            label="Profile"
            darkMode={darkMode}
            isCollapsed={isCollapsed}
            shouldRenderText={shouldRenderText}
          />
          <SidebarLink
            location="/logout"
            icon={<FaSignOutAlt />}
            label="Logout"
            darkMode={darkMode}
            isCollapsed={isCollapsed}
            shouldRenderText={shouldRenderText}
          />
        </nav>
      </div>
    </aside>
  );
};

const SidebarLink: React.FC<{
  location: string;
  icon: React.ReactNode;
  label: string;
  darkMode: boolean;
  isCollapsed: boolean;
  shouldRenderText: boolean;
}> = ({ location, icon, label, darkMode, isCollapsed, shouldRenderText }) => (
  <NavLink
    to={location}
    className={({ isActive }) =>
      `flex items-center gap-4 p-3 rounded-md transition-all duration-300 ${
        isActive
          ? darkMode
            ? "bg-gray-800 text-white"
            : "bg-gray-200 text-gray-900"
          : "hover:bg-gray-200 dark:hover:bg-gray-700"
      } ${isCollapsed ? "justify-center" : "pl-4"}`
    }
    aria-label={label}
  >
    <span className="text-xl">{icon}</span>
    {shouldRenderText && !isCollapsed && <span>{label}</span>}
  </NavLink>
);

export default Sidebar;
