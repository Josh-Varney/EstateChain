import { submitQuestion } from "../src/firebase/faq/faq-submit";
import { getApprovedQuestions } from "../src/firebase/faq/faq-grab";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import "firestore-jest-mock";


// Mock Firestore methods
jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  getFirestore: jest.fn(() => ({})), // Mock Firestore initialization
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn()
}));

describe("submitQuestion Function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
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
      jest.clearAllMocks();
      
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

    it("should add a question to the document if empty firestore document", async () => {
      jest.clearAllMocks();

      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ questions: [] }),
      });

      (updateDoc as jest.Mock).mockRejectedValueOnce({ code: "not-found" });
      (setDoc as jest.Mock).mockResolvedValueOnce(undefined);

      const response = await submitQuestion("test@example.com", "This is a test question.");


      expect(setDoc).toHaveBeenCalledWith(
        expect.any(Object), 
        expect.objectContaining({
            questions: expect.arrayContaining([
                expect.objectContaining({
                    email: "test@example.com",
                    message: "This is a test question.",
                    answer: "",
                    approved: false,
                    status: "pending",
                    createdAt: expect.any(String),
                }),
            ]),
        })
      );

      expect(response).toBe("Your question has been submitted successfully.");
    });

    it("should add a new question and retrieve the updated Firestore document", async () => {
    });

});
