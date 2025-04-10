import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateAccountForm from "../src/components/form/create-account/components/create-account-form"
import { doCreateUserWithEmailAndPassword, doSendEmailVerification } from "../src/firebase/auth";
import "@testing-library/jest-dom";


import React from "react";

jest.mock('firebase/auth');

jest.mock("../src/firebase/auth", () => ({
    doCreateUserWithEmailAndPassword: jest.fn(),
    doSendEmailVerification: jest.fn(),
}));

describe('CreateAccountForm', () => {
    let setError: jest.Mock;
    let setSuccess: jest.Mock;

    beforeEach(() => {
        setError = jest.fn();
        setSuccess = jest.fn();

        render(<CreateAccountForm />);
    });

    describe("Create Account Valid Tests", () => {

        it("Terms and Conditions need to be agreed first", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
        
            fireEvent.change(emailInput, { target: { value: "test@example.com" } });
            fireEvent.change(passwordInput, { target: { value: "Password123" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "WrongPassword123" } });
        
            fireEvent.click(submitButton);
        
            const errorMessage = await screen.findByText("You must agree to the Terms & Conditions to create an account.");
            expect(errorMessage).toBeInTheDocument();
        });

        it("passwords do not match", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);
        
            fireEvent.change(emailInput, { target: { value: "test@example.com" } });
            fireEvent.change(passwordInput, { target: { value: "Password123" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "Password" } });
            fireEvent.click(termsCheckbox);
        
            fireEvent.click(submitButton);
        
            // Expect the error message about passwords not matching
            const errorMessage = await screen.findByText("Passwords do not match");
            expect(errorMessage).toBeInTheDocument();
        });

        it("successfully submits when terms are agreed and passwords match 1.0", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);
        
            fireEvent.change(emailInput, { target: { value: "test@example.com" } });
            fireEvent.change(passwordInput, { target: { value: "Password123" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });
            fireEvent.click(termsCheckbox);
        
            fireEvent.click(submitButton);
        
            // Expect the success message after submission
            const successMessage = await screen.findByText("Account created successfully");
            expect(successMessage).toBeInTheDocument();
        }, 500);
        
        it("successfully submits when terms are agreed and passwords match 2.0", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);
        
            fireEvent.change(emailInput, { target: { value: "test@example.com" } });
            fireEvent.change(passwordInput, { target: { value: "Test-password11" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "Test-password11" } });
            fireEvent.click(termsCheckbox);
        
            fireEvent.click(submitButton);
        
            // Expect the success message after submission
            const successMessage = await screen.findByText("Account created successfully");
            expect(successMessage).toBeInTheDocument();
        }, 500);

        it("successfully submits when terms are agreed and passwords match 3.0", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);
        
            fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "StrongPas#123" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "StrongPas#123" } });
            fireEvent.click(termsCheckbox);
        
            fireEvent.click(submitButton);
        
            // Expect the success message after submission
            const successMessage = await screen.findByText("Account created successfully");
            expect(successMessage).toBeInTheDocument();
        }, 500);

        it("successfully submits when terms are agreed and passwords match, even with a 254-character email", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);
        
            fireEvent.change(emailInput, { target: { value: "thisisaverylongemailaddressjustfortestingpurposesthatexceedstwentycharactersandcanbeusedfortestsinsoftwareapplications@longdomainexample.com" } });
            fireEvent.change(passwordInput, { target: { value: "Secure@123" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "Secure@123" } });
            fireEvent.click(termsCheckbox);
        
            fireEvent.click(submitButton);
        
            // Expect the success message after submission
            const successMessage = await screen.findByText("Account created successfully");
            expect(successMessage).toBeInTheDocument();
        }, 500);
        it("successfully submits when terms are agreed and passwords match, even with a 128-character password", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);
        
            fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "AValidPassword12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "AValidPassword12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012" } });
            fireEvent.click(termsCheckbox);
        
            fireEvent.click(submitButton);
        
            // Expect the success message after submission
            const successMessage = await screen.findByText("Account created successfully");
            expect(successMessage).toBeInTheDocument();
        });
    });

    describe("Create Account Invalid Tests", () => {

        it("unsuccessfully submits when the email is missing '@' and '.com'", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);

            fireEvent.change(emailInput, { target: { value: "test.com" } });
            fireEvent.change(passwordInput, { target: { value: "test-password1" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "test-password1" } });
            fireEvent.click(termsCheckbox);

            fireEvent.click(submitButton);

            // Expect the error message related to invalid email format
            const iframe = document.querySelector('iframe');  


            if (iframe) {
            // Accessing the content of the iframe
            const iframeDocument = iframe.contentWindow?.document;

            // Log the full content of the iframe
            console.log(iframeDocument?.body.innerHTML);

            const errorMessage = iframeDocument?.querySelector('.error-message'); 
            
            // You can also assert on the text content in testing
            expect(errorMessage).toHaveTextContent(/Please include an '@' in the email address./);
        }
        });

        it("shows password validation error for passwords less than 9 characters even with terms agreed", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);
        
            fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "test" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "test" } });
            fireEvent.click(termsCheckbox);
        
            fireEvent.click(submitButton);
        
            // Expect the success message after submission
            const successMessage = await screen.findByText("Password must be at least 9 characters, contain at least one uppercase letter, one number, and be less than 128 characters.");
            expect(successMessage).toBeInTheDocument();
        });

        it("shows email validation error for emails longer than 254 characters", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);
            
            // Test with email longer than 254 characters (mock user with 245 "a" characters and "@gmail.com")
            const longEmail = "a".repeat(245) + "@gmail.com";
            
            fireEvent.change(emailInput, { target: { value: longEmail } });
            fireEvent.change(passwordInput, { target: { value: "validPassword123" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "validPassword123" } });
            fireEvent.click(termsCheckbox);
            
            fireEvent.click(submitButton);
            
            // Expect the email validation error message
            const errorMessage = await screen.findByText("Invalid email address. Too long or wrong format.");
            expect(errorMessage).toBeInTheDocument();
        });
        
        it("shows password validation error for passwords longer than 128 characters", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);
            
            // Test with password longer than 128 characters
            const longPassword = "thisisaverylongpasswordthatexceedsthemaxlengthbyonecharacteranditshouldfailbecauseitismorethan128characterslong";
            
            fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: longPassword } });
            fireEvent.change(confirmPasswordInput, { target: { value: longPassword } });
            fireEvent.click(termsCheckbox);
            
            fireEvent.click(submitButton);
            
            // Expect the password validation error message
            const errorMessage = await screen.findByText("Password must be at least 9 characters, contain at least one uppercase letter, one number, and be less than 128 characters.");
            expect(errorMessage).toBeInTheDocument();
        });        

        it("shows email validation error for invalid email without '.com'", async () => {
            const emailInput = screen.getByTestId("email-input");
            const passwordInput = screen.getByTestId("password-input");
            const confirmPasswordInput = screen.getByTestId("password-confirm-input");
            const submitButton = screen.getByRole("button", { name: /create account/i });
            const termsCheckbox = screen.getByLabelText(/i agree to terms & conditions/i);
            
            // Test with email missing '.com'
            const invalidEmail = "test@gmail";
            
            fireEvent.change(emailInput, { target: { value: invalidEmail } });
            fireEvent.change(passwordInput, { target: { value: "test-password1" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "test-password1" } });
            fireEvent.click(termsCheckbox);
            
            fireEvent.click(submitButton);
            
            // Expect the email validation error message
            const errorMessage = await screen.findByText("Invalid email address. Too long or wrong format.");
            expect(errorMessage).toBeInTheDocument();
        });
        
    });
});
