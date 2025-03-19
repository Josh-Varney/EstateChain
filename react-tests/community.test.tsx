// CommunityPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommunityPage from '../src/components/dummy-portal/components/community/components/Community'
import React, { act } from 'react';
import "@testing-library/jest-dom";
import axios from 'axios';
import userEvent from '@testing-library/user-event';

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

    it("renders professionals with all details from API within 1 sec 2.0", async () => {
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
      }, 100);
});

describe('CommunityPage Critical Tests', () => {
  beforeEach(() => {
    // Mock fetch API response before each test
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
        {
          id: 3,
          first_name: "Alice",
          last_name: "Johnson",
          profession: "Product Manager",
          location: "Chicago",
          email: "alice.johnson@example.com",
          phone_number: "555-123-4567",
          linkedin_profile: "https://linkedin.com/in/alicejohnson",
        },
        {
          id: 4,
          first_name: "Bob",
          last_name: "Miller",
          profession: "Data Scientist",
          location: "Chicago",
          email: "bob.miller@example.com",
          phone_number: "444-789-1234",
          linkedin_profile: "https://linkedin.com/in/bobmiller",
        },
        {
          id: 5,
          first_name: "Emily",
          last_name: "Davis",
          profession: "Software Engineer",
          location: "Seattle",
          email: "emily.davis@example.com",
          phone_number: "222-555-7777",
          linkedin_profile: "https://linkedin.com/in/emilydavis",
        },
        {
          id: 6,
          first_name: "Michael",
          last_name: "Brown",
          profession: "Cybersecurity Analyst",
          location: "Washington, D.C.",
          email: "michael.brown@example.com",
          phone_number: "111-222-3333",
          linkedin_profile: "https://linkedin.com/in/michaelbrown",
        },
      ],
    });
  });

  it("renders all professionals with details in 2s", async () => {
    // Render the component
    render(<CommunityPage />);

    // Wait for professionals to be displayed
    await waitFor(() => screen.getByText("John Doe"));
    await waitFor(() => screen.getByText("Jane Smith"));
    await waitFor(() => screen.getByText("Alice Johnson"));
    await waitFor(() => screen.getByText("Bob Miller"));
    await waitFor(() => screen.getByText("Emily Davis"));
    await waitFor(() => screen.getByText("Michael Brown"));

    // Assertions for professions
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();
    expect(screen.getByText("Product Manager")).toBeInTheDocument();
    expect(screen.getByText("Data Scientist")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Cybersecurity Analyst")).toBeInTheDocument();

    // Assertions for locations
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("California")).toBeInTheDocument();
    expect(screen.getByText("Seattle")).toBeInTheDocument();
    expect(screen.getByText("Washington, D.C.")).toBeInTheDocument();

    // Assertions for emails
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("jane.smith@example.com")).toBeInTheDocument();
    expect(screen.getByText("alice.johnson@example.com")).toBeInTheDocument();
    expect(screen.getByText("bob.miller@example.com")).toBeInTheDocument();
    expect(screen.getByText("emily.davis@example.com")).toBeInTheDocument();
    expect(screen.getByText("michael.brown@example.com")).toBeInTheDocument();

    // Assertions for phone numbers
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    expect(screen.getByText("987-654-3210")).toBeInTheDocument();
    expect(screen.getByText("555-123-4567")).toBeInTheDocument();
    expect(screen.getByText("444-789-1234")).toBeInTheDocument();
    expect(screen.getByText("222-555-7777")).toBeInTheDocument();
    expect(screen.getByText("111-222-3333")).toBeInTheDocument();

    // Assertions for LinkedIn profiles
    const links = screen.getAllByRole("link", { name: "LinkedIn Profile" });
    expect(links[0]).toHaveAttribute("href", "https://linkedin.com/in/johndoe");
    expect(links[1]).toHaveAttribute("href", "https://linkedin.com/in/janesmith");
    expect(links[2]).toHaveAttribute("href", "https://linkedin.com/in/alicejohnson");
    expect(links[3]).toHaveAttribute("href", "https://linkedin.com/in/bobmiller");
    expect(links[4]).toHaveAttribute("href", "https://linkedin.com/in/emilydavis");
    expect(links[5]).toHaveAttribute("href", "https://linkedin.com/in/michaelbrown");
  }, 200);

  it("search fields work with by name within 2s", async () => {
    render(<CommunityPage />);

    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());

    // Get the search input
    const nameInput = screen.getByTestId("search-field");

    // Simulate typing "John" in the name input
    userEvent.type(nameInput, "John");

    // Expect only "John Doe" to be visible
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    });
  }, 200);

  it("search fields work with by profession within 2s", async () => {
    render(<CommunityPage />);

    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());

    // Get the search input
    const professionInput = screen.getByTestId("profession-field");

    // Simulate typing "John" in the name input
    userEvent.type(professionInput, "Cybersecurity Analyst");

    // Expect only "John Doe" to be visible
    await waitFor(() => {
      expect(screen.getByText("Michael Brown")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  }, 200);

  it("search fields work with by location within 2s", async () => {
    render(<CommunityPage />);

    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());

    // Get the search input
    const locationInput = screen.getByTestId("location-field");

    // Simulate typing "John" in the name input
    userEvent.type(locationInput, "Chicago");

    // Expect only "John Doe" to be visible
    await waitFor(() => {
      expect(screen.getByText("Bob Miller")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      expect(screen.queryByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  }, 200)

  it("combined search fields work with by location within 2s", async () => {
    render(<CommunityPage />);

    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());

    // Get the search input
    const locationInput = screen.getByTestId("location-field");
    const nameInput = screen.getByTestId("search-field");

    // Simulate typing "John" in the name input
    userEvent.type(locationInput, "Chicago");
    userEvent.type(nameInput, "Bob")

    // Expect only "John Doe" to be visible
    await waitFor(() => {
      expect(screen.getByText("Bob Miller")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  }, 200)

  it("combined search fields work within 2s 2.0 returns 'No results found.' as extraneous searches", async () => {
    render(<CommunityPage />);

    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());

    // Get the search input
    const locationInput = screen.getByTestId("location-field");
    const nameInput = screen.getByTestId("search-field");
    const professionInput = screen.getByTestId("profession-field");

    // Simulate typing "John" in the name input
    userEvent.type(locationInput, "Chicago");
    userEvent.type(nameInput, "Bob")
    userEvent.type(professionInput, "hdhsdhs")

    // Expect only "John Doe" to be visible
    await waitFor(() => {
      expect(screen.getByText("No results found.")).toBeInTheDocument();
    });
  }, 200)

  it("combined search fields work within 2s 2.0 returns 'No results found.' as extraneous searches", async () => {
    render(<CommunityPage />);

    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());

    const nameInput = screen.getByTestId("search-field");
    const professionInput = screen.getByTestId("profession-field");

    userEvent.type(nameInput, "shfjdkjdshfdjqdkdsjnfqdd")
    userEvent.type(professionInput, "      ")

    // Expect only "John Doe" to be visible
    await waitFor(() => {
      expect(screen.getByText("No results found.")).toBeInTheDocument();
    });
  }, 200);

  it("combined search fields work within 2s 2.0 returns 'No results found.' as extraneous searches", async () => {
    render(<CommunityPage />);

    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());

    // Get the search input
    const locationInput = screen.getByTestId("location-field");
    const nameInput = screen.getByTestId("search-field");
    const professionInput = screen.getByTestId("profession-field");

    // Simulate typing "John" in the name input
    userEvent.type(locationInput, "3883848484848");
    userEvent.type(nameInput, "4ui3ui242")
    userEvent.type(professionInput, "1111111")

    // Expect only "John Doe" to be visible
    await waitFor(() => {
      expect(screen.getByText("No results found.")).toBeInTheDocument();
    });
  }, 200)
});


