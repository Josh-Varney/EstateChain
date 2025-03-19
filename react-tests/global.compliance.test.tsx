import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmbeddedInfoPage from '../src/components/dummy-portal/components/info/components/Info';
import { ClipboardCopy } from 'lucide-react';
import React from 'react';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          cID: '1',
          fireURL: 'token-1',
          regionCode: 'US-NY',
          govBody: 'NY State',
          lawCode: 'LAW-001',
        },
        {
          cID: '2',
          fireURL: 'token-2',
          regionCode: 'US-CA',
          govBody: 'California',
          lawCode: 'LAW-002',
        },
      ]),
  })
);

describe('Compliance Render and Searches', () => {
  test('renders without crashing and displays compliance data', async () => {
    render(<EmbeddedInfoPage />);

    // Wait for the component to fetch and display data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  });

  test('filters by token name', async () => {
    render(<EmbeddedInfoPage />);

    // Wait for the component to fetch and display data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });

    // Simulate typing in the search field for Token Name
    const searchInput = screen.getByPlaceholderText(/Search by Token Name.../i);
    fireEvent.change(searchInput, { target: { value: 'token-1' } });

    // Wait for the component to re-render and filter the data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.queryByText('token-2')).not.toBeInTheDocument();
    });
  });

  test('filters by token name and displays only token-2', async () => {
    render(<EmbeddedInfoPage />);
  
    // Wait for the component to fetch and display data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  
    // Simulate typing in the search field for Token Name to filter by a partial or full token name that matches only 'token-2'
    const searchInput = screen.getByPlaceholderText(/Search by Token Name.../i);
    fireEvent.change(searchInput, { target: { value: 'token-2' } });
  
    // Wait for the component to re-render and filter the data
    await waitFor(() => {
      // Ensure 'token-1' is not displayed
      expect(screen.queryByText('token-1')).not.toBeInTheDocument();
  
      // Ensure 'token-2' is displayed
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  });
  

  test('filters by token name with no results', async () => {
    render(<EmbeddedInfoPage />);
  
    // Wait for the component to fetch and display data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  
    // Simulate typing in the search field for Token Name with an invalid search term
    const searchInput = screen.getByPlaceholderText(/Search by Token Name.../i);
    fireEvent.change(searchInput, { target: { value: 'non-existent-token' } });
  
    // Wait for the component to re-render and filter the data
    await waitFor(() => {
      // Ensure no tokens are displayed as no matches should exist for the invalid search term
      expect(screen.queryByText('token-1')).not.toBeInTheDocument();
      expect(screen.queryByText('token-2')).not.toBeInTheDocument();
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
  });
  

  test('filters by governing body', async () => {
    render(<EmbeddedInfoPage />);

    // Wait for the component to fetch and display data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });

    // Simulate typing in the search field for Governing Body
    const searchInput = screen.getByPlaceholderText(/Search by Governing Body.../i);
    fireEvent.change(searchInput, { target: { value: 'California' } });

    // Wait for the component to re-render and filter the data
    await waitFor(() => {
      expect(screen.queryByText('token-1')).not.toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  });

  test('filters by governing body and displays only token-2', async () => {
    render(<EmbeddedInfoPage />);
  
    // Wait for the component to fetch and display data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  
    // Simulate typing in the search field for Governing Body to filter by 'California'
    const searchInput = screen.getByPlaceholderText(/Search by Governing Body.../i);
    fireEvent.change(searchInput, { target: { value: 'California' } });
  
    // Wait for the component to re-render and filter the data
    await waitFor(() => {
      // Ensure 'token-1' is not displayed
      expect(screen.queryByText('token-1')).not.toBeInTheDocument();
  
      // Ensure 'token-2' is still displayed
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  });

  test('filters by governing body and shows no results', async () => {
    render(<EmbeddedInfoPage />);
  
    // Wait for the component to fetch and display data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  
    // Simulate typing in the search field for Governing Body with a non-matching term ('NonExistentGov')
    const searchInput = screen.getByPlaceholderText(/Search by Governing Body.../i);
    fireEvent.change(searchInput, { target: { value: 'NonExistentGov' } });
  
    // Wait for the component to re-render and filter the data
    await waitFor(() => {
      // Ensure neither token-1 nor token-2 are displayed
      expect(screen.queryByText('token-1')).not.toBeInTheDocument();
      expect(screen.queryByText('token-2')).not.toBeInTheDocument();
  
      // Ensure 'No results found' is displayed
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
  });
  

  test('no results found when filtering does not match', async () => {
    render(<EmbeddedInfoPage />);

    // Wait for the component to fetch and display data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });

    // Simulate typing in the search field for Token Name with no match
    const searchInput = screen.getByPlaceholderText(/Search by Token Name.../i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent-token' } });

    // Check if the "No results found" message is displayed
    await waitFor(() => {
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
  });
});

describe('Compliance Timed Test', () => {
  
    test('renders and updates within 2 seconds', async () => {
        render(<EmbeddedInfoPage />);
      
        // Wait for the component to fetch and display data (within 2 seconds)
        await waitFor(() => {
            expect(screen.getByText('token-1')).toBeInTheDocument();
            expect(screen.getByText('token-2')).toBeInTheDocument();
        }, { timeout: 2000 });
      });

      test('filters by token name and governing body and updates within 5 seconds', async () => {
        render(<EmbeddedInfoPage />);
      
        // Wait for the component to fetch and display data (within 2 seconds)
        await waitFor(() => {
            expect(screen.getByText('token-1')).toBeInTheDocument();
            expect(screen.getByText('token-2')).toBeInTheDocument();
        }, { timeout: 2000 });
      
        // Get the search input elements for token name and governing body
        const tokenSearchInput = screen.getByPlaceholderText(/Search by Token Name.../i);
        const govSearchInput = screen.getByPlaceholderText(/Search by Governing Body.../i);
      
        // Simulate typing in both search fields
        fireEvent.change(tokenSearchInput, { target: { value: 'token-1' } });
        fireEvent.change(govSearchInput, { target: { value: 'California' } });
      
        // Wait for 5 seconds and check for updates
        await waitFor(() => {
          // Ensure token-1 is in the document after filtering by token name and governing body
          expect(screen.getByText('No results found.')).toBeInTheDocument();
        }, { timeout: 5000 });
      });

      test('filters by token name and updates within 5 seconds', async () => {
        render(<EmbeddedInfoPage />);
      
        // Wait for the component to fetch and display data (within 2 seconds)
        await waitFor(() => {
            expect(screen.getByText('token-1')).toBeInTheDocument();
            expect(screen.getByText('token-2')).toBeInTheDocument();
        }, { timeout: 2000 });
      
        // Get the search input elements for token name
        const tokenSearchInput = screen.getByPlaceholderText(/Search by Token Name.../i);

        // Simulate typing in both search fields
        fireEvent.change(tokenSearchInput, { target: { value: 'token-1' } });
      
        // Wait for 5 seconds and check for updates
        await waitFor(() => {
          // Ensure token-1 is in the document after filtering by token name and governing body
          expect(screen.getByText('token-1')).toBeInTheDocument();
        }, { timeout: 5000 });
      });
      
  });
  