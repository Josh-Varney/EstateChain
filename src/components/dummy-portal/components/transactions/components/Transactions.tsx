import { formatUnits, parseUnits } from "ethers";
import React, { useEffect, useState } from "react";

interface BlockchainTransaction {
  block_hash: string;
  block_number: number;
  gas_price: string;
  hash: string;
  property_address: string;
  receiver_address: string;
  sender_address: string;
  token_amount: number;
  uuid: string;
}

const BlockchainTransactionScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [minTokenAmount, setMinTokenAmount] = useState<number | "">("");
  const [maxBlockNumber, setMaxBlockNumber] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<BlockchainTransaction | null>(null);
  const [darkMode] = useState(false); // Assuming darkMode is toggled globally or locally

  // Fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const uuid = localStorage.getItem("uuid");
      if (!uuid) {
        setError("UUID not found.");
        return;
      }

      const response = await fetch(`http://localhost:8080/get-transactions/${uuid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions.");
      }

      const data: BlockchainTransaction[] = await response.json();
      setTransactions(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Apply filters
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.hash.toLowerCase().includes(transactionHash.toLowerCase()) &&
      transaction.sender_address.toLowerCase().includes(senderAddress.toLowerCase()) &&
      transaction.block_hash.toLowerCase().includes(maxBlockNumber.toString().toLowerCase()) &&
      transaction.sender_address.toLowerCase().includes(senderAddress.toLowerCase()) &&
      (minTokenAmount !== "" ? transaction.token_amount >= minTokenAmount : true)
    );
  });


  // Statistics calculations
  const totalTransactions = filteredTransactions.length;
  const totalReceived = filteredTransactions
    .filter((transaction) => transaction.receiver_address === "0x9aBED57343F87932DE59a242761477CbDB62a7d0")
    .reduce((sum, transaction) => sum + transaction.token_amount, 0);
  const totalGasPrice = filteredTransactions.reduce((sum, tx) => sum + parseFloat(tx.gas_price), 0);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} h-screen overflow-hidden p-6 transition duration-300`}>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Transactions</h3>
          <p className="text-2xl font-bold">{totalTransactions}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Gas Paid:</h3>
          <p className="text-2xl font-bold">{formatUnits(totalGasPrice, "gwei")} ETH</p>
        </div>
        <div className="bg-teal-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Received</h3>
          <p className="text-2xl font-bold">{totalReceived} tokens</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <input type="text" placeholder="Transaction Hash..." value={transactionHash} onChange={(e) => setTransactionHash(e.target.value)} className="px-4 py-2 bg-gray-200 rounded-lg border border-gray-300" />
        <input type="number" placeholder="Token Amount..." value={minTokenAmount} onChange={(e) => setMinTokenAmount(e.target.value ? parseFloat(e.target.value) : "")} className="px-4 py-2 bg-gray-200 rounded-lg border border-gray-300" />
        <input type="text" placeholder="Block Number..." value={maxBlockNumber} onChange={(e) => setMaxBlockNumber(e.target.value)} className="px-4 py-2 bg-gray-200 rounded-lg border border-gray-300" />
        <input type="text" placeholder="Sender Address" value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} className="px-4 py-2 bg-gray-200 rounded-lg border border-gray-300" />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-500 font-semibold">
          <span className="animate-spin inline-block w-6 h-6 border-4 border-t-4 border-blue-600 rounded-full"></span>
          Loading transactions...
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {/* Transactions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.uuid}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 p-6 cursor-pointer"
              onClick={() => setSelectedTransaction(transaction)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{transaction.property_address}</h3>
              <p className="text-gray-600 mt-2">
                <strong>Transaction Hash:</strong>{" "}
                <a
                  href={`https://etherscan.io/tx/${transaction.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {transaction.hash.slice(0, 10)}...
                </a>
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Token Amount:</strong> {transaction.token_amount} tokens
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Block #{transaction.block_number}</span>
                <span className="text-sm text-gray-500">{transaction.gas_price} Gwei</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No transactions found.</p>
        )}
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl text-gray-900 overflow-y-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Transaction Details</h2>

            {/* Section Container */}
            <div className="space-y-4 text-sm">
              {/* Block Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Block Information</h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <strong>Block Hash:</strong> {selectedTransaction.block_hash}
                  </p>
                  <p>
                    <strong>Block Number:</strong> {selectedTransaction.block_number}
                  </p>
                  <p>
                    <strong>Gas Price:</strong> {selectedTransaction.gas_price} Gwei
                  </p>
                </div>
              </div>

              {/* Transaction Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Transaction Information</h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <strong>Transaction Hash:</strong>{" "}
                    <a
                      href={`https://etherscan.io/tx/${selectedTransaction.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {selectedTransaction.hash.slice(0, 10)}...
                    </a>
                  </p>
                  <p>
                    <strong>Token Amount:</strong> {selectedTransaction.token_amount} tokens
                  </p>
                </div>
              </div>

              {/* Property Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Property Information</h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <strong>Property Address:</strong> {selectedTransaction.property_address}
                  </p>
                </div>
              </div>

              {/* Addresses */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Addresses</h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <strong>Sender Address:</strong> {selectedTransaction.sender_address}
                  </p>
                  <p>
                    <strong>Receiver Address:</strong> {selectedTransaction.receiver_address}
                  </p>
                </div>
              </div>

              {/* UUID */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Additional Info</h3>
                <div className="mt-2">
                  <p>
                    <strong>UUID:</strong> {selectedTransaction.uuid}
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-all"
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

export default BlockchainTransactionScreen;
