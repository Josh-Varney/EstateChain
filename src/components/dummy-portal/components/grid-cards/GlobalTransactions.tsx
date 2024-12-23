// src/components/grid-cards/GlobalTransactionsCard.tsx

import React, { FC, useState, ChangeEvent } from "react";

// Define the structure of a Transaction
interface Transaction {
  id: number;
  date: string; // ISO format date string
  description: string;
  amount: number; // Positive for credit, negative for debit
  type: "credit" | "debit";
  category: string;
  user: string; // User who made the transaction
}

// Sample transactions data within the last 72 hours
const globalTransactions: Transaction[] = [
  {
    id: 1,
    date: "2024-04-24T10:30:00Z",
    description: "Payment from John Doe",
    amount: 250.0,
    type: "credit",
    category: "Salary",
    user: "John Doe",
  },
  {
    id: 2,
    date: "2024-04-23T14:45:00Z",
    description: "Grocery Shopping",
    amount: -75.5,
    type: "debit",
    category: "Food",
    user: "Jane Smith",
  },
  {
    id: 3,
    date: "2024-04-22T09:15:00Z",
    description: "Electricity Bill",
    amount: -120.0,
    type: "debit",
    category: "Utilities",
    user: "Alice Johnson",
  },
  {
    id: 4,
    date: "2024-04-21T16:20:00Z",
    description: "Freelance Project",
    amount: 500.0,
    type: "credit",
    category: "Freelance",
    user: "Bob Brown",
  },
  {
    id: 5,
    date: "2024-04-20T11:00:00Z",
    description: "Restaurant Dinner",
    amount: -60.0,
    type: "debit",
    category: "Food",
    user: "Charlie Davis",
  },
  {
    id: 6,
    date: "2024-04-19T08:30:00Z",
    description: "Gym Membership",
    amount: -45.0,
    type: "debit",
    category: "Health",
    user: "Diana Evans",
  },
  {
    id: 7,
    date: "2024-04-24T12:00:00Z",
    description: "Book Purchase",
    amount: -30.0,
    type: "debit",
    category: "Education",
    user: "Ethan Foster",
  },
  {
    id: 8,
    date: "2024-04-23T18:25:00Z",
    description: "Stock Dividend",
    amount: 150.0,
    type: "credit",
    category: "Investment",
    user: "Fiona Green",
  },
  {
    id: 9,
    date: "2024-04-22T20:10:00Z",
    description: "Online Course",
    amount: -200.0,
    type: "debit",
    category: "Education",
    user: "George Harris",
  },
  {
    id: 10,
    date: "2024-04-21T07:50:00Z",
    description: "Car Repair",
    amount: -350.0,
    type: "debit",
    category: "Auto",
    user: "Hannah Irving",
  },
  // Add more transactions as needed
];

interface GlobalTransactionsCardProps {
  darkMode: boolean;
}

const GlobalTransactionsCard: FC<GlobalTransactionsCardProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "credit" | "debit">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Extract unique categories for filter dropdown
  const categories = Array.from(new Set(globalTransactions.map(tx => tx.category)));

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter type change
  const handleFilterTypeChange = (type: "all" | "credit" | "debit") => {
    setFilterType(type);
  };

  // Handle filter category change
  const handleFilterCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };

  // Filter transactions based on search and filters
  const filteredTransactions = globalTransactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ? true : tx.type === filterType;

    const matchesCategory =
      filterCategory === "all" ? true : tx.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div
      className={`
        p-6
        rounded-lg
        shadow-lg
        transition-colors
        duration-300
        ${darkMode ? "bg-gray-800" : "bg-white"}
        ${darkMode ? "text-gray-300" : "text-gray-600"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Global Transactions (Last 72 Hours)</h2>
        <span className="text-sm font-medium">FinanceHub</span>
      </div>

      {/* Divider */}
      <hr
        className={`mb-4 ${
          darkMode ? "border-gray-700" : "border-gray-300"
        }`}
      />

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-2 md:space-y-0">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by description or user..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={`
            px-4 py-2
            rounded
            border
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-black"}
          `}
        />

        {/* Filter Options */}
        <div className="flex space-x-2">
          {/* Filter Type Buttons */}
          <div className="flex space-x-1">
            <button
              onClick={() => handleFilterTypeChange("all")}
              className={`
                px-3 py-1 rounded
                ${filterType === "all"
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
              `}
            >
              All
            </button>
            <button
              onClick={() => handleFilterTypeChange("credit")}
              className={`
                px-3 py-1 rounded
                ${filterType === "credit"
                  ? "bg-green-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
              `}
            >
              Credit
            </button>
            <button
              onClick={() => handleFilterTypeChange("debit")}
              className={`
                px-3 py-1 rounded
                ${filterType === "debit"
                  ? "bg-red-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
              `}
            >
              Debit
            </button>
          </div>

          {/* Filter Category Dropdown */}
          <select
            value={filterCategory}
            onChange={handleFilterCategoryChange}
            className={`
              px-4 py-2
              rounded
              border
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-black"}
            `}
          >
            <option value="all">All Categories</option>
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-right">Amount (£)</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">User</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-t">
                  <td className="px-4 py-2">{new Date(tx.date).toLocaleString()}</td>
                  <td className="px-4 py-2">{tx.description}</td>
                  <td
                    className={`px-4 py-2 text-right font-semibold ${
                      tx.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {tx.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{tx.category}</td>
                  <td className="px-4 py-2">{tx.user}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={5}>
                  No transactions match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GlobalTransactionsCard;
