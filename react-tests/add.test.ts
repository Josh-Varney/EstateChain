import {
  validatePropertyName,
  validatePropertyAddress,
  validatePropertyPrice,
  validatePropertyTokensLeft,
  validatePropertyPostcode,
  validateAgentEmail,
  validateAgentContactNumber,
  validateAgentWhyDescription,
} from "../src/managers/dummy-portal/propertyManager";

  
describe("Invalid Add Function Tests", () => {
    let setErrors: Function;
  
    beforeEach(() => {
      setErrors = jest.fn();
    });
  
    test("validatePropertyName - should set error for empty name", () => {
      validatePropertyName("", setErrors);
      expect(setErrors).toHaveBeenCalledWith(expect.any(Function));
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyName).toBe("Property name is required.");
    });
  
    test("validatePropertyName - should set error for short name", () => {
      validatePropertyName("ab", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyName).toBe("Must be at least 3 characters long.");
    });
  
    test("validatePropertyAddress - should set error for empty address", () => {
      validatePropertyAddress("", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyAddress).toBe("Property address is required.");
    });
  
    test("validatePropertyAddress - should set error for short address", () => {
      validatePropertyAddress("Short", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyAddress).toBe("Must be at least 10 characters long.");
    });
  
    test("validatePropertyPrice - should set error for empty price", () => {
      validatePropertyPrice("", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyPrice).toBe("Property valuation is required.");
    });
  
    test("validatePropertyPrice - should set error for non-numeric price", () => {
      validatePropertyPrice("abc", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyPrice).toBe("Price must greater than 0.");
    });
  
    test("validatePropertyTokensLeft - should set error for empty tokens", () => {
      validatePropertyTokensLeft("", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyTokensLeft).toBe("Property tokens left is required.");
    });
  
    test("validatePropertyTokensLeft - should set error for invalid tokens", () => {
      validatePropertyTokensLeft("-1", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyTokensLeft).toBe("Token number must be greater than 0");
    });
  
    test("validatePropertyPostcode - should set error for invalid postcode", () => {
      validatePropertyPostcode("12345", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyPostcode).toBe("Please enter a valid postcode (e.g., CV7 7LA).");
    });
  
    test("validateAgentEmail - should set error for invalid email", () => {
      validateAgentEmail("invalid-email", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.agentEmail).toBe("Please enter a valid email address.");
    });
  
    test("validateAgentContactNumber - should set error for invalid contact number", () => {
      validateAgentContactNumber("abc123", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.agentContactNumber).toBe("Please enter a valid contact number.");
    });
  
    test("validateAgentWhyDescription - should set error for short description", () => {
      validateAgentWhyDescription("Short", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.agentWhyDescription).toBe("Description must be at least 10 characters long.");
    });
  });
  
  describe("Valid Add Function Tests", () => {
    let setErrors: Function;
  
    beforeEach(() => {
      setErrors = jest.fn();
    });
  
    test("validatePropertyName - should set no error for valid name", () => {
      validatePropertyName("Valid Name", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyName).toBe("");
    });
  
    test("validatePropertyAddress - should set no error for valid address", () => {
      validatePropertyAddress("123 Main Street, London", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyAddress).toBe("");
    });
  
    test("validatePropertyPrice - should set no error for valid price", () => {
      validatePropertyPrice("100000", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyPrice).toBe("");
    });
  
    test("validatePropertyTokensLeft - should set no error for valid tokens", () => {
      validatePropertyTokensLeft("10", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyTokensLeft).toBe("");
    });
  
    test("validatePropertyPostcode - should set no error for valid postcode", () => {
      validatePropertyPostcode("CV7 7LA", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.propertyPostcode).toBe("");
    });
  
    test("validateAgentEmail - should set no error for valid email", () => {
      validateAgentEmail("agent@example.com", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.agentEmail).toBe("");
    });
  
    test("validateAgentContactNumber - should set no error for valid contact number", () => {
      validateAgentContactNumber("+441234567890", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.agentContactNumber).toBe("");
    });
  
    test("validateAgentWhyDescription - should set no error for valid description", () => {
      validateAgentWhyDescription("I have experience selling properties.", setErrors);
      const updateErrors = setErrors.mock.calls[0][0]({});
      expect(updateErrors.agentWhyDescription).toBe("");
    });
  });