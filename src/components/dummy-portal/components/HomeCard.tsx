// Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  darkMode: boolean;
  className?: string; // Allow additional classes
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, darkMode, className = '', children }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} ${className}`}>
      {/* Render Injected Content */}
      {children}
    </div>
  );
};

export default Card;
