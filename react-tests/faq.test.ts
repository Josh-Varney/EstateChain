import { submitQuestion } from "../src/firebase/faq/faq-submit";
import { getApprovedQuestions } from "../src/firebase/faq/faq-grab";
import { getDoc, doc } from "firebase/firestore";

// Mock Firestore methods
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})), // Mock Firestore initialization
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

describe("submitQuestion Function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
    (doc as jest.Mock).mockImplementation(() => ({})); // Ensure `doc` always returns a valid reference
  });

  describe("Validation", () => {
    it("should return an error if email is missing", async () => {
      const result = await submitQuestion("", "Test message");
      expect(result).toBe("Error: Email and message are required.");
    });

    it("should return an error if message is missing", async () => {
      const result = await submitQuestion("user@example.com", "");
      expect(result).toBe("Error: Email and message are required.");
    });

    it("should return an error for an invalid email", async () => {
      const result = await submitQuestion("invalid-email", "Test message");
      expect(result).toBe("Error: Invalid email format.");
    });

    it("should return an error for a message shorter than 10 characters", async () => {
      const result = await submitQuestion("user@example.com", "Short");
      expect(result).toBe("Error: Message should be at least 10 characters long.");
    });
  });

  describe("Firestore Interaction", () => {

    it("should return an error if Firestore throws an error", async () => {
      // Mock Firestore throwing an error
      (getDoc as jest.Mock).mockRejectedValueOnce(new Error("Firestore Error"));

      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      const result = await submitQuestion("user@example.com", "This is a test message.");
      expect(result).toBe("An error occurred while submitting your question. Please try again.");
      expect(console.error).toHaveBeenCalledWith(expect.any(String), expect.any(Error));

      consoleSpy.mockRestore();
    });
  });
});


describe("getApprovedQuestions Function", () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Reset mocks before each test
      (doc as jest.Mock).mockImplementation(() => ({})); // Ensure `doc` always returns a valid reference
    });
  
    it("should return an empty array if the document does not exist", async () => {
      // Mock Firestore's getDoc behavior to simulate a non-existent document
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
      });
  
      const result = await getApprovedQuestions();
      expect(doc).toHaveBeenCalledWith(expect.anything(), "faq", "questionsDocument");
      expect(getDoc).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual([]); // Expect an empty array
    });
  
    it("should return an empty array if there are no questions", async () => {
      // Mock Firestore's getDoc behavior to return an empty questions array
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ questions: [] }),
      });
  
      const result = await getApprovedQuestions();
      expect(doc).toHaveBeenCalledWith(expect.anything(), "faq", "questionsDocument");
      expect(getDoc).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual([]); // Expect an empty array
    });
  
    it("should handle documents with no questions array gracefully", async () => {
      jest.clearAllMocks();
    
      // Mock Firestore's getDoc behavior to return a document with no "questions" field
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => ({}), // No "questions" field
      });
    
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
    
      const result = await getApprovedQuestions();
    
      // Print result to console
      console.log(result); // This will log the result
    
      // Check if the log function was called with the expected result
      expect(logSpy).toHaveBeenCalledWith([]);
    
      // Reset the spy
      logSpy.mockRestore();
    
      // Assertions
      expect(doc).toHaveBeenCalledWith(expect.anything(), "faq", "questionsDocument");
      expect(getDoc).toHaveBeenCalledWith(expect.any(Object));
      
      expect(result).toEqual([]); // Expect an empty array
    });    
  });