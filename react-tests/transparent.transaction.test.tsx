import React from 'react';
import GlobalTransactionsCard from "../src/components/dummy-portal/components/grid-cards/GlobalTransactions";
import { render, screen, fireEvent, waitFor, getByText } from '@testing-library/react';
import { getAllTransactions } from '../src/components/dummy-portal/components/grid-cards/transaction-manager/transaction';
import "@testing-library/jest-dom";

const mockTransactions = [
    {
      tid: 1,
      id: "tx1",
      date: new Date().toISOString(),
      description: "Blockchain Transaction 1",
      amount: 100,
      property_address: "0x1234567890abcdef",
      block_hash: "0xabc123",
      block_number: 100000,
      gas_price: "0.0001",
      sender_address: "0xSenderAddress1",
      receiver_address: "0xReceiverAddress1",
    },
    {
      tid: 2,
      id: "tx2",
      date: new Date().toISOString(),
      description: "Blockchain Transaction 2",
      amount: 200,
      property_address: "0xabcdef1234567890",
      block_hash: "0xdef456",
      block_number: 100001,
      gas_price: "0.0002",
      sender_address: "0xSenderAddress2",
      receiver_address: "0xReceiverAddress2",
    },
  ];

jest.mock('../src/components/dummy-portal/components/grid-cards/transaction-manager/transaction', () => ({
    getAllTransactions: jest.fn()
}));

