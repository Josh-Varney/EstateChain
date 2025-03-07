import React, { useEffect, useRef } from 'react';
import { FaUserEdit, FaSignOutAlt, FaCog } from 'react-icons/fa';

interface ProfileDropdownProps {
  close: () => void;
  username?: string;
  email?: string;
  isOpen: boolean; 
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ close, username = 'User123', email = 'user@example.com', isOpen }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close, isOpen]);

  if (!isOpen) return null; // Return null if the dropdown is not open

  return (
    <div ref={dropdownRef} className="absolute right-4 mt-14 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-md overflow-hidden z-50 animate-fadeIn">
      {/* Profile Summary */}
      <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <p className="text-xs text-gray-600 dark:text-gray-400">Username</p>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{username}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Email</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{email}</p>
      </div>

      {/* Dropdown Options */}
      <div className="flex flex-col">
        <button
          className="flex items-center space-x-2 p-4 text-left text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded-md"
          onClick={() => alert('Edit Profile')}
        >
          <FaUserEdit className="text-gray-600 dark:text-gray-300" />
          <span>Edit Profile</span>
        </button>
        <button
          className="flex items-center space-x-2 p-4 text-left text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded-md"
          onClick={() => alert('Settings')}
        >
          <FaCog className="text-gray-600 dark:text-gray-300" />
          <span>Settings</span>
        </button>
        <button
          className="flex items-center space-x-2 p-4 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-700 transition duration-150 ease-in-out rounded-md"
          onClick={close}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
