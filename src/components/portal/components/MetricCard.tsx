import React from "react";

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
}
  
const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType }) => {
return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-full sm:w-1/4">
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="text-2xl font-bold mt-2">{value}</p>
    <p className={`mt-1 ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
        {change}
    </p>
    </div>
);
};

export default MetricCard;