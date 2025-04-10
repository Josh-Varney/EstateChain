
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PropertyGrid from "../src/components/dummy-portal/components/marketplace/components/PropertyGrid";
import PropertyInvestPopup from '../src/components/dummy-portal/components/marketplace/components/PropertyInvestPopUp';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom'; 
import React from 'react';

const mockHouseDisplayed = {
    propertyAddress: "123 Test St, Springfield",
    propertyTokenPrice: 0.5,
    propertyPrice: 1000000,
    propertyType: "House",
    propertyBedrooms: 3,
    propertyBathrooms: 2,
    propertySize: "2000 sqft",
    propertyAdded: "2025-01-01T00:00:00Z",
    propertyAgent: {
      agentName: "John Doe",
      agentEmail: "john@example.com",
    },
    propertyDescription: "A beautiful house in Springfield.",
    propertyLocation: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  };
  
  describe('PropertyGrid', () => {

    beforeAll(() => {
        // Mock console.warn to suppress React Router's warnings during tests
        jest.spyOn(console, 'warn').mockImplementation(() => {});
      });
      
      
    test('renders PropertyGrid component correctly in less than 2s', async () => {
      // Render the component with BrowserRouter to allow useNavigate
      render(
        <BrowserRouter>
          <PropertyGrid darkMode={false} houseDisplayed={mockHouseDisplayed} />
        </BrowserRouter>
      );
  
      // Use waitFor to ensure elements are rendered within 2 seconds
        await waitFor(() => {
            // Check for occurrences of the texts
            expect(screen.getAllByText('123 Test St, Springfield').length).toBeGreaterThan(0);  // Property Address
            expect(screen.getAllByText('ETH 0.50').length).toBeGreaterThan(0);  // Token Price
            expect(screen.getAllByText('House').length).toBeGreaterThan(0);  // Property Type
            expect(screen.getAllByText('3').length).toBeGreaterThan(0);  // Bedrooms
            expect(screen.getAllByText('2').length).toBeGreaterThan(0);  // Bathrooms
        }, { timeout: 2000 });  // Ensure the wait time is 2 seconds
    });

    test('renders tokenization properties (price and token price) in less than 2s', async () => {
        // Render the component with BrowserRouter to allow useNavigate
        render(
          <BrowserRouter>
            <PropertyGrid darkMode={false} houseDisplayed={mockHouseDisplayed} />
          </BrowserRouter>
        );
    
        // Use waitFor to ensure elements are rendered within 2 seconds
        await waitFor(() => {
          // Check for occurrences of the tokenization properties
          expect(screen.getAllByText('ETH 0.50').length).toBeGreaterThan(0);  // Token Price
        }, { timeout: 2000 });  // Ensure the wait time is 2 seconds
      });

    test('renders "Invest Now" button', () => {
        render(
            <BrowserRouter>
            <PropertyGrid darkMode={false} houseDisplayed={mockHouseDisplayed} />
            </BrowserRouter>
        );

        // Check if the "Invest Now" button is in the document
        const button = screen.getByText('Invest Now');
        expect(button).toBeInTheDocument();

        // You can also test if the button has the correct class
        expect(button).toHaveClass('rounded-full', 'px-4', 'py-1', 'text-sm', 'font-medium', 'bg-blue-500');
    });
});

const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    tokenPrice: 0.5,
    propertyID: 12345,
    propertyAddress: "123 Test St, Springfield",
    propertyName: "Test Property",
    totalTokens: 1000,
    tokensLeft: 500,
    tokensSold: 200,
    addedBy: "Test Agent",
    smartAddress: "0x1234567890abcdef",
    propertyDescription: "A beautiful property in Springfield.",
    blockchain: "Ethereum",
    blockchainCurrency: "ETH",
    propertyValuation: 500000,
    rentalExpectancy: 2000,
    contractName: "ERC-20",
    isProject: false,
    isRental: true,
  };

  
describe('PropertyInvestPopup', () => {
    test('renders the modal with necessary elements', () => {
      render(<PropertyInvestPopup {...mockProps} />);
  
      // Check that the modal title is rendered
      expect(screen.getByText('Test Property')).toBeInTheDocument();
  
      // Check for the property description
      expect(screen.getByText('A beautiful property in Springfield.')).toBeInTheDocument();
  
      // Check for the "Blockchain" label and value
      expect(screen.getByText('Blockchain:')).toBeInTheDocument();
      expect(screen.getByText('Ethereum TestNet')).toBeInTheDocument();
  
      // Check for the "Tokens Left" label and value
      expect(screen.getByText('Tokens Left:')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
  
      // Check for the "Invest" button
      const investButton = screen.getByText('Invest');
      expect(investButton).toBeInTheDocument();
  
      // Check for "Cancel" button
      const cancelButton = screen.getByText('Cancel');
      expect(cancelButton).toBeInTheDocument();
  
      // Check for the close icon (FaTimes)
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });
  
    test('closes the modal when close button is clicked', () => {
      render(<PropertyInvestPopup {...mockProps} />);
  
      // Simulate clicking the close button
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
  
      // Ensure the onClose prop function was called
      expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });      
});
