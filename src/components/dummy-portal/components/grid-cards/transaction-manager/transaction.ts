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
  
export const getAllTransactions = async (setTransactions: (arg0: Transaction[]) => void) => {
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
      transformedData.forEach((tx: Transaction) => {
        uniqueTransactions.set(tx.tid.toString(), tx); // Overwrite any duplicate transactions by tid
      });

      // Convert the Map values back into an array and update the state
      setTransactions(Array.from(uniqueTransactions.values()));
    } catch (e) {
      console.error("Error fetching transactions:", e);
    }
  };