describe("GlobalTransactionsCard Valid and Timed Tests", () => {
    it("renders without crashing within 2s", () => {
      // Render the component with dummy props
      render(<GlobalTransactionsCard darkMode={false} />);
  
      // Check if the header is present (you can change this to match any text or element from the component)
      expect(screen.getByText(/Global Blockchain Transactions/i)).toBeInTheDocument();
      expect(screen.getByText(/Blockchain Finance Hub/i)).toBeInTheDocument();
    }, 200);

    it('renders without crashing and shows transactions', async () => {
        const mockTransactions = [
            {
              tid: 1,
              id: 'uuid-1',
              date: '2025-03-19T00:00:00.000Z',
              description: 'Blockchain Transaction 1',
              amount: 100,
              property_address: '0x1234567890abcdef',
              block_hash: 'blockhash-1',
              block_number: 12345,
              gas_price: '2000000000',
              sender_address: '0xabcdef1234567890',
              receiver_address: '0x1234567890abcdef'
            },
            {
              tid: 2,
              id: 'uuid-2',
              date: '2025-03-19T00:00:00.000Z',
              description: 'Blockchain Transaction 2',
              amount: 200,
              property_address: '0xabcdef1234567890',
              block_hash: 'blockhash-2',
              block_number: 12346,
              gas_price: '2500000000',
              sender_address: '0x1234567890abcdef',
              receiver_address: '0xabcdef1234567890'
            }
        ];
    
        // Mock the return value of getAllTransactions
        getAllTransactions.mockImplementation((setTransactions) => {
            // Simulate the response by calling setTransactions with mock data
            setTransactions(mockTransactions);
        });
      
    
        // Render the component
        render(<GlobalTransactionsCard darkMode={false} />);
    
        // Wait for the component to update with the mock data
        await waitFor(() => {
          // Query for the first transaction using the test ID
            const transaction1 = screen.getByTestId('transaction-1');
            expect(transaction1).toBeInTheDocument();

        });
      }, 300);

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('renders without crashing and shows 1000 transactions within 4 secs', async () => {
        // Generate 1000 mock transactions
        const mockTransactions = Array.from({ length: 1000 }, (_, index) => ({
          tid: index + 1,
          id: `uuid-${index + 1}`,
          date: new Date().toISOString(),
          description: `Blockchain Transaction ${index + 1}`,
          amount: (index + 1) * 100, // Different amounts for each transaction
          property_address: `0x1234567890abcdef${index}`,
          block_hash: `blockhash-${index + 1}`,
          block_number: 12345 + index,
          gas_price: '2000000000',
          sender_address: `0xabcdef1234567890${index}`,
          receiver_address: `0x1234567890abcdef${index}`,
        }));
    
        // Mock the return value of getAllTransactions
        getAllTransactions.mockImplementation((setTransactions) => {
            // Simulate the response by calling setTransactions with mock data
            setTransactions(mockTransactions);
        });
    
        // Render the component
        render(<GlobalTransactionsCard darkMode={false} />);
    
        // Wait for the component to update with the mock data
        await waitFor(() => {
          // Check that the first and last transactions are rendered
          const transaction1 = screen.getByTestId('transaction-1');
          expect(transaction1).toBeInTheDocument();
    
          const transaction1000 = screen.getByTestId('transaction-1000');
          expect(transaction1000).toBeInTheDocument();
    
        });
    }, 4000);

    it("renders transactions and filters by sender address", async () => {
        // Mock transactions data with various sender addresses
        const mockTransactions = [
          {
            tid: 1,
            id: 'uuid-1',
            date: '2025-03-19T00:00:00.000Z',
            description: 'Blockchain Transaction 1',
            amount: 100,
            property_address: '0x1234567890abcdef',
            block_hash: 'blockhash-1',
            block_number: 12345,
            gas_price: '2000000000',
            sender_address: '0xabcdef1234567890',
            receiver_address: '0x1234567890abcdef',
          },
          {
            tid: 2,
            id: 'uuid-2',
            date: '2025-03-19T00:00:00.000Z',
            description: 'Blockchain Transaction 2',
            amount: 200,
            property_address: '0xabcdef1234567890',
            block_hash: 'blockhash-2',
            block_number: 12346,
            gas_price: '2500000000',
            sender_address: '0x1234567890abcdef',
            receiver_address: '0xabcdef1234567890',
          },
        ];
    
        // Mock the return value of getAllTransactions
        getAllTransactions.mockImplementation((setTransactions) => {
          setTransactions(mockTransactions); // Simulate the response with mock data
        });
    
        // Render the component with darkMode set to false
        render(<GlobalTransactionsCard darkMode={false} />);
    
        // Wait for the component to load and render the transactions
        await waitFor(() => {
            const transaction1 = screen.getByTestId('transaction-1');
            expect(transaction1).toBeInTheDocument();
      
            const transaction2 = screen.getByTestId('transaction-2');
            expect(transaction2).toBeInTheDocument();
        });
    
        // Find the search input element
        const searchInput = screen.getByPlaceholderText(/sender address.../i);
    
        // Simulate typing the search term "0xabcdef1234567890" to filter the transactions
        await fireEvent.change(searchInput, { target: { value: "0xabcdef1234567890" } });
    
        // Wait for the component to update based on the search input
        await waitFor(() => {
          // Ensure only the transactions with the matching sender address are displayed
          const transaction1 = screen.getByTestId('transaction-1');
          expect(transaction1).toBeInTheDocument();
    
          const transaction2 = screen.getByTestId('transaction-2');
          expect(transaction2).toBeInTheDocument();
        });
    });

    it("renders transactions, filters by sender address, and checks link hrefs", async () => {
        // Mock transactions data with various sender addresses
        const mockTransactions = [
          {
            tid: 1,
            id: 'uuid-1',
            date: '2025-03-19T00:00:00.000Z',
            description: 'Blockchain Transaction 1',
            amount: 100,
            property_address: '0x1234567890abcdef',
            block_hash: 'blockhash-1',
            block_number: 12345,
            gas_price: '2000000000',
            sender_address: '0xabcdef1234567890',
            receiver_address: '0x1234567890abcdef',
          },
          {
            tid: 2,
            id: 'uuid-2',
            date: '2025-03-19T00:00:00.000Z',
            description: 'Blockchain Transaction 2',
            amount: 200,
            property_address: '0xabcdef1234567890',
            block_hash: 'blockhash-2',
            block_number: 12346,
            gas_price: '2500000000',
            sender_address: '0x1234567890abcdef',
            receiver_address: '0xabcdef1234567890',
          },
        ];
    
        // Mock the return value of getAllTransactions
        getAllTransactions.mockImplementation((setTransactions) => {
          setTransactions(mockTransactions); // Simulate the response with mock data
        });
    
        // Render the component with darkMode set to false
        render(<GlobalTransactionsCard darkMode={false} />);
    
        // Wait for the component to load and render the transactions
        await waitFor(() => {
          const transaction1 = screen.getByTestId('transaction-1');
          expect(transaction1).toBeInTheDocument();
    
          const transaction2 = screen.getByTestId('transaction-2');
          expect(transaction2).toBeInTheDocument();
        });
    
        // Find the search input element
        const searchInput = screen.getByPlaceholderText(/sender address.../i);
    
        // Simulate typing the search term "0xabcdef1234567890" to filter the transactions
        await fireEvent.change(searchInput, { target: { value: "0xabcdef1234567890" } });
    
        // Wait for the component to update based on the search input
        await waitFor(() => {
          // Ensure only the transactions with the matching sender address are displayed
          const transaction1 = screen.getByTestId('transaction-1');
          expect(transaction1).toBeInTheDocument();
    
          const transaction2 = screen.getByTestId('transaction-2');
          expect(transaction2).toBeInTheDocument();
        });
    
        // Get all links containing the address "0xabcdef1234567890"
        const senderLinks = screen.getAllByRole('link', { name: '0xabcdef1234567890' });
        
        // Assert that each link has the correct href attribute
        senderLinks.forEach(link => {
            expect(link).toHaveAttribute("href", "https://holesky.etherscan.io/address/0xabcdef1234567890");
        });

        // Get all links containing the address "0x1234567890abcdef"
        const receiverLinks = screen.getAllByRole('link', { name: '0x1234567890abcdef' });
        
        // Assert that each link has the correct href attribute
        receiverLinks.forEach(link => {
            expect(link).toHaveAttribute("href", "https://holesky.etherscan.io/address/0x1234567890abcdef");
        });
    });
});

