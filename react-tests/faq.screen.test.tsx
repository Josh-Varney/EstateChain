jest.mock('aos', () => ({
    init: jest.fn(), // Mock the init function
    refresh: jest.fn(), // Mock the refresh function if used
    refreshHard: jest.fn(), // Mock the refreshHard function if used
    duration: jest.fn(),
    mockOffset: jest.fn()
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FAQForm from "../src/components/landing/faq-page/components/faq-form";
import userEvent from "@testing-library/user-event";
import React from "react";
import { getApprovedQuestions } from "../src/firebase/faq/faq-grab";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "../src/firebase/firebase";
import FAQPage from "../src/components/landing/faq-page/faq"
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom"; 

jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn(() => ({})), // Mock Firestore instance
    collection: jest.fn(() => ({})), // Mock collection reference
    getDocs: jest.fn(), // Mock Firestore `getDocs`
    getDoc: jest.fn(),
    doc: jest.fn()
}));

jest.mock("../src/firebase/faq/faq-grab");


jest.mock("../src/firebase/faq/faq-grab", () => ({
    getApprovedQuestions: jest.fn()
}));

jest.mock("../src/firebase/faq/faq-submit", () => ({
    submitQuestion: jest.fn()
}));

describe("FAQ Validation", () => {
    const mockSetNewQuestion = jest.fn();
    const mockSetNewEmail = jest.fn();
    const mockHandleFormSubmit = jest.fn();

    const initialProps = {
        error: null,
        successMessage: null,
        newQuestion: '',
        setNewQuestion: mockSetNewQuestion,
        newEmail: '',
        setNewEmail: mockSetNewEmail,
        handleFormSubmit: mockHandleFormSubmit,
    };

    beforeEach(() => {
        render(<FAQForm {...initialProps} />);
    });

    test('displays error "Question must be less than 200 characters." if question exceeds 200 characters', async () => {
        jest.clearAllMocks();
    
        // Get the input fields and button
        const questionInput = screen.getByPlaceholderText('Enter your question');
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const formButton = screen.getByRole('button', { name: /Submit Question/i });
    
        // Clear any existing values and input a question longer than 200 characters
        await userEvent.clear(questionInput); // Clear input first
        await userEvent.type(questionInput, 'A'.repeat(204)); // Type 204 characters
    
        // Input a valid email
        await userEvent.clear(emailInput); // Clear email input
        await userEvent.type(emailInput, "test@gmail.com");
    
        // Submit the form
        await userEvent.click(formButton);
    
        // Wait for the validation error to appear
        waitFor(() => {
            // Assert that the validation error is displayed
            expect(screen.getByText(/Question must be less than 200 characters./i)).toBeInTheDocument();
        });
    });

    test('displays passing message "Your question has been successfully submitted!" if question and email are both valid', async () => {
        jest.clearAllMocks();
    
        // Get the input fields and button
        const questionInput = screen.getByPlaceholderText('Enter your question');
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const formButton = screen.getByRole('button', { name: /Submit Question/i });
    
        // Clear any existing values and input a question longer than 200 characters
        await userEvent.clear(questionInput); // Clear input first
        await userEvent.type(questionInput, 'This is a test question?'); 
    
        // Input a valid email
        await userEvent.clear(emailInput); // Clear email input
        await userEvent.type(emailInput, "test@gmail.com");
    
        // Submit the form
        await userEvent.click(formButton);
    
        // Wait for the validation error to appear
        waitFor(() => {
            // Assert that the validation error is displayed
            expect(screen.getByText(/Your question has been successfully submitted!/i)).toBeInTheDocument();
        });
    });

    test('displays passing message "Error: Message should be at least 10 characters long." if question is not at least 10 characters', async () => {
        jest.clearAllMocks();
    
        // Get the input fields and button
        const questionInput = screen.getByPlaceholderText('Enter your question');
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const formButton = screen.getByRole('button', { name: /Submit Question/i });
    
        // Clear any existing values and input a question longer than 200 characters
        await userEvent.clear(questionInput); // Clear input first
        await userEvent.type(questionInput, 'short'); 
    
        // Input a valid email
        await userEvent.clear(emailInput); // Clear email input
        await userEvent.type(emailInput, "short@gmail.com");
    
        // Submit the form
        await userEvent.click(formButton);
    
        // Wait for the validation error to appear
        waitFor(() => {
            // Assert that the validation error is displayed
            expect(screen.getByText(/Error: Message should be at least 10 characters long./i)).toBeInTheDocument();
        });
    });

    test("fetches an array of questions from Firestore", async () => {
        const mockQuestions = [
          {
            email: "user1@example.com",
            message: "What is the capital of France?",
            answer: "Paris",
            status: "answered",
            createdAt: "2025-03-18T12:34:56Z",
          },
          {
            email: "user2@example.com",
            message: "How to use Firestore?",
            answer: "Refer to the Firestore documentation.",
            status: "unanswered",
            createdAt: "2025-03-17T09:21:10Z",
          },
        ];
      
        // Mock Firestore collection
        collection.mockReturnValue({}); // Simulates Firestore collection reference
      
        // Mock getDocs to return a QuerySnapshot
        (getDocs as jest.Mock).mockResolvedValue({
          docs: mockQuestions.map((question, index) => ({
            id: `${index + 1}`,
            data: () => question, // Mock Firestore doc.data()
          })),
        } as unknown as QuerySnapshot<any>); // Cast to QuerySnapshot type
      
        // Fetch the mock data
        const questionsSnapshot = await getDocs(collection(db, "faq/questions"));
        const questions = questionsSnapshot.docs.map((doc) => doc.data());
      
        // Assertions
        expect(questions).toEqual([
            { 
              email: "user1@example.com", 
              message: "What is the capital of France?", 
              answer: "Paris", 
              status: "answered", 
              createdAt: "2025-03-18T12:34:56Z"
            },
            { 
              email: "user2@example.com", 
              message: "How to use Firestore?", 
              answer: "Refer to the Firestore documentation.", 
              status: "unanswered", 
              createdAt: "2025-03-17T09:21:10Z"
            }
          ]);
        expect(questions).toHaveLength(2);
      });
});


