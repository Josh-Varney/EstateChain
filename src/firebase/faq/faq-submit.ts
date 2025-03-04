import { db } from "../firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Define the Question type
type Question = {
    email: string;
    message: string;
    answer: string;
    approved: boolean;
    createdAt: string;
    status: string;
};

/**
 * Submits a question to Firestore using arrayUnion for efficient updates.
 * @param email - User's email address.
 * @param message - User's question.
 * @returns A success or error message.
 */
export const submitQuestion = async (email: string, message: string): Promise<string> => {
    // Input validation
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidMessage = (message: string) => message.trim().length > 10;

    if (!email || !message) return "Error: Email and message are required.";
    if (!isValidEmail(email)) return "Error: Invalid email format.";
    if (!isValidMessage(message)) return "Error: Message should be at least 10 characters long.";

    // Create the new question object before the try block so it's accessible everywhere
    const newQuestion: Question = {
        email: email.trim(),
        message: message.trim(),
        answer: "",
        approved: false,
        createdAt: new Date().toISOString(),
        status: "pending",
    };

    try {
        // Reference the Firestore document
        const faqDocRef = doc(db, "faq", "questionsDocument");

        // Use arrayUnion to efficiently add the new question
        await updateDoc(faqDocRef, {
            questions: arrayUnion(newQuestion),
        });

        return "Your question has been submitted successfully.";
    } catch (error: any) {
        if (error.code === "not-found") {
            // If the document doesn't exist, create it with the first question
            try {
                await setDoc(doc(db, "faq", "questionsDocument"), { questions: [newQuestion] });
                return "Your question has been submitted successfully.";
            } catch (err) {
                console.error("Firestore Error:", err);
                return "An error occurred while submitting your question. Please try again.";
            }
        }
        console.error("Firestore Error:", error);
        return "An error occurred while submitting your question. Please try again.";
    }
};
