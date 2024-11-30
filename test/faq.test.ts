import { submitQuestion } from "../src/firebase/faq/faq-submit";
import { getDoc, setDoc, doc } from "firebase/firestore";

// Mock Firestore methods
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})), // Mock Firestore initialization
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
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
    it("should create a new document if it doesn't exist", async () => {
      // Mock Firestore's getDoc and setDoc behavior
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false }); // Document does not exist
      const mockSetDoc = jest.fn();
      (setDoc as jest.Mock).mockImplementation(mockSetDoc);

      const result = await submitQuestion("user@example.com", "This is a test message.");

      expect(doc).toHaveBeenCalledWith(expect.anything(), "faq", "questionsDocument");
      expect(setDoc).toHaveBeenCalledWith(expect.any(Object), {
        questions: [
          {
            email: "user@example.com",
            message: "This is a test message.",
            answer: "",
            approved: false,
            createdAt: expect.any(String),
          },
        ],
      });
      expect(result).toBe("Your question has been submitted successfully.");
    });

    it("should append to an existing document", async () => {
      // Mock Firestore's getDoc behavior
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          questions: [
            {
              email: "existing@example.com",
              message: "Existing question",
              answer: "",
              approved: true,
              createdAt: "2024-01-01T00:00:00Z",
            },
          ],
        }),
      });

      const mockSetDoc = jest.fn();
      (setDoc as jest.Mock).mockImplementation(mockSetDoc);

      const result = await submitQuestion("user@example.com", "This is a new test message.");

      expect(doc).toHaveBeenCalledWith(expect.anything(), "faq", "questionsDocument");
      expect(setDoc).toHaveBeenCalledWith(expect.any(Object), {
        questions: [
          {
            email: "existing@example.com",
            message: "Existing question",
            answer: "",
            approved: true,
            createdAt: "2024-01-01T00:00:00Z",
          },
          {
            email: "user@example.com",
            message: "This is a new test message.",
            answer: "",
            approved: false,
            createdAt: expect.any(String),
          },
        ],
      });
      expect(result).toBe("Your question has been submitted successfully.");
    });

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
