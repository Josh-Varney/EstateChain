// Card.tsx
import React from 'react';
import { Calendar } from '../../../shadcn-components/ui/calendar';

interface CardProps {
  title: string;
  description: string;
  darkMode: boolean;
  className?: string; // Allow additional classes
  children?: React.ReactNode;
}

const CalenderCard: React.FC<CardProps> = ({ title, description, darkMode, className = '', children }) => {
    
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <div className={`p-4 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} ${className}`}>
            <div className="justify-items-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
            </div>
        </div>
    );
};

export default CalenderCard;