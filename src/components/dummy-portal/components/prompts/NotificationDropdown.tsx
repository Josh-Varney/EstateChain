import React, { useEffect, useRef, useCallback } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Define the NotificationType interface as provided
interface NotificationType {
  nid: number;
  uuid: string;
  message: string;
  type: 'info' | 'rejection'; // Add more types if needed
  related_table: string;
  related_id: number;
  wasRead: boolean;
}

// Update NotificationDropdownProps to use the new NotificationType
interface NotificationDropdownProps {
  close: () => void;
  notifications: NotificationType[]; // Use NotificationType[] instead of the simplified type
  isOpen: boolean; // Tracks if the dropdown is open
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ close, notifications, isOpen }) => {
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
      className="absolute right-0 mt-16 mr-4 w-72 bg-white dark:bg-gray-900 shadow-lg rounded-md overflow-hidden z-50 animate-fadeIn"
      role="menu"
      aria-labelledby="notification-menu"
    >
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notifications</p>
      </div>

      {/* Notification List */}
      <div className="flex flex-col max-h-64 overflow-y-auto" role="none">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.nid}  // Use nid for the key instead of id
              className={`flex items-center space-x-3 p-4 text-sm transition duration-150 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700 ${
                notification.type === 'info' ? 'text-blue-600' : 'text-red-600' // Color based on type
              }`}
              role="menuitem"
            >
              {notification.type === 'info' ? (
                <FaCheckCircle className="text-blue-500 dark:text-blue-400" />
              ) : (
                <FaTimesCircle className="text-red-500 dark:text-red-400" />
              )}
              <span>{notification.message}</span> {/* Display message */}
            </div>
          ))
        ) : (
          <div className="p-4 text-sm text-gray-600 dark:text-gray-400 text-center">
            No new notifications
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center">
        <button
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          onClick={(e) => {
            e.preventDefault();
            alert('All notifications cleared!');
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
