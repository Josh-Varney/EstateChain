import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FAQForm from "../src/components/landing/faq-page/components/faq-form";
import userEvent from "@testing-library/user-event";
import React from "react";
import { submitQuestion } from "../src/firebase/faq/faq-submit";
import { getApprovedQuestions } from "../src/firebase/faq/faq-grab";
import { collection, getDoc, getDocs, QuerySnapshot, doc } from "firebase/firestore";
import { db } from "../src/firebase/firebase";
import FAQPage from "../src/components/landing/faq-page/faq"
import { MemoryRouter } from "react-router-dom";

jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn(() => ({})), // Mock Firestore instance
    collection: jest.fn(() => ({})), // Mock collection reference
    getDocs: jest.fn(), // Mock Firestore `getDocs`
    getDoc: jest.fn(),
    doc: jest.fn()
  }));
  

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


// describe("Test FAQ System Search", () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//         // Wrap the component in a MemoryRouter or BrowserRouter for routing context
//         render(
//             <MemoryRouter>
//                 <FAQPage />
//             </MemoryRouter>
//         );
//     });

//     it("should display FAQs and filter them based on the search query", async () => {
//         // Simulate FAQ data
//         const faqData = [
//           { message: 'How to use React?', answer: 'React is a JavaScript library for building user interfaces.' },
//           { message: 'What is a state in React?', answer: 'State is an object that stores dynamic data in React.' },
//           { message: 'How to install React?', answer: 'You can install React using npm or yarn.' },
//         ];
      
//         // Instead of using a real fetch or async call, mock the filtered FAQs directly
//         const filteredFAQs = faqData.filter(faq => faq.message.toLowerCase().includes('react'));
      
//         render(<FAQPage filteredFAQs={filteredFAQs} />);  // If your component accepts filteredFAQs as props
        
//         // Wait for the filtered FAQs to be rendered
//         await waitFor(() => screen.getByText("How to use React?"));
//         expect(screen.getByText("How to use React?")).toBeInTheDocument();
        
//         // Additional assertions based on the filtered FAQs
//         expect(screen.queryByText("What is a state in React?")).not.toBeInTheDocument();  // This should be hidden since it doesn't match the search
//         expect(screen.queryByText("How to install React?")).not.toBeInTheDocument();  // This should be hidden
//       });
// });