describe("GlobalTransactionsCard Invalid Tests", () => {
    it("renders transactions but invalid input returns 'No transactions match your search.' ", async () => {
        // Mock transactions data with various sender addresses
        const mockTransactions = [
          {
            tid: 1,
            id: 'uuid-1',
            date: '2025-03-19T00:00:00.000Z',
            description: 'Blockchain Transaction 1',
            amount: 100,
            property_address: '0x1234567890abcdef',
            block_hash: 'blockhash-1',
            block_number: 12345,
            gas_price: '2000000000',
            sender_address: '0xabcdef1234567890',
            receiver_address: '0x1234567890abcdef',
          },
          {
            tid: 2,
            id: 'uuid-2',
            date: '2025-03-19T00:00:00.000Z',
            description: 'Blockchain Transaction 2',
            amount: 200,
            property_address: '0xabcdef1234567890',
            block_hash: 'blockhash-2',
            block_number: 12346,
            gas_price: '2500000000',
            sender_address: '0x1234567890abcdef',
            receiver_address: '0xabcdef1234567890',
          },
        ];
    
        // Mock the return value of getAllTransactions
        getAllTransactions.mockImplementation((setTransactions) => {
          setTransactions(mockTransactions); // Simulate the response with mock data
        });
    
        // Render the component with darkMode set to false
        render(<GlobalTransactionsCard darkMode={false} />);
    
        // Wait for the component to load and render the transactions
        await waitFor(() => {
          const transaction1 = screen.getByTestId('transaction-1');
          expect(transaction1).toBeInTheDocument();
    
          const transaction2 = screen.getByTestId('transaction-2');
          expect(transaction2).toBeInTheDocument();
        });
    
        // Find the search input element
        const searchInput = screen.getByPlaceholderText(/sender address.../i);
    
        // Simulate typing the search term "0xabcdef1234567890" to filter the transactions
        await fireEvent.change(searchInput, { target: { value: "rhewjjhwejqfnw geffwwgerfgwqrewgd" } });
    
        // Wait for the component to update based on the search input
        await waitFor(() => {
          // Ensure only the transactions with the matching sender address are displayed
          expect(screen.getByText("No transactions match your search.")).toBeInTheDocument();
        });
    });

    it("renders transactions but invalid input as longer than 255 characters returns 'No transactions match your search.' ", async () => {
        // Mock transactions data with various sender addresses
        const mockTransactions = [
          {
            tid: 1,
            id: 'uuid-1',
            date: '2025-03-19T00:00:00.000Z',
            description: 'Blockchain Transaction 1',
            amount: 100,
            property_address: '0x1234567890abcdef',
            block_hash: 'blockhash-1',
            block_number: 12345,
            gas_price: '2000000000',
            sender_address: '0xabcdef1234567890',
            receiver_address: '0x1234567890abcdef',
          },
          {
            tid: 2,
            id: 'uuid-2',
            date: '2025-03-19T00:00:00.000Z',
            description: 'Blockchain Transaction 2',
            amount: 200,
            property_address: '0xabcdef1234567890',
            block_hash: 'blockhash-2',
            block_number: 12346,
            gas_price: '2500000000',
            sender_address: '0x1234567890abcdef',
            receiver_address: '0xabcdef1234567890',
          },
        ];
    
        // Mock the return value of getAllTransactions
        getAllTransactions.mockImplementation((setTransactions) => {
          setTransactions(mockTransactions); // Simulate the response with mock data
        });
    
        // Render the component with darkMode set to false
        render(<GlobalTransactionsCard darkMode={false} />);
    
        // Wait for the component to load and render the transactions
        await waitFor(() => {
          const transaction1 = screen.getByTestId('transaction-1');
          expect(transaction1).toBeInTheDocument();
    
          const transaction2 = screen.getByTestId('transaction-2');
          expect(transaction2).toBeInTheDocument();
        });
    
        // Find the search input element
        const searchInput = screen.getByPlaceholderText(/sender address.../i);
    
        // Simulate typing the search term "0xabcdef1234567890" to filter the transactions
        await fireEvent.change(searchInput, { target: { value: '0xabcdef1234567890'.repeat(17) } });
    
        // Wait for the component to update based on the search input
        await waitFor(() => {
          // Ensure only the transactions with the matching sender address are displayed
          expect(screen.getByText("No transactions match your search.")).toBeInTheDocument();
        });
    });
})