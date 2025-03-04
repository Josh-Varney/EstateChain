import React from "react";
import { FaWallet, FaBell } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../shadcn-components/ui/avatar";

interface HeaderBarProps {
  darkMode: boolean;
  onWalletClick: () => void;
  isBuyer: boolean;
  onToggleBuyerSeller: () => void;
  onProfileClick: () => void;
  onNotiicationClick: () => void;
  notificationCount?: number;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ darkMode, onWalletClick, onProfileClick, onNotiicationClick, onToggleBuyerSeller, isBuyer, notificationCount = 0 }) => {
  const bgColor = darkMode ? "bg-gray-800" : "";
  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const hoverColor = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const iconColor = darkMode ? "text-white" : "text-black";

  return (
    <header
      className={`p-3 flex ${darkMode ? "border-b border-gray-700" : ""} items-center justify-between h-20 px-4 sm:px-6 md:px-10 ${bgColor} ${textColor} shadow-md flex-wrap`}
      role="banner"
    >
      {/* Left Section: Logo and Navigation */}
      <div className="flex items-center space-x-4 mb-2 sm:mb-0 flex-wrap">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={darkMode ? "/assets/White_Horse_No_Logo.svg" : "/assets/Black_horse_logo_no_line.svg"}
            alt={darkMode ? "White Horse Logo" : "Black Horse Logo"}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />

          {/* Page Title */}
          <h1 className="text-lg sm:text-xl font-semibold">Dashboard</h1>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center space-x-4 flex-wrap relative">
        {/* Buyer and Seller Toggle */}
        <div className="flex items-center justify-between py-2">
          <button
            className={`relative inline-flex items-center w-28 h-6 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-1 ${
              isBuyer ? "bg-teal-500" : "bg-red-500"
            }`}
            aria-pressed={isBuyer}
            onClick={() => {
              onToggleBuyerSeller();
            }}
            aria-label={`Toggle to ${isBuyer ? "Seller" : "Buyer"} Mode`}
          >
            <span
              className={`absolute left-1 top-1 w-10 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
                isBuyer ? "translate-x-0" : "translate-x-16"
              }`}
            >
              <span
                className={`text-xs font-semibold ${
                  isBuyer ? "text-green-700" : "text-orange-700"
                }`}
              >
                {isBuyer ? "Buyer" : "Seller"}
              </span>
            </span>
          </button>
        </div>

        {/* Wallet Button */}
        <div>
          <button
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${hoverColor} `}
            onClick={onWalletClick}
            aria-label="Wallet"
          >
            <FaWallet className={`w-4 h-4 sm:w-5 sm:h-5`} />
          </button>
        </div>

        {/* Notifications */}
        <div
          className={`relative p-2 rounded-full cursor-pointer ${hoverColor}`}
          aria-label="Notifications"
          onClick={onNotiicationClick}
        >
          <FaBell className={`w-5 h-5 sm:w-5 sm:h-5 ${iconColor}`} />
          {notificationCount > 0 && (
            <span
              className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold"
              aria-label={`${notificationCount} new notifications`}
            >
              {notificationCount}
            </span>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="relative">
          <Avatar
            className={`w-7 h-7 rounded-full cursor-pointer`}
            onClick={onProfileClick}
          >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
