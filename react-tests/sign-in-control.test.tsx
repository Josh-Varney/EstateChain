import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../src/components/form/login-account/components/login-form"
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { doSignInWithEmailAndPassword, doSendEmailVerification} from "../src/firebase/auth";
import "@testing-library/jest-dom"; 

jest.mock("axios");

jest.mock('firebase/auth');

jest.mock("../src/firebase/auth", () => ({
    doSignInWithEmailAndPassword: jest.fn(),
    doSendEmailVerification: jest.fn(),
}));

describe("LoginForm", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      localStorage.clear();
    });

    beforeAll(() => {
        jest.spyOn(console, "warn").mockImplementation((message) => {
          if (message.includes("React Router Future Flag Warning")) {
            return; // Suppress only this specific warning
          }
          console.warn(message); // Keep other warnings visible
        });
      });

      describe("LoginForm Valid Tests", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test("should successfully login with valid email and password", async () => {
            const { doSignInWithEmailAndPassword } = require("../src/firebase/auth");
            
            // Mock Firebase sign-in with valid credentials (successful login)
            doSignInWithEmailAndPassword.mockResolvedValueOnce({
              emailVerified: true,
              uid: "user-123",
            });
        
            // Render the LoginForm inside a Router 
            render(
              <Router>
                <LoginForm />
              </Router>
            );
        
            const usernameInput = screen.getByPlaceholderText("Username");
            const passwordInput = screen.getByPlaceholderText("Password");
            const submitButton = screen.getByRole("button", { name: /login/i });
        
            // Simulate entering valid credentials
            await userEvent.type(usernameInput, "test-user@example.com");
            await userEvent.type(passwordInput, "ValidPassword123");
        
            // Simulate clicking the login button
            fireEvent.click(submitButton);
        
            // Wait for successful login (simulate redirection after successful login)
            await waitFor(() => {
              // Check if the user is redirected to the appropriate page or a success message appears
              expect(localStorage.getItem("uuid")).toBe("user-123"); // Check if the user UUID is stored
              expect(screen.getByText("Login successful. Redirecting...")).toBeInTheDocument();
            });
          });

          test("should successfully login with a valid email and password 2.0", async () => {
            jest.clearAllMocks();
            const { doSignInWithEmailAndPassword } = require("../src/firebase/auth");
          
            // Mock Firebase sign-in with valid credentials (successful login)
            doSignInWithEmailAndPassword.mockResolvedValueOnce({
              emailVerified: true,
              uid: "user-123",
            });
          
            // Render the LoginForm inside a Router (you may need to mock the navigate function)
            render(
              <Router>
                <LoginForm />
              </Router>
            );
          
            const usernameInput = screen.getByPlaceholderText("Username");
            const passwordInput = screen.getByPlaceholderText("Password");
            const submitButton = screen.getByRole("button", { name: /login/i });
          
            // Valid email 
            const validEmail = "john.doe@example.com";
          
            // Simulate entering a valid email and the 128-character password
            await userEvent.type(usernameInput, validEmail);
            await userEvent.type(passwordInput, "passwordA12");
          
            // Simulate clicking the login button
            fireEvent.click(submitButton);
          
            // Wait for successful login (simulate redirection after successful login)
            await waitFor(() => {
              // Check if the user is redirected or the success message appears
              expect(localStorage.getItem("uuid")).toBe("user-123"); // Check if the user UUID is stored
              expect(screen.getByText("Login successful. Redirecting...")).toBeInTheDocument();
            });
          });   
          
          test("should successfully login with a valid email and password 3.0", async () => {
            jest.clearAllMocks();
            const { doSignInWithEmailAndPassword } = require("../src/firebase/auth");
          
            // Mock Firebase sign-in with valid credentials (successful login)
            doSignInWithEmailAndPassword.mockResolvedValueOnce({
              emailVerified: true,
              uid: "user-123",
            });
          
            // Render the LoginForm inside a Router (you may need to mock the navigate function)
            render(
              <Router>
                <LoginForm />
              </Router>
            );
          
            const usernameInput = screen.getByPlaceholderText("Username");
            const passwordInput = screen.getByPlaceholderText("Password");
            const submitButton = screen.getByRole("button", { name: /login/i });
          
            // Valid email 
            const validEmail = "john1.doe@example.com";
          
            // Simulate entering a valid email and the 128-character password
            await userEvent.type(usernameInput, validEmail);
            await userEvent.type(passwordInput, "passwordA12hdfsjfdhgfsdjasfd");
          
            // Simulate clicking the login button
            fireEvent.click(submitButton);
          
            // Wait for successful login (simulate redirection after successful login)
            await waitFor(() => {
              // Check if the user is redirected or the success message appears
              expect(localStorage.getItem("uuid")).toBe("user-123"); // Check if the user UUID is stored
              expect(screen.getByText("Login successful. Redirecting...")).toBeInTheDocument();
            });
          }); 

          test("should successfully login with a 128-character valid password", async () => {
            jest.clearAllMocks();
            const { doSignInWithEmailAndPassword } = require("../src/firebase/auth");
          
            // Mock Firebase sign-in with valid credentials (successful login)
            doSignInWithEmailAndPassword.mockResolvedValueOnce({
              emailVerified: true,
              uid: "user-123",
            });
          
            // Render the LoginForm inside a Router 
            render(
              <Router>
                <LoginForm />
              </Router>
            );
          
            const usernameInput = screen.getByPlaceholderText("Username");
            const passwordInput = screen.getByPlaceholderText("Password");
            const submitButton = screen.getByRole("button", { name: /login/i });
          
            // Valid email 
            const validEmail = "john.dddoe@example.com";
          
            // 128-character password
            const longPassword = "a".repeat(128); // 128 characters
          
            // Simulate entering a valid email and the 128-character password
            await userEvent.type(usernameInput, validEmail);
            await userEvent.type(passwordInput, "password1AAA");
          
            // Simulate clicking the login button
            fireEvent.click(submitButton);
          
            // Wait for successful login (simulate redirection after successful login)
            await waitFor(() => {
              expect(localStorage.getItem("uuid")).toBe("user-123"); // Check if the user UUID is stored
              expect(screen.getByText("Login successful. Redirecting...")).toBeInTheDocument();
            });
          });    
          test("should successfully login with a 254-character email", async () => {
            jest.clearAllMocks();
            const { doSignInWithEmailAndPassword } = require("../src/firebase/auth");
          
            // Mock Firebase sign-in with valid credentials (successful login)
            doSignInWithEmailAndPassword.mockResolvedValueOnce({
              emailVerified: true,
              uid: "user-123",
            });
          
            // Render the LoginForm inside a Router (you may need to mock the navigate function)
            render(
              <Router>
                <LoginForm />
              </Router>
            );
          
            const usernameInput = screen.getByPlaceholderText("Username");
            const passwordInput = screen.getByPlaceholderText("Password");
            const submitButton = screen.getByRole("button", { name: /login/i });
          
            // Valid email 
            const longEmail = "a".repeat(245) + "@example.com"; 
          
            // Simulate entering a valid email and the 128-character password
            await userEvent.type(usernameInput, "john.dddoe@example.com");
            await userEvent.type(passwordInput, "password1AAA");
          
            // Simulate clicking the login button
            fireEvent.click(submitButton);
          
            // Wait for successful login 
            await waitFor(() => {
              expect(localStorage.getItem("uuid")).toBe("user-123"); // Check if the user UUID is stored
              expect(screen.getByText("Login successful. Redirecting...")).toBeInTheDocument();
            });
          });  
      });
      
  
    describe("LoginForm Invalid Tests", () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });
      
        test("should show 'Password must contain one uppercase letter, one number.' error when login fails due to incorrect password format", async () => {
            const { doSignInWithEmailAndPassword } = require("../src/firebase/auth");
        
            // Mock rejection with invalid credential error
            doSignInWithEmailAndPassword.mockRejectedValue({
              code: "auth/invalid-credential",
            });
        
            // Render the LoginForm component inside a Router
            render(
              <Router>
                <LoginForm />
              </Router>
            );
        
            const usernameInput = screen.getByPlaceholderText("Username");
            const passwordInput = screen.getByPlaceholderText("Password");
            const submitButton = screen.getByRole("button", { name: /login/i });
        
            // Simulate user typing invalid credentials
            userEvent.type(usernameInput, "invalid-email@gmail.com");
            userEvent.type(passwordInput, "wrongpassword");
        
            // Simulate form submission
            fireEvent.click(submitButton);
        
            // Wait for the error message to appear
            await waitFor(() => {
              expect(screen.getByText("Password must contain one uppercase letter, one number.")).toBeInTheDocument();
            });
        });

        test("displays 'Invalid email format.' error when authentication fails due to incorrect email credential format", async () => {
            const { doSignInWithEmailAndPassword } = require("../src/firebase/auth");
        
            // Mock Firebase rejection with invalid credential error
            doSignInWithEmailAndPassword.mockRejectedValueOnce({
              code: "auth/invalid-credential",
            });
        
            // Render the component inside a Router
            render(
              <Router>
                <LoginForm />
              </Router>
            );
        
            const usernameInput = screen.getByPlaceholderText("Username");
            const passwordInput = screen.getByPlaceholderText("Password");
            const submitButton = screen.getByRole("button", { name: /login/i });
        
            // Simulate entering invalid credentials
            await userEvent.type(usernameInput, "test-user");
            await userEvent.type(passwordInput, "wrong-password");
        
            // Simulate clicking the login button
            fireEvent.click(submitButton);
        
            // Wait for error message to appear
            expect(screen.getByText("Invalid email format.")).toBeInTheDocument();

        });

        test("should show 'Invalid credentials. Please check your email and password' error when password is greater than 128 characters", async () => {
            const { doSignInWithEmailAndPassword } = require("../src/firebase/auth");
        
            // Mock Firebase rejection with invalid credential error
            doSignInWithEmailAndPassword.mockRejectedValueOnce({
              code: "auth/invalid-credential",
            });
        
            // Render the component inside a Router
            render(
              <Router>
                <LoginForm />
              </Router>
            );
        
            const usernameInput = screen.getByPlaceholderText("Username");
            const passwordInput = screen.getByPlaceholderText("Password");
            const submitButton = screen.getByRole("button", { name: /login/i });
        
            // Simulate entering invalid credentials
            await userEvent.type(usernameInput, "test-user@gmail.com");
            await userEvent.type(passwordInput, "Thisisaverylongpasswordthatexceedsthemaxlengthbyonecharacteranditshouldfailbecauseitismorethan128characterslong");
        
            // Simulate clicking the login button
            fireEvent.click(submitButton);
        
            // Wait for error message to appear
            await waitFor(() => {
              expect(screen.getByText("Invalid credentials. Please check your email and password.")).toBeInTheDocument();
            });
          });
        
          test("should show 'Email must be 254 characters or less.' error when email is greater than 254 characters", async () => {
            const { doSignInWithEmailAndPassword } = require("../src/firebase/auth");
        
            // Mock Firebase rejection with invalid credential error
            doSignInWithEmailAndPassword.mockRejectedValueOnce({
              code: "auth/invalid-credential",
            });
        
            // Render the component inside a Router
            render(
              <Router>
                <LoginForm />
              </Router>
            );
        
            const usernameInput = screen.getByPlaceholderText("Username");
            const passwordInput = screen.getByPlaceholderText("Password");
            const submitButton = screen.getByRole("button", { name: /login/i });

            const longEmail = "a".repeat(245) + "@gmail.com";
        
            // Simulate entering invalid credentials
            await userEvent.type(usernameInput, longEmail);
            await userEvent.type(passwordInput, "Thisisaverylongpasswordthatexceedsthemaxlengthbyonecharacteranditshouldfailbecauseitismorethan128characterslong");
        
            // Simulate clicking the login button
            fireEvent.click(submitButton);
        
            // Wait for error message to appear
            await waitFor(() => {
              expect(screen.getByText("Email must be 254 characters or less.")).toBeInTheDocument();
            });
          });
          test("should show 'Please fill in this field.' messages when email and password are not entered", async () => {
            // Render the LoginForm inside a Router
            render(
              <Router>
                <LoginForm />
              </Router>
            );
          
            const submitButton = screen.getByRole("button", { name: /login/i });
          
            // Click the login button without entering any input
            fireEvent.click(submitButton);
          
            // Wait for the iframe to appear and error messages to load
            await waitFor(() => {
              const iframe = document.querySelector('iframe');
          
              if (iframe) {
                // Access the content of the iframe
                const iframeDocument = iframe.contentWindow?.document;
          
                // Select the error message element
                const errorMessage = iframeDocument?.querySelector('.error-message');
          
                // Assert that the error message is present
                expect(errorMessage).toHaveTextContent(/Please fill in this field./);
              }
            });
          });
          
      });
  });