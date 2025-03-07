import { validateEmail, sendEmailToNewsletter } from "../src/firebase/footer/newsletter";
import { getDoc, setDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";

// Mock Firestore methods
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})),
  doc: jest.fn() as jest.Mock,
  getDoc: jest.fn() as jest.Mock,
  setDoc: jest.fn() as jest.Mock,
  updateDoc: jest.fn() as jest.Mock,
  arrayUnion: jest.fn((value) => value) as jest.Mock,
}));

describe("validateEmail Function", () => {
  test("should return an error if email is empty", async () => {
    const result = await validateEmail("");
    expect(result).toBe("Email address cannot be empty.");
  });

  test("should return an error if email length exceeds 254 characters", async () => {
    const longEmail = "a".repeat(255) + "@example.com";
    const result = await validateEmail(longEmail);
    expect(result).toBe("Email address is too long.");
  });

  test("should return an error if email format is invalid", async () => {
    const result = await validateEmail("invalid-email");
    expect(result).toBe("Please enter a valid email address.");
  });

  test("should return an error if email contains spaces", async () => {
    const result = await validateEmail("test @example.com");
    expect(result).toBe("Email address contains invalid characters.");
  });

  test("should return a success message for valid email", async () => {
    (doc as jest.Mock).mockImplementation(() => ({})); // Mock doc reference
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => false,
      data: jest.fn(),
    });
    (setDoc as jest.Mock).mockResolvedValue(undefined);
    (updateDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await validateEmail("test@example.com");
    expect(result).toBe("Successfully subscribed to the newsletter!");
  });
});

describe("sendEmailToNewsletter Function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
    (doc as jest.Mock).mockImplementation(() => ({})); // Ensure `doc` always returns a valid reference
  });

  test("should return a success message if email is added", async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => true, data: () => ({ emails: [] }) });
    (updateDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await sendEmailToNewsletter("test@example.com");
    expect(result).toBe("Successfully subscribed to the newsletter!");
    expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), {
      emails: arrayUnion("test@example.com"),
    });
  });

  test("should notify if email is already subscribed", async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        emails: ["test@example.com"],
      }),
    });

    const result = await sendEmailToNewsletter("test@example.com");
    expect(result).toBe("You are already subscribed to the newsletter!");
    expect(updateDoc).not.toHaveBeenCalled();
  });

  test("should initialize document if it does not exist", async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });
    (setDoc as jest.Mock).mockResolvedValue(undefined);
    (updateDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await sendEmailToNewsletter("new@example.com");
    expect(setDoc).toHaveBeenCalledWith(expect.any(Object), { emails: [] });
    expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), {
      emails: arrayUnion("new@example.com"),
    });
    expect(result).toBe("Successfully subscribed to the newsletter!");
  });

  test("should throw an error if Firestore throws an error", async () => {
    (getDoc as jest.Mock).mockRejectedValueOnce(new Error("Firestore Error"));

    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await expect(sendEmailToNewsletter("test@example.com")).rejects.toThrow(
      "Failed to subscribe. Please try again later."
    );
    expect(console.error).toHaveBeenCalledWith("Error adding email to newsletter:", expect.any(Error));

    consoleSpy.mockRestore();
  });
});
