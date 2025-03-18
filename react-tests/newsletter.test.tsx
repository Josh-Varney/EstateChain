import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SubscriptionForm from "../src/components/landing/components/footer/components/footer-form";
import { validateEmail } from "../src/firebase/footer/newsletter";
import React from "react";
import "@testing-library/jest-dom"; 

jest.mock("../src/firebase/footer/newsletter", () => ({
    validateEmail: jest.fn(),
}));


describe("SubscriptionForm Valid", () => {
    beforeEach(() => {
        // Reset any mocks before each test
        jest.clearAllMocks();
      });

    test('displays message "Successfully subscribed to the newsletter!" when valid email with short length is entered', async () => {
        // Mock the validateEmail function to simulate a successful subscription
        validateEmail.mockResolvedValue('Successfully subscribed to the newsletter!');
        
        render(<SubscriptionForm />);
        
        // Input a valid email
        const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        
        // Click the Subscribe button
        fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
        
        // Wait for the success message to appear
        await waitFor(() => expect(screen.getByText(/Successfully subscribed to the newsletter!/i)).toBeInTheDocument());
        
        // Check if the message is green (success)
        expect(screen.getByText(/Successfully subscribed to the newsletter!/i).closest('div')).toHaveClass('bg-green-500');
      });

      test('displays message "Successfully subscribed to the newsletter!" when minimum valid email is entered', async () => {
        // Mock the validateEmail function to simulate a successful subscription
        validateEmail.mockResolvedValue('Successfully subscribed to the newsletter!');
        
        render(<SubscriptionForm />);
        
        // Input a valid email
        const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
        fireEvent.change(emailInput, { target: { value: 'a@b.c' } });
        
        // Click the Subscribe button
        fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
        
        // Wait for the success message to appear
        await waitFor(() => expect(screen.getByText(/Successfully subscribed to the newsletter!/i)).toBeInTheDocument());
        
        // Check if the message is green (success)
        expect(screen.getByText(/Successfully subscribed to the newsletter!/i).closest('div')).toHaveClass('bg-green-500');
      });

      test('displays message "Successfully subscribed to the newsletter!" when valid email with subdomain is entered', async () => {
        // Mock the validateEmail function to simulate a successful subscription
        validateEmail.mockResolvedValue('Successfully subscribed to the newsletter!');
        
        render(<SubscriptionForm />);
        
        // Input a valid email
        const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
        fireEvent.change(emailInput, { target: { value: 'test.email@subdomain.example.com' } });
        
        // Click the Subscribe button
        fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
        
        // Wait for the success message to appear
        await waitFor(() => expect(screen.getByText(/Successfully subscribed to the newsletter!/i)).toBeInTheDocument());
        
        // Check if the message is green (success)
        expect(screen.getByText(/Successfully subscribed to the newsletter!/i).closest('div')).toHaveClass('bg-green-500');
      });

      test('displays message "Successfully subscribed to the newsletter!" when maximum valid email length is entered', async () => {
        // Mock the validateEmail function to simulate a successful subscription
        validateEmail.mockResolvedValue('Successfully subscribed to the newsletter!');
        
        render(<SubscriptionForm />);
        
        const localPart = "a".repeat(64); // Local part (before @), max 64 characters
        const domainPart = "a".repeat(63); // Domain part (after @), max 63 characters
        const email = `${localPart}@${domainPart}.com`; // Valid email format

        // Input a valid email
        const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
        fireEvent.change(emailInput, { target: { value: email } });
        
        // Click the Subscribe button
        fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
        
        // Wait for the success message to appear
        await waitFor(() => expect(screen.getByText(/Successfully subscribed to the newsletter!/i)).toBeInTheDocument());
        
        // Check if the message is green (success)
        expect(screen.getByText(/Successfully subscribed to the newsletter!/i).closest('div')).toHaveClass('bg-green-500');
      });
     
});

