// HomeScreen.tsx
import React from 'react';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';

const TopBar: React.FC = () => {
  return (
    <div className="w-full bg-gray-800 py-4 px-8 flex items-center justify-between shadow-md fixed top-0 left-0 z-10">
      <h1 className="text-2xl font-bold text-white ml-64">Dashboard</h1>
      <div className="flex items-center space-x-6 text-white">
        {/* Placeholder icons/links */}
        <button className="hover:bg-gray-700 p-3 rounded-full">
          <span className="material-icons">notifications</span>
        </button>
        <button className="hover:bg-gray-700 p-3 rounded-full">
          <span className="material-icons">settings</span>
        </button>
        <div className="hover:bg-gray-700 p-3 rounded-full">
          <img
            src="https://via.placeholder.com/30"
            alt="User"
            className="rounded-full h-10 w-10"
          />
        </div>
      </div>
    </div>
  );
};

const HomeScreen: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar positioned above the top bar with a higher z-index */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 p-8 z-20 pt-20">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <TopBar />

        <main className="pt-28 px-10">
          {/* Metrics Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <MetricCard title="Users" value="26K" change="+12.4%" changeType="increase" />
            <MetricCard title="Income" value="$6,200" change="+40.9%" changeType="increase" />
            <MetricCard title="Conversion Rate" value="2.49%" change="+84.7%" changeType="increase" />
            <MetricCard title="Sessions" value="44K" change="-2.3%" changeType="decrease" />
          </section>

          {/* Traffic Chart Section */}
          <section className="p-8 bg-gray-800 rounded-lg shadow-md mb-12">
            <h3 className="text-2xl font-semibold mb-4">Traffic</h3>
            <p className="text-gray-400 mb-6">January - July 2023</p>
            <div className="bg-gray-700 rounded-lg h-72 flex items-center justify-center text-gray-400">
              {/* Placeholder for Chart */}
              [Chart Goes Here]
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
