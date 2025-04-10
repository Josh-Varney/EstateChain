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
  test('renders without crashing and displays compliance data in 2s', async () => {
    render(<EmbeddedInfoPage />);

    // Wait for the component to fetch and display data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  });

  test('filters by token name and displays only token-1', async () => {
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

  test('filters by GovBody with input over 255 characters and shows no results', async () => {
    render(<EmbeddedInfoPage />);
  
    // Wait for initial tokens to be displayed
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  
    // Create a long non-matching GovBody search string (256 characters)
    const longGovBodyInput = 'GovX'.repeat(64); 
  
    // Find and update the GovBody search input
    const searchInput = screen.getByPlaceholderText(/Search by GovBody.../i);
    fireEvent.change(searchInput, { target: { value: longGovBodyInput } });
  
    // Wait for the component to re-render and display "No results found"
    await waitFor(() => {
      expect(screen.queryByText('token-1')).not.toBeInTheDocument();
      expect(screen.queryByText('token-2')).not.toBeInTheDocument();
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

  test('no results found when filtering with token name over 255 characters', async () => {
    render(<EmbeddedInfoPage />);
  
    // Wait for the component to fetch and display initial data
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-2')).toBeInTheDocument();
    });
  
    // Create a long token name string (256 characters)
    const longTokenName = 'x'.repeat(256);
  
    // Simulate typing the long token name into the search input
    const searchInput = screen.getByPlaceholderText(/Search by Token Name.../i);
    fireEvent.change(searchInput, { target: { value: longTokenName } });
  
    // Check for "No results found"
    await waitFor(() => {
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
  });  

  describe("Stress Test Timed", () => {
    beforeAll(() => {
      const mockData = Array.from({ length: 1000 }, (_, i) => ({
        cID: `${i + 1}`,
        fireURL: `token-${i + 1}`,
        regionCode: `US-${i}`,
        govBody: `GovBody-${i}`,
        lawCode: `LAW-${String(i).padStart(3, '0')}`,
      }));
    
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
      );
    });
  
  beforeEach(() => {
    global.fetch.mockClear();
  });
  
  test('renders EmbeddedInfoPage with 1000 items without crashing', async () => {
    render(<EmbeddedInfoPage />);
  
    // Pick a few sample tokens to verify
    await waitFor(() => {
      expect(screen.getByText('token-1')).toBeInTheDocument();
      expect(screen.getByText('token-500')).toBeInTheDocument();
      expect(screen.getByText('token-1000')).toBeInTheDocument();
    });
  });
  
  test('measures render time of EmbeddedInfoPage with 1000 items', async () => {
    const start = performance.now();
  
    render(<EmbeddedInfoPage />);
  
    await waitFor(() => {
      expect(screen.getByText('token-1000')).toBeInTheDocument();
    });
  
    const end = performance.now();
    const renderTime = end - start;
  
    console.log(`Render time with 1000 items: ${renderTime.toFixed(2)}ms`);
  
    // Optional performance threshold
    expect(renderTime).toBeLessThan(1000);
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