describe("SubscriptionForm Invalid", () => {
    beforeEach(() => {
        // Reset any mocks before each test
        jest.clearAllMocks();
      });

      test('displays error message "You are already subscribed" when email is already subscribed to newsletter', async () => {
        // Mock the validateEmail function to simulate the email already being subscribed
        validateEmail.mockResolvedValue('You are already subscribed to the newsletter!');
    
        render(<SubscriptionForm />);
    
        // Input a valid email
        const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
        // Click the Subscribe button
        fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
    
        // Wait for the error message to appear
        await waitFor(() => expect(screen.getByText(/You are already subscribed/i)).toBeInTheDocument());
    
        // Check if the message is red (error)
        expect(screen.getByText(/You are already subscribed/i).closest('div')).toHaveClass('bg-red-500');
      });

      test('displays error message "Please include an "@" in the email address." when email does not contain @', async () => {
        // Mock the validateEmail function to simulate an invalid email
        validateEmail.mockResolvedValue('Invalid email address!');
      
        // Render the SubscriptionForm component
        render(<SubscriptionForm />);
      
        // Input an invalid email
        const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
        fireEvent.change(emailInput, { target: { value: 'test.emailexample.com' } });
      
        // Click the Subscribe button
        fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
      
        // Wait for the error message to appear
        await waitFor(() => {
          const iframe = document.querySelector('iframe');
      
          if (iframe) {
            // Accessing the content of the iframe
            const iframeDocument = iframe.contentWindow?.document;
      
            // Log the full content of the iframe (optional for debugging)
            console.log(iframeDocument?.body.innerHTML);
      
            // Locate the error message in the iframe
            const errorMessage = iframeDocument?.querySelector('.error-message');
      
            // Assert that the error message is displayed with the correct text content
            expect(errorMessage).toHaveTextContent(/Please include an '@' in the email address./);
          }}); 
        });

        test('displays error message "A part following "@" should not contain the symbol "@"." when email contains more than one @', async () => {
            // Mock the validateEmail function to simulate an invalid email
            validateEmail.mockResolvedValue('Invalid email address!');
        
            // Render the SubscriptionForm component
            render(<SubscriptionForm />);
        
            // Input an invalid email
            const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
            fireEvent.change(emailInput, { target: { value: 'test@@example.com' } });
        
            // Click the Subscribe button
            fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
        
            // Wait for the error message to appear
            await waitFor(() => {
                const iframe = document.querySelector('iframe');
            
                if (iframe) {
                  // Accessing the content of the iframe
                  const iframeDocument = iframe.contentWindow?.document;
            
                  // Log the full content of the iframe (optional for debugging)
                  console.log(iframeDocument?.body.innerHTML);
            
                  // Locate the error message in the iframe
                  const errorMessage = iframeDocument?.querySelector('.error-message');
            
                  // Assert that the error message is displayed with the correct text content
                  expect(errorMessage).toHaveTextContent(/A part following '@' should not contain the symbol '@'./);
            }}); 
        });

        test('displays error message "Please enter a part followed by "@". "@b.c" is incomplete." when email consists of invalid format', async () => {
            // Mock the validateEmail function to simulate an invalid email
            validateEmail.mockResolvedValue('Invalid email address!');
        
            // Render the SubscriptionForm component
            render(<SubscriptionForm />);
        
            // Input an invalid email
            const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
            fireEvent.change(emailInput, { target: { value: '@b.c' } });
        
            // Click the Subscribe button
            fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
        
            // Wait for the error message to appear
            await waitFor(() => {
                const iframe = document.querySelector('iframe');
            
                if (iframe) {
                  // Accessing the content of the iframe
                  const iframeDocument = iframe.contentWindow?.document;
            
                  // Log the full content of the iframe (optional for debugging)
                  console.log(iframeDocument?.body.innerHTML);
            
                  // Locate the error message in the iframe
                  const errorMessage = iframeDocument?.querySelector('.error-message');
            
                  // Assert that the error message is displayed with the correct text content
                  expect(errorMessage).toHaveTextContent(/Please enter a part followed by '@'. '@b.c' is incomplete./);
            }}); 
        });

        test('displays error message "Invalid domain format." when email consists of invalid domain name', async () => {
            // Mock the validateEmail function to simulate an invalid email
            validateEmail.mockResolvedValue('Invalid email address!');
        
            // Render the SubscriptionForm component
            render(<SubscriptionForm />);
        
            // Input an invalid email
            const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
            fireEvent.change(emailInput, { target: { value: 'test.email@example.abc' } });
        
            // Click the Subscribe button
            fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
        
            // Wait for the error message to appear
            await waitFor(() => {
                const iframe = document.querySelector('iframe');
            
                if (iframe) {
                  // Accessing the content of the iframe
                  const iframeDocument = iframe.contentWindow?.document;
            
                  // Log the full content of the iframe (optional for debugging)
                  console.log(iframeDocument?.body.innerHTML);
            
                  // Locate the error message in the iframe
                  const errorMessage = iframeDocument?.querySelector('.error-message');
            
                  // Assert that the error message is displayed with the correct text content
                  expect(errorMessage).toHaveTextContent(/Invalid domain format./);
            }}); 
        });

        test('displays error message "Please enter an email address." when email is more than 254 characters', async () => {
            // Mock the validateEmail function to simulate an invalid email
            validateEmail.mockResolvedValue('Invalid email address!');
        
            // Render the SubscriptionForm component
            render(<SubscriptionForm />);

            const longEmail = "a".repeat(65) + "@"+ "a".repeat(190) + ".com"
        
            // Input an invalid email
            const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
            fireEvent.change(emailInput, { target: { value: longEmail } });
        
            // Click the Subscribe button
            fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
        
            // Wait for the error message to appear
            await waitFor(() => {
                const iframe = document.querySelector('iframe');
            
                if (iframe) {
                  // Accessing the content of the iframe
                  const iframeDocument = iframe.contentWindow?.document;
            
                  // Log the full content of the iframe (optional for debugging)
                  console.log(iframeDocument?.body.innerHTML);
            
                  // Locate the error message in the iframe
                  const errorMessage = iframeDocument?.querySelector('.error-message');
            
                  // Assert that the error message is displayed with the correct text content
                  expect(errorMessage).toHaveTextContent(/Please enter an email address./);
            }}); 
        });
});