import React, { useState } from "react";

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending";
}

const TransactionScreen: React.FC = () => {
  const [transactions] = useState<Transaction[]>(Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    date: `2023-12-${(index % 31) + 1}`,
    description: `Transaction ${index + 1}`,
    category: index % 2 === 0 ? "Income" : "Expense",
    amount: index % 2 === 0 ? 100 + index : -(50 + index),
    status: index % 3 === 0 ? "Completed" : "Pending",
  })));
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [darkMode] = useState(false); // Assuming darkMode is toggled somewhere globally or locally

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome + totalExpenses;

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } h-screen overflow-hidden p-4`}
    >

      {/* Summary Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium">Total Income</h2>
          <p className="text-green-700 text-2xl font-bold">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium">Total Expenses</h2>
          <p className="text-red-700 text-2xl font-bold">${Math.abs(totalExpenses).toFixed(2)}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium">Balance</h2>
          <p className="text-yellow-700 text-2xl font-bold">${balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4 items-center mb-6">
        <input
          type="text"
          className="flex-1 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
          placeholder="Search by description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Filter
        </button>
      </div>

      {/* Transactions */}
      <div className="overflow-y-auto h-[70vh] grid gap-4">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition flex justify-between items-center cursor-pointer"
            onClick={() => setSelectedTransaction(transaction)}
          >
            {/* Left Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{transaction.description}</h3>
              <p className="text-gray-600 text-sm">{transaction.date}</p>
            </div>

            {/* Right Section */}
            <div className="text-right">
              <p
                className={`text-xl font-bold ${
                  transaction.amount > 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
              </p>
              <p className="text-gray-600 text-sm">{transaction.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* No Transactions */}
      {filteredTransactions.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No transactions found.</p>
      )}

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Date:</strong> {selectedTransaction.date}
              </p>
              <p>
                <strong>Description:</strong> {selectedTransaction.description}
              </p>
              <p>
                <strong>Category:</strong> {selectedTransaction.category}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                <span
                  className={
                    selectedTransaction.amount > 0 ? "text-green-700" : "text-red-700"
                  }
                >
                  {selectedTransaction.amount > 0 ? "+" : ""}${Math.abs(selectedTransaction.amount).toFixed(2)}
                </span>
              </p>
              <p>
                <strong>Status:</strong> {selectedTransaction.status}
              </p>
            </div>
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => setSelectedTransaction(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionScreen;
