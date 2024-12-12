import React from "react";

const SystemStatus: React.FC = () => {
    return (
        <div className="mt-8 bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">System Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <p className="text-sm">Simulation System: Online</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <p className="text-sm">Live System: Online</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <p className="text-sm">Database: Maintenance Mode</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <p className="text-sm">Blockchain Node: Connected</p>
                </div>
            </div>
        </div>
    );
};

export default SystemStatus;
