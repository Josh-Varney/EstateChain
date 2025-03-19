import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import ManageProperties from "../src/components/admin-portal/components/manage-prop";
import axios from "axios";
import { approvePropertyAndSendNotification, fetchProperties, rejectAndSubmitFeedback } from "../src/components/admin-portal/admin-manager/get-prop";

jest.mock('axios');
jest.mock('../src/components/admin-portal/admin-manager/get-prop');

describe('ManageProperties Render Tests', () => {
    it('should render the properties correctly in 2s', async () => {
        // Mock the data that fetchProperties returns
        const mockProperties = [
          {
            propertyID: 1,
            propertyAddress: '123 Main St',
            propertyCity: 'Cityville',
            propertyCountry: 'Countryland',
            agentName: 'Agent One',
            pApproved: false,
            propertyAddedBy: 'Client One',
          },
          {
            propertyID: 2,
            propertyAddress: '456 Oak Ave',
            propertyCity: 'Townsville',
            propertyCountry: 'Countryland',
            agentName: 'Agent Two',
            pApproved: true,
            propertyAddedBy: 'Client Two',
          },
        ];
    
        // Mock the resolved value of fetchProperties
        fetchProperties.mockResolvedValue(mockProperties);
    
        // Render the component
        render(<ManageProperties />);
    
        // Wait for the properties to be fetched and displayed
        await waitFor(() => expect(fetchProperties).toHaveBeenCalled());
    
        // Check if the properties appear in the document
        expect(screen.getByText('123 Main St')).toBeInTheDocument();
        expect(screen.getByText('456 Oak Ave')).toBeInTheDocument();
      }, 200);

      it('should handle an influx of 1000 properties efficiently in 2s', async () => {
        // Generate 1000 mock properties
        const mockProperties = Array.from({ length: 1000 }, (_, index) => ({
          propertyID: index + 1,
          propertyAddress: `Address ${index + 1}`,
          propertyCity: `City ${index + 1}`,
          propertyCountry: `Country ${index + 1}`,
          agentName: `Agent ${index + 1}`,
          pApproved: index % 2 === 0, // Alternate approved status
          propertyAddedBy: `Client ${index + 1}`,
        }));
      
        // Mock the fetchProperties to return these 1000 properties
        (fetchProperties as jest.Mock).mockResolvedValue(mockProperties);
      
        // Start time tracking
        const startTime = performance.now();
      
        render(<ManageProperties />);
      
        // Wait for the properties to be fetched and rendered
        await waitFor(() => expect(fetchProperties).toHaveBeenCalled());
      
        // Ensure at least some properties are loaded in the UI
        await waitFor(() => expect(screen.getByText('Address 1')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Address 1000')).toBeInTheDocument());
      
        // End time tracking
        const endTime = performance.now();
        const timeTaken = endTime - startTime;
      
        console.log(`Time taken to load 1000 properties: ${timeTaken.toFixed(2)}ms`);
      
        // Expect performance threshold (example: under 2000ms)
        expect(timeTaken).toBeLessThan(2000);
      });
});

describe('Reject & Send Feedback', () => {
    beforeEach(() => {
      // Mock the API to resolve successfully
      rejectAndSubmitFeedback.mockResolvedValue(true);
      jest.spyOn(window, 'alert').mockImplementation(() => {});
    });
  
    afterEach(() => {
      jest.clearAllMocks();
      jest.restoreAllMocks();
    });

  
    it('should call rejectAndSubmitFeedback when feedback is provided and rejected within 1s', async () => {
        
        const mockProperties = [
            {
              propertyID: 1,
              propertyAddress: '123 Main St',
              propertyCity: 'Cityville',
              propertyCountry: 'Countryland',
              agentName: 'Agent One',
              pApproved: false,
              propertyAddedBy: 'Client One',
            },
        ];

      (fetchProperties as jest.Mock).mockResolvedValue(mockProperties);

      render(<ManageProperties />);

      // Wait for the properties to be fetched and displayed
      await waitFor(() => expect(fetchProperties).toHaveBeenCalled());
  
      // Simulate loading properties
      const propertyCard = screen.getByText('123 Main St');
      fireEvent.click(propertyCard); // Click to open the property modal
  
      // Find the feedback textarea and type feedback
      const feedbackTextarea = screen.getByPlaceholderText('Add your feedback...');
      fireEvent.change(feedbackTextarea, { target: { value: 'This property is not suitable.' } });
  
      // Find the "Reject & Send Feedback" button
      const rejectButton = screen.getByText('Reject & Send Feedback');
      fireEvent.click(rejectButton); // Click to reject the property and send feedback

      screen.debug();
  
      // Wait for the rejectAndSubmitFeedback API call to be triggered
      await waitFor(() => {
        expect(rejectAndSubmitFeedback).toHaveBeenCalledWith(
          1, // Property ID
          'Client One', // propertyAddedBy
          'This property is not suitable.' // feedback
        );
      });
  
        // Wait for the property to display close button to remove.
        await waitFor(() => {
            expect(screen.queryByText('Close')).toBeInTheDocument();
        });
    }, 100);

    it('should alert when feedback is empty', async () => {
        const mockProperties = [
          {
            propertyID: 1,
            propertyAddress: '123 Main St',
            propertyCity: 'Cityville',
            propertyCountry: 'Countryland',
            agentName: 'Agent One',
            pApproved: false,
            propertyAddedBy: 'Client One',
          },
        ];
    
        // Mock fetchProperties to return mock data
        (fetchProperties as jest.Mock).mockResolvedValue(mockProperties);
    
        render(<ManageProperties />);
    
        // Wait for properties to be loaded
        await waitFor(() => expect(fetchProperties).toHaveBeenCalled());
    
        // Simulate clicking on the property card to show details
        const propertyCard = screen.getByText('123 Main St');
        fireEvent.click(propertyCard);
    
        // Find the feedback textarea
        const feedbackTextarea = screen.getByPlaceholderText('Add your feedback...');
        
        // Simulate no feedback (empty field)
        fireEvent.change(feedbackTextarea, { target: { value: '' } });
    
        // Find the reject button
        const rejectButton = screen.getByText('Reject & Send Feedback');
        fireEvent.click(rejectButton);
    
        // Check if the validation alert is triggered for empty feedback
        await waitFor(() => {
          expect(window.alert).toHaveBeenCalledWith('Feedback is required to reject the property.');
        });
      });

      it('should alert when feedback exceeds 65 words', async () => {
        const mockProperties = [
          {
            propertyID: 1,
            propertyAddress: '123 Main St',
            propertyCity: 'Cityville',
            propertyCountry: 'Countryland',
            agentName: 'Agent One',
            pApproved: false,
            propertyAddedBy: 'Client One',
          },
        ];
    
        // Mock fetchProperties to return mock data
        (fetchProperties as jest.Mock).mockResolvedValue(mockProperties);
    
        render(<ManageProperties />);
    
        // Wait for properties to be loaded
        await waitFor(() => expect(fetchProperties).toHaveBeenCalled());
    
        // Simulate clicking on the property card to show details
        const propertyCard = screen.getByText('123 Main St');
        fireEvent.click(propertyCard);
    
        // Find the feedback textarea
        const feedbackTextarea = screen.getByPlaceholderText('Add your feedback...');
        
        // Simulate feedback exceeding 65 words
        const longFeedback = 'This is a long feedback ' + 'word '.repeat(66); // Creates feedback with 66 words
        fireEvent.change(feedbackTextarea, { target: { value: longFeedback } });
    
        // Find the reject button
        const rejectButton = screen.getByText('Reject & Send Feedback');
        fireEvent.click(rejectButton);
    
        // Check if the alert is triggered for exceeding 65 words
        await waitFor(() => {
          expect(window.alert).toHaveBeenCalledWith('Feedback cannot exceed 65 words.');
        });
      });
});