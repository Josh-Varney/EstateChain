import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Doughnut, Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip);

const transactions = [
  { id: 1, date: "2024-12-20", property: "Oceanview Condo", tokens: 10, price: 50, status: "Completed", category: "Residential", appreciation: 8, roi: 15 },
  { id: 2, date: "2024-12-21", property: "Downtown Office", tokens: 20, price: 75, status: "Completed", category: "Commercial", appreciation: 12, roi: 20 },
  { id: 3, date: "2024-12-22", property: "Mountain Cabin", tokens: 5, price: 100, status: "Pending", category: "Land", appreciation: 5, roi: 10 },
];

const categories = ["Residential", "Commercial", "Land"];

export default function TokenizedRealEstateDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesCategory =
      selectedCategory === "all" || transaction.category === selectedCategory;
    const matchesSearch = transaction.property
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const portfolioValueData = {
    labels: categories,
    datasets: [
      {
        data: categories.map((category) =>
          transactions
            .filter((transaction) => transaction.category === category)
            .reduce((sum, transaction) => sum + transaction.tokens * transaction.price, 0)
        ),
        backgroundColor: ["#4ADE80", "#60A5FA", "#F87171"],
      },
    ],
  };

  const topAssetsData = {
    labels: transactions.map((transaction) => transaction.property),
    datasets: [
      {
        label: "ROI (%)",
        data: transactions.map((transaction) => transaction.roi),
        backgroundColor: ["#FFB020", "#FFC93C", "#FFD700"],
      },
    ],
  };

  const appreciationData = {
    labels: transactions.map((transaction) => transaction.property),
    datasets: [
      {
        label: "Appreciation (%)",
        data: transactions.map((transaction) => transaction.appreciation),
        backgroundColor: ["#34D399", "#10B981", "#059669"],
      },
    ],
  };

  const totalPortfolioValue = transactions.reduce(
    (sum, transaction) => sum + transaction.tokens * transaction.price,
    0
  );

  const averageROI = (
    transactions.reduce((sum, transaction) => sum + transaction.roi, 0) /
    transactions.length
  ).toFixed(2);

  const averageAppreciation = (
    transactions.reduce((sum, transaction) => sum + transaction.appreciation, 0) /
    transactions.length
  ).toFixed(2);

  const topAssets = [...transactions]
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 3);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      } h-screen overflow-y-auto`}
    >
      <main className="flex flex-col gap-6 p-4 sm:p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by property..."
            className="flex-1 px-4 py-2 rounded-lg border shadow-sm focus:ring focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border shadow-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Key Metrics */}
        <section className="grid sm:grid-cols-3 gap-6 mt-6">
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Portfolio Value</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ${totalPortfolioValue.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Average ROI</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {averageROI}%
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Average Appreciation</h2>
            <p className="text-3xl font-bold text-orange-500 dark:text-orange-400">
              {averageAppreciation}%
            </p>
          </div>
        </section>

        {/* Top Running Assets */}
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Top Performing Assets</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold">{asset.property}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ROI: {asset.roi}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Appreciation: {asset.appreciation}%
                </p>
                <p className="text-sm font-bold">
                  Total Value: ${asset.tokens * asset.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Insights */}
        <section className="mt-10 space-y-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4">Portfolio Value Distribution</h2>
              <div className="relative h-64">
                <Doughnut data={portfolioValueData} options={{ responsive: true }} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4">ROI by Property</h2>
              <div className="relative h-64">
                <Bar data={topAssetsData} options={{ responsive: true }} />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4">Appreciation by Property</h2>
              <div className="relative h-64">
                <Pie data={appreciationData} options={{ responsive: true }} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
