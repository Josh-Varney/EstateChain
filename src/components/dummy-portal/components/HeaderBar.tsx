import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaWallet, FaBell, FaUserCircle } from "react-icons/fa";

interface HeaderBarProps {
  darkMode: boolean;
  onWalletClick: () => void;
  notificationCount?: number;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ darkMode, onWalletClick, notificationCount = 0 }) => {
  const bgColor = darkMode ? "bg-gray-800" : "bg-white";
  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const hoverColor = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const iconColor = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <header
      className={`flex flex-wrap items-center justify-between h-20 px-6 ${bgColor} ${textColor} shadow-md`}
      role="banner"
    >
      {/* Left Section: Logo and Title */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/assets/Black_horse_logo_no_line.svg"
            alt="Black Horse Logo"
            className="w-12 h-12 object-contain"
          />
          {/* Chevron Icons */}
          <div className="flex space-x-0">
            <FontAwesomeIcon icon={faChevronRight} className={`w-2 ${iconColor}`} />
            <FontAwesomeIcon icon={faChevronRight} className={`w-2 ${iconColor}`} />
          </div>
        </div>
        {/* Title */}
        <h1 className="text-xl font-semibold">Overview</h1>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
        {/* Wallet Button */}
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            darkMode ? "bg-green-600 hover:bg-green-500" : "bg-green-500 hover:bg-green-400"
          }`}
          onClick={onWalletClick}
          aria-label="Wallet"
        >
          <FaWallet className="w-5 h-5 text-white" />
        </button>

        {/* Notifications */}
        <div
          className={`relative cursor-pointer p-2 rounded-full ${hoverColor}`}
          aria-label="Notifications"
        >
          <FaBell className={`w-5 h-5 ${iconColor}`} />
          {notificationCount > 0 && (
            <span
              className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold"
              aria-label={`${notificationCount} new notifications`}
            >
              {notificationCount}
            </span>
          )}
        </div>

        {/* User Profile */}
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer ${hoverColor}`}
          aria-label="User Profile"
        >
          <FaUserCircle className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
