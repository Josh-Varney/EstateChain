import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import { addAnswerToFAQ, fetchFAQs, rejectFAQInFirestore } from "../src/components/admin-portal/admin-manager/get";
import ManageFAQ from '../src/components/admin-portal/components/manage-faq';

jest.mock('axios');
global.fetch = jest.fn() as jest.Mock;
jest.mock("../src/components/admin-portal/admin-manager/get")


describe('Admin Manage FAQ', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should display FAQs when fetched in 2s", async () => {
        (fetchFAQs as jest.Mock).mockResolvedValue([
          {
            createdAt: "123",
            message: "How do I reset my password?",
            answer: "",
            email: "user@example.com",
          },
        ]);
    
        render(<ManageFAQ />);
    
        expect(screen.getByText("Refreshing...")).toBeInTheDocument();
    
        await waitFor(() => expect(fetchFAQs).toHaveBeenCalled());
    
        expect(screen.getByText("How do I reset my password?")).toBeInTheDocument();
        expect(screen.getByText("No answer yet.")).toBeInTheDocument();
      }, 200);

      it("should handle an influx of 1000 FAQs efficiently", async () => {
        // Generate 1000 mock FAQs
        const mockFAQs = Array.from({ length: 1000 }, (_, i) => ({
          createdAt: `${i}`,
          message: `FAQ Question ${i + 1}`,
          answer: "",
          email: `user${i}@example.com`,
        }));
    
        // Mock fetchFAQs to return these 1000 FAQs
        (fetchFAQs as jest.Mock).mockResolvedValue(mockFAQs);
    
        // Start time tracking
        const startTime = performance.now();
    
        render(<ManageFAQ />);
    
        // Wait for FAQs to be fetched
        await waitFor(() => expect(fetchFAQs).toHaveBeenCalled());
    
        // Ensure all FAQs are loaded
        await waitFor(() => expect(screen.getByText("FAQ Question 1")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("FAQ Question 1000")).toBeInTheDocument());
    
        // End time tracking
        const endTime = performance.now();
        const timeTaken = endTime - startTime;
    
        console.log(`Time taken to load 1000 FAQs: ${timeTaken.toFixed(2)}ms`);
    
        // Expect performance threshold (example: under 2000ms)
        expect(timeTaken).toBeLessThan(2000);
      });

      it("should allow admin to respond to a question", async () => {
        (fetchFAQs as jest.Mock).mockResolvedValue([
          {
            createdAt: "456",
            message: "Where can I find the refund policy?",
            answer: "",
            email: "user2@example.com",
          },
        ]);
    
        (addAnswerToFAQ as jest.Mock).mockResolvedValue(true);
    
        render(<ManageFAQ />);
        await waitFor(() => expect(fetchFAQs).toHaveBeenCalled());
    
        const textarea = screen.getByPlaceholderText("Add your response...");
        fireEvent.change(textarea, { target: { value: "You can find it on our website under policies." } });
    
        const sendButton = screen.getByText("Approve & Respond");
        fireEvent.click(sendButton);
    
        await waitFor(() => expect(addAnswerToFAQ).toHaveBeenCalledWith("456", "You can find it on our website under policies."));
      });
      

      it("should allow admin to reject a question", async () => {
        (fetchFAQs as jest.Mock).mockResolvedValue([
          {
            createdAt: "789",
            message: "Can I change my email address?",
            answer: "",
            email: "user3@example.com",
          },
        ]);
    
        (rejectFAQInFirestore as jest.Mock).mockResolvedValue(true);
    
        render(<ManageFAQ />);
        await waitFor(() => expect(fetchFAQs).toHaveBeenCalled());
    
        const rejectButton = screen.getByText("Reject");
        fireEvent.click(rejectButton);
    
        await waitFor(() => expect(rejectFAQInFirestore).toHaveBeenCalledWith("789"));
      });

      it("should allow admin to reject a question and remove it from the screen with 2s", async () => {
        // Mock the response for fetching FAQs
        (fetchFAQs as jest.Mock).mockResolvedValue([
          {
            createdAt: "789",
            message: "Can I change my email address?",
            answer: "",
            email: "user3@example.com",
          },
        ]);
      
        // Mock rejectFAQInFirestore to simulate successful rejection
        (rejectFAQInFirestore as jest.Mock).mockResolvedValue(true);
      
        render(<ManageFAQ />);
      
        // Wait for FAQs to be fetched and rendered
        await waitFor(() => expect(fetchFAQs).toHaveBeenCalled());
      
        // Ensure the FAQ is on the screen before rejecting
        expect(screen.getByText("Can I change my email address?")).toBeInTheDocument();
      
        // Find and click the "Reject" button
        const rejectButton = screen.getByText("Reject");
        fireEvent.click(rejectButton);
      
        // Wait for the rejectFAQInFirestore call to complete
        await waitFor(() => expect(rejectFAQInFirestore).toHaveBeenCalledWith("789"));
      
        // Ensure the FAQ has been removed from the screen
        await waitFor(() => expect(screen.queryByText("Can I change my email address?")).toBeNull());
      }, 200);

      it("should not remove faq if admin tries to respond with an empty response", async () => {
        // Mock the response for fetching FAQs
        (fetchFAQs as jest.Mock).mockResolvedValue([
          {
            createdAt: "456",
            message: "Where can I find the refund policy?",
            answer: "",
            email: "user2@example.com",
          },
        ]);
      
        // Mock addAnswerToFAQ to simulate the answer being submitted
        (addAnswerToFAQ as jest.Mock).mockResolvedValue(true);
      
        render(<ManageFAQ />);
      
        // Wait for FAQs to be fetched and rendered
        await waitFor(() => expect(fetchFAQs).toHaveBeenCalled());
      
        // Find the textarea for the admin response
        const textarea = screen.getByPlaceholderText("Add your response...");
        
        // Leave the textarea empty (no response)
        fireEvent.change(textarea, { target: { value: "" } });
      
        // Find the send button and click it to submit
        const sendButton = screen.getByText("Approve & Respond");
        fireEvent.click(sendButton);
      
        // Check if addAnswerToFAQ has NOT been called (since response is empty)
        await waitFor(() => expect(addAnswerToFAQ).not.toHaveBeenCalled());
      
        // Check for FAQ not to have left
        expect(screen.getByText("Submitted by: user2@example.com")).toBeInTheDocument();
      });
});
