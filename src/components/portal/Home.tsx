// DashboardHome.tsx
import React from 'react';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';


const HomeScreen: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="mb-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <nav className="text-gray-400 text-sm mt-1">
            <a href="/" className="hover:text-gray-300">Home</a> / <span>Dashboard</span>
          </nav>
        </header>

        {/* Metrics Section */}
        <section className="flex flex-wrap gap-4">
          <MetricCard title="Users" value="26K" change="+12.4%" changeType="increase" />
          <MetricCard title="Income" value="$6,200" change="+40.9%" changeType="increase" />
          <MetricCard title="Conversion Rate" value="2.49%" change="+84.7%" changeType="increase" />
          <MetricCard title="Sessions" value="44K" change="-2.3%" changeType="decrease" />
        </section>

        {/* Traffic Chart Section */}
        <section className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Traffic</h3>
          <p className="text-gray-400 mb-4">January - July 2023</p>
          <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center text-gray-400">
            {/* Placeholder for Chart */}
            [Chart Goes Here]
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;
