import React, { useEffect, useRef, useCallback } from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

interface ProfileDropdownProps {
  close: () => void;
  username?: string;
  email?: string;
  isOpen: boolean; // Tracks if the dropdown is open
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ close, username = 'John Doe', email = 'john.doe@example.com', isOpen }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      close();
    }
  }, [close]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close();
    }
  }, [close]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-16 mr-4 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-md overflow-hidden z-50 animate-fadeIn"
      role="menu"
      aria-labelledby="profile-menu"
    >
      {/* Profile Summary */}
      <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{username}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{email}</p>
      </div>

      {/* Dropdown Options */}
      <div className="flex flex-col" role="none">
        <button
          className="flex items-center space-x-2 p-4 text-left text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded-md"
          onClick={(e) => {
            e.preventDefault();
            alert('View Profile clicked!');
          }}
          role="menuitem"
        >
          <FaUser className="text-gray-600 dark:text-gray-300" />
          <span>View Profile</span>
        </button>
        <button
          className="flex items-center space-x-2 p-4 text-left text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded-md"
          onClick={(e) => {
            e.preventDefault();
            alert('Settings clicked!');
          }}
          role="menuitem"
        >
          <FaCog className="text-gray-600 dark:text-gray-300" />
          <span>Settings</span>
        </button>
        <button
          className="flex items-center space-x-2 p-4 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-700 transition duration-150 ease-in-out rounded-md"
          onClick={(e) => {
            e.preventDefault();
            close();
          }}
          role="menuitem"
        >
          <FaSignOutAlt />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
