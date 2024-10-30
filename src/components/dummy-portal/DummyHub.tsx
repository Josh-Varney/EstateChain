// HomeScreen.tsx
import React from 'react';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';

const HomeScreen: React.FC = () => {
  return (
    <div className="flex flex-row w-screen h-screen bg-gray-900 overflow-hidden">
        <div className=''>
            <Sidebar />
        </div>
        <div className='flex w-full bg-gray-400 mt-8'>

        </div>
    </div>
  );
};

export default HomeScreen;
