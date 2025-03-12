import React, { FC, useState, ChangeEvent, useEffect } from "react";

// Define the structure of a Transaction
interface Transaction {
  tid: number;
  id: string; // UUID as ID
  date: string; // Date of the transaction
  description: string; // Description of the transaction
  amount: number; // Token amount involved in the transaction
  property_address: string; // Address of the property
  block_hash: string; // Block hash from the blockchain
  block_number: number; // Block number from the blockchain
  gas_price: string; // Gas price for the transaction
  sender_address: string; // Sender's address
  receiver_address: string; // Receiver's address
}

interface GlobalTransactionsCardProps {
  darkMode: boolean;
}

const GlobalTransactionsCard: FC<GlobalTransactionsCardProps> = ({ darkMode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "incoming" | "outgoing">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Extract unique categories for filter dropdown (you can decide based on transaction data)
  const categories = Array.from(new Set(transactions.map(tx => tx.property_address)));

  const getAllTransactions = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-transparent-transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();

      // Map the DB data to match the Transaction format
      const transformedData = data.map((dbTx: any) => ({
        tid:  dbTx.tid,
        id: dbTx.id,
        date: new Date().toISOString(), // Adjust the date based on your DB (for example, from a timestamp)
        description: `Blockchain Transaction ${dbTx.hash}`, // You can customize this if needed
        amount: dbTx.token_amount,
        property_address: dbTx.property_address,
        block_hash: dbTx.block_hash,
        block_number: dbTx.block_number,
        gas_price: dbTx.gas_price,
        sender_address: dbTx.sender_address,
        receiver_address: dbTx.receiver_address,
      }));

      // Create a map to ensure unique transactions by id
      const uniqueTransactions = new Map<string, Transaction>();
      transformedData.forEach(tx => {
        uniqueTransactions.set(tx.tid.toString(), tx); // Overwrite any duplicate transactions by tid
      });

      // Convert the Map values back into an array and update the state
      setTransactions(Array.from(uniqueTransactions.values()));
    } catch (e) {
      console.error("Error fetching transactions:", e);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter type change
  const handleFilterTypeChange = (type: "all" | "incoming" | "outgoing") => {
    setFilterType(type);
  };

  // Handle filter category change
  const handleFilterCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };

  // Filter and sort transactions based on search and filters
  const filteredTransactions = transactions
    .filter((tx) => {
      const matchesSearch =
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.property_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.sender_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.receiver_address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        filterType === "all" ? true : filterType === "incoming" ? tx.receiver_address : tx.sender_address;

      const matchesCategory =
        filterCategory === "all" ? true : tx.property_address === filterCategory;

      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sorting by date (latest first)

  return (
    <div className="flex flex-col p-6">
      <div
        className={`
          p-6
          rounded-lg
          shadow-lg
          transition-colors
          duration-300
          ${darkMode ? "bg-gray-900 border border-gray-700 text-gray-100" : "bg-white border border-gray-300 text-gray-900"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Global Blockchain Transactions (Properties)</h2>
          <span className="text-sm font-medium">Blockchain Finance Hub</span>
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
          placeholder="Sender address..."
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
                className={`px-3 py-1 rounded ${filterType === "all" ? "bg-blue-500 text-white" : darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                All
              </button>
              <button
                onClick={() => handleFilterTypeChange("incoming")}
                className={`px-3 py-1 rounded ${filterType === "incoming" ? "bg-green-500 text-white" : darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                Incoming
              </button>
              <button
                onClick={() => handleFilterTypeChange("outgoing")}
                className={`px-3 py-1 rounded ${filterType === "outgoing" ? "bg-red-500 text-white" : darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                Outgoing
              </button>
            </div>

            {/* Filter Property Dropdown */}
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
              <option value="all">All Properties</option>
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
                <th className="px-4 py-2 text-left">Property Address</th>
                <th className="px-4 py-2 text-left">Block Hash</th>
                <th className="px-4 py-2 text-right text-nowrap">Token (ERC-200)</th>
                <th className="px-4 py-2 text-left">Sender</th>
                <th className="px-4 py-2 text-left">Receiver</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={`${tx.tid}`} className="border-t">
                    <td className="px-4 py-2">{new Date(tx.date).toLocaleString()}</td>
                    <td className="px-4 py-2">{tx.property_address}</td>
                    <td className="px-4 py-2">
                      <a
                        href={`https://holesky.etherscan.io/block/${tx.block_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {tx.block_hash}
                      </a>
                    </td>
                    <td
                      className={`px-4 py-2 text-right font-semibold ${
                        tx.amount > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : ""}
                      {tx.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={`https://holesky.etherscan.io/address/${tx.sender_address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {tx.sender_address}
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={`https://holesky.etherscan.io/address/${tx.receiver_address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {tx.receiver_address}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 text-center" colSpan={6}>
                    No transactions match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GlobalTransactionsCard;
