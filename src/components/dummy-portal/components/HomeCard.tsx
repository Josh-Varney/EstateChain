// Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  darkMode: boolean;
  className?: string; // Allow additional classes
}

const Card: React.FC<CardProps> = ({ title, description, darkMode, className = '' }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} ${className}`}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default Card;
