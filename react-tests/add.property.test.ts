// import { submitPropertyData } from "../src/managers/dummy-portal/propertyManager2";

// // Mock fetch API
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ propertyID: '12345' }), // Mocked response data
//   })
// );

// describe('submitPropertyData', () => {
//   it('should submit property data successfully and return true', async () => {
//     const data = {
//       propertyName: 'Test Property',
//       propertyAddress: '123 Test St',
//       propertySettlement: '2025-03-19',
//       propertyDescription: 'A beautiful test property',
//       propertyPrice: 1000000,
//       propertyLocation: { latitude: 50.123, longitude: -0.123 },
//       rentalDistributionExpectancy: 0.5,
//       propertyStreetNum: '123',
//       propertyStreet: 'Test St',
//       propertyCity: 'Test City',
//       propertyCountry: 'Test Country',
//       propertySize: '200 sqm',
//       propertyBedrooms: 3,
//       propertyBathrooms: 2,
//       propertyTokenPrice: 50,
//       propertyTokensLeft: 1000,
//       propertyType: 'Apartment',
//       propertyPostcode: '12345',
//       propertyRental: true,
//       propertyFeatured: true,
//       propertyTenure: 'Freehold',
//       propertyGarden: true,
//       propertyAccessibility: true,
//       propertyKeywords: 'test, property',
//       agentID: 'agent123',
//       uuid: null,
//     };

//     const result = await submitPropertyData('http://testurl.com', data);

//     expect(result).toBe(true); // Expect it to return true on successful submission
//     expect(fetch).toHaveBeenCalledTimes(1); // Ensure fetch was called once
//     expect(fetch).toHaveBeenCalledWith('http://testurl.com', expect.objectContaining({
//       method: 'POST',
//       headers: expect.objectContaining({
//         'Content-Type': 'application/json',
//       }),
//       body: expect.any(String), // We can check the body if necessary
//     }));
//   }, 200);

//   it('should return false if there is no propertyID in the response', async () => {
//     global.fetch.mockResolvedValueOnce({
//       json: () => Promise.resolve({}), // Simulate no propertyID
//     });

//     const data = { /* Same test data */ };
//     const result = await submitPropertyData('http://testurl.com', data);

//     expect(result).toBe(false); // Expect it to return false when there is no propertyID
//   });

//   it('should return false when there is an error in fetch', async () => {
//     global.fetch.mockRejectedValueOnce(new Error('Network Error'));

//     const data = { /* Same test data */ };
//     const result = await submitPropertyData('http://testurl.com', data);

//     expect(result).toBe(false); // Expect it to return false when there is an error
//   });
// });
