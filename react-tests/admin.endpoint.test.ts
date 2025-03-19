import axios from 'axios';
import { approvePropertyAndSendNotification, rejectAndSubmitFeedback } from '../src/components/admin-portal/admin-manager/get-prop';

// Ensure the axios mock is properly typed
jest.mock('axios');

// Create a mocked version of axios using Jest's Mocked type
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('rejectAndSubmitFeedback', () => {
  const propertyID = 1;
  const propertyAddedBy = 'Client One';
  const propertyFeedback = 'This property is not suitable.';

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data between tests
  });

  it('should successfully reject a property and send a notification', async () => {
    // Mock the response for the put and post requests
    mockedAxios.put.mockResolvedValue({ status: 200 });
    mockedAxios.post.mockResolvedValue({ status: 200 });

    const result = await rejectAndSubmitFeedback(propertyID, propertyAddedBy, propertyFeedback);

    // Check if axios.put and axios.post were called with the expected arguments
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `http://localhost:8080/property-status/${propertyID}`,
      {}
    );
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/send-notification',
      {
        uuid: propertyAddedBy,
        message: `Property with ID ${propertyID} has been rejected. Feedback: ${propertyFeedback}`,
        type: 'rejection',
        related_table: 'Property',
        relatedID: propertyID,
        wasRead: false,
      }
    );

    // Ensure the function returns true
    expect(result).toBe(true);
  });

  it('should return false if the rejection fails (axios.put fails)', async () => {
    // Mock the put request to fail
    mockedAxios.put.mockResolvedValue({ status: 500 });

    const result = await rejectAndSubmitFeedback(propertyID, propertyAddedBy, propertyFeedback);

    // Ensure the function returns false when put request fails
    expect(result).toBe(false);
  });

  it('should handle errors properly and return false', async () => {
    // Mock an exception thrown in either of the axios requests
    mockedAxios.put.mockRejectedValue(new Error('Network error'));

    const result = await rejectAndSubmitFeedback(propertyID, propertyAddedBy, propertyFeedback);

    // Ensure the function returns false when an error occurs
    expect(result).toBe(false);
  });
});

// Tests for approvePropertyAndSendNotification
describe('approvePropertyAndSendNotification', () => {
  const propertyID = 1;
  const propertyAddedBy = 'Client One';

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data between tests
  });

  it('should approve the property and send a notification successfully', async () => {
    // Mock the successful responses for PUT and POST requests
    mockedAxios.put.mockResolvedValue({ status: 200 });
    mockedAxios.post.mockResolvedValue({ status: 200 });

    // Call the function
    const result = await approvePropertyAndSendNotification(propertyID, propertyAddedBy);

    // Check if axios.put was called with the correct arguments
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `http://localhost:8080/add-approval/${propertyID}`
    );
    // Check if axios.post was called with the correct notification details
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/send-notification',
      {
        uuid: propertyAddedBy,
        message: `Property with ID ${propertyID} has been approved and deployed.`,
        type: 'info',
        related_table: 'Property',
        relatedID: propertyID,
        wasRead: false,
      }
    );

    // Ensure the function returns true (success)
    expect(result).toBe(true);
  });

  it('should return false if approving the property fails (axios.put fails)', async () => {
    // Mock the PUT request to fail
    mockedAxios.put.mockResolvedValue({ status: 500 });

    // Call the function
    const result = await approvePropertyAndSendNotification(propertyID, propertyAddedBy);

    // Ensure the function returns false when approval fails
    expect(result).toBe(false);
  });

  it('should return false if sending the notification fails (axios.post fails)', async () => {
    // Mock the PUT request to succeed and the POST request to fail
    mockedAxios.put.mockResolvedValue({ status: 200 });
    mockedAxios.post.mockResolvedValue({ status: 500 });

    // Call the function
    const result = await approvePropertyAndSendNotification(propertyID, propertyAddedBy);

    // Ensure the function returns false when notification fails
    expect(result).toBe(false);
  });

  it('should handle errors properly and return false', async () => {
    // Mock an error being thrown by axios
    mockedAxios.put.mockRejectedValue(new Error('Network error'));

    // Call the function
    const result = await approvePropertyAndSendNotification(propertyID, propertyAddedBy);

    // Ensure the function returns false when an error occurs
    expect(result).toBe(false);
  });
});