describe("FAQPage Invalid and Initial Searches", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Mock the console.warn function to suppress React Router warnings
      jest.spyOn(console, 'warn').mockImplementation(() => {});
    });
  
    test("renders FAQ questions with empty list, returns 'No results found.'", () => {
      // Render the FAQPage component with the mock data
      render(
        <MemoryRouter>
          <FAQPage filteredFAQs={[]} />
        </MemoryRouter>
      );
  
      // Check that the questions are rendered correctly
      expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    });

    test("renders FAQ questions passed in filteredFAQs prop, returns FAQ questions", async () => {
        const mockFilteredFAQs = [
            { message: "What is React?", answer: "A JavaScript library" },
            { message: "What is Node.js?", answer: "A runtime environment" },
        ];

        getApprovedQuestions.mockResolvedValue(mockFilteredFAQs);

        // Render the FAQPage component with the mock data
        render(
          <MemoryRouter>
            <FAQPage filteredFAQs={mockFilteredFAQs} />
          </MemoryRouter>
        );

        // Check that the questions are rendered correctly
        await waitFor(() => {
            expect(screen.getByTestId("faq-question-0")).toBeInTheDocument();
            expect(screen.getByTestId("faq-question-1")).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    test("renders FAQ questions even when search query does not match, returns 'No results found.' ", async () => {
        const mockFilteredFAQs = [
            { message: "What is React?", answer: "A JavaScript library" },
            { message: "What is Node.js?", answer: "A runtime environment" },
        ];

        getApprovedQuestions.mockResolvedValue(mockFilteredFAQs);

        // Render the FAQPage component with the mock data
        render(
          <MemoryRouter>
            <FAQPage />
          </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText("Search for a question...");

        // Simulate typing a search query
        await userEvent.type(searchInput, "useless search");

        // Wait for the component to re-render and reflect the updated state
        await waitFor(() => {
            expect(screen.getByText("No results found.")).toBeInTheDocument();
        });
    });

    test("renders FAQ questions even when search query does not match the 128 characters length, returns 'No results found.' ", async () => {
        const mockFilteredFAQs = [
            { message: "What is React?", answer: "A JavaScript library" },
            { message: "What is Node.js?", answer: "A runtime environment" },
        ];

        getApprovedQuestions.mockResolvedValue(mockFilteredFAQs);

        // Render the FAQPage component with the mock data
        render(
          <MemoryRouter>
            <FAQPage />
          </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText("Search for a question...");

        // Simulate typing a search query
        await userEvent.type(searchInput, "This is a very long search query meant to test how the search functionality handles inputs that are excessively long and not found in the data.");

        // Wait for the component to re-render and reflect the updated state
        await waitFor(() => {
            expect(screen.getByText("No results found.")).toBeInTheDocument();
        });
    });
  });

describe("FAQPage Valid Searches", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        // Mock the console.warn function to suppress React Router warnings
        jest.spyOn(console, 'warn').mockImplementation(() => {});
      });
      
    test("renders FAQ questions with valid search query", async () => {
        const mockFilteredFAQs = [
            { message: "What is React?", answer: "A JavaScript library" },
            { message: "What is Node.js?", answer: "A runtime environment" },
        ];

        getApprovedQuestions.mockResolvedValue(mockFilteredFAQs);

        // Render the FAQPage component with the mock data
        render(
          <MemoryRouter>
            <FAQPage />
          </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText("Search for a question...");

        // Simulate typing a search query
        await userEvent.type(searchInput, "React?");

        // Wait for the component to re-render and reflect the updated state
        await waitFor(() => {
            expect(screen.getByText("What is React?")).toBeInTheDocument();
            expect(screen.queryByText("What is Node.js?")).not.toBeInTheDocument();
        });
    });

    test("renders FAQ questions with valid search query 2.0", async () => {
        const mockFilteredFAQs = [
            { message: "What is React?", answer: "A JavaScript library" },
            { message: "What is Node.js?", answer: "A runtime environment" },
        ];

        getApprovedQuestions.mockResolvedValue(mockFilteredFAQs);

        // Render the FAQPage component with the mock data
        render(
          <MemoryRouter>
            <FAQPage />
          </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText("Search for a question...");

        // Simulate typing a search query
        await userEvent.type(searchInput, "Node.js?");

        // Wait for the component to re-render and reflect the updated state
        await waitFor(() => {
            expect(screen.getByText("What is Node.js?")).toBeInTheDocument();
            expect(screen.queryByText("What is React.js?")).not.toBeInTheDocument();
        });
    });

    test("renders FAQ questions with valid search query 2.0", async () => {
        const mockFilteredFAQs = [
            { message: "What is React?", answer: "A JavaScript library" },
            { message: "What is Node.js?", answer: "A runtime environment" },
        ];

        getApprovedQuestions.mockResolvedValue(mockFilteredFAQs);

        // Render the FAQPage component with the mock data
        render(
          <MemoryRouter>
            <FAQPage />
          </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText("Search for a question...");

        // Simulate typing a search query
        await userEvent.type(searchInput, "What is");

        // Wait for the component to re-render and reflect the updated state
        await waitFor(() => {
            expect(screen.getByText("What is Node.js?")).toBeInTheDocument();
            expect(screen.getByText("What is React?")).toBeInTheDocument();
        });
    });
});