// CommunityPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommunityPage from '../src/components/dummy-portal/components/community/components/Community'
import React, { act } from 'react';
import "@testing-library/jest-dom";
import axios from 'axios';

jest.mock('axios');

global.fetch = jest.fn() as jest.Mock;

// Mocking Clipboard API
Object.assign(navigator, {
    clipboard: {
        writeText: jest.fn(),
    },
});

  describe('CommunityPage Render and API Tests', () => {
    beforeEach(() => {
      // Reset the fetch mock before each test
      jest.clearAllMocks();
    });
  
    it('renders no professionals within 2 secs', async () => {
        // Wrap the entire rendering process in act()
        await act(async () => {
          render(<CommunityPage />);
        });
      
        // Wait for the "No results found" message to appear
        await waitFor(() => screen.getByText(/No results found/i));
      
        // Assert that the "No results found" message is in the document
        expect(screen.getByText(/No results found/i)).toBeInTheDocument();
      });

    it('shows error message when the API call fails', async () => {
        // Mock fetch to simulate an API failure
        fetch.mockImplementationOnce(() =>
            Promise.reject(new Error('Failed to fetch professionals'))
        );
        
        // Wrap the entire rendering process in act()
        await act(async () => {
            render(<CommunityPage />);
        });
        
        // Wait for the error message to appear
        await waitFor(() => screen.getByText(/Failed to fetch professionals/i));
        
        // Assert that the error message is in the document
        expect(screen.getByText(/Failed to fetch professionals/i)).toBeInTheDocument();
    }, 200);

    it('renders "No results found" when no professionals are returned from the API', async () => {
        // Mocking axios.get to resolve with an empty list of professionals
        axios.get.mockResolvedValue({
            data: [], // Simulate no professionals returned
        });

        // Render the component
        render(<CommunityPage />);

        // Wait for the "No results found" message to appear
        await waitFor(() => screen.getByText(/No results found/i));

        // Assert that the "No results found" message is in the document
        expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    }, 200);
    
    it("renders professionals when data is returned from API within 2 secs", async () => {
        // Mocking fetch to resolve with a list of professionals
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
            {
                id: 1,
                first_name: "John",
                last_name: "Doe",
                profession: "Developer",
                location: "New York",
                email: "john.doe@example.com",
                phone_number: "123-456-7890",
                linkedin_profile: "https://linkedin.com/in/johndoe",
            },
            {
                id: 2,
                first_name: "Jane",
                last_name: "Smith",
                profession: "Designer",
                location: "California",
                email: "jane.smith@example.com",
                phone_number: "987-654-3210",
                linkedin_profile: "https://linkedin.com/in/janesmith",
            },
            ],
        });

        // Render the component
        render(<CommunityPage />);

        // Wait for the professionals to be rendered
        await waitFor(() => screen.getByText("John Doe"));
        await waitFor(() => screen.getByText("Jane Smith"));

        // Assert that professionals are displayed
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
        expect(screen.getByText("Developer")).toBeInTheDocument();
        expect(screen.getByText("Designer")).toBeInTheDocument();
    }, 200);

    it("renders professionals with all details from API within 2 sec 2.0", async () => {
        // Mock fetch API response
        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => [
            {
              id: 1,
              first_name: "John",
              last_name: "Doe",
              profession: "Developer",
              location: "New York",
              email: "john.doe@example.com",
              phone_number: "123-456-7890",
              linkedin_profile: "https://linkedin.com/in/johndoe",
            },
            {
              id: 2,
              first_name: "Jane",
              last_name: "Smith",
              profession: "Designer",
              location: "California",
              email: "jane.smith@example.com",
              phone_number: "987-654-3210",
              linkedin_profile: "https://linkedin.com/in/janesmith",
            },
          ],
        });
    
        // Render the component
        render(<CommunityPage />);
    
        // Wait for professionals to be displayed
        await waitFor(() => screen.getByText("John Doe"));
        await waitFor(() => screen.getByText("Jane Smith"));
    
        // Assertions for professionals' names
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    
        // Assertions for professions
        expect(screen.getByText("Developer")).toBeInTheDocument();
        expect(screen.getByText("Designer")).toBeInTheDocument();
    
        // Assertions for locations
        expect(screen.getByText("New York")).toBeInTheDocument();
        expect(screen.getByText("California")).toBeInTheDocument();
    
        // Assertions for emails
        expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
        expect(screen.getByText("jane.smith@example.com")).toBeInTheDocument();
    
        // Assertions for phone numbers
        expect(screen.getByText("123-456-7890")).toBeInTheDocument();
        expect(screen.getByText("987-654-3210")).toBeInTheDocument();
    
        const links = screen.getAllByRole("link", { name: "LinkedIn Profile" });
        expect(links[0]).toHaveAttribute("href", "https://linkedin.com/in/johndoe");
        expect(links[1]).toHaveAttribute("href", "https://linkedin.com/in/janesmith");        
      });
});

