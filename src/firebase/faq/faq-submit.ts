import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Submits a question to a single Firestore document by appending it to an array.
 * @param email - User's email address.
 * @param message - User's question or message.
 * @returns Success or error message.
 */
export const submitQuestion = async (email: string, message: string): Promise<string> => {
    // Validation functions
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regex for email validation
    const isValidMessage = (message: string) => message.trim().length > 10; // Message should be longer than 10 characters

    // Input Validation
    if (!email || !message) {
        return "Error: Email and message are required.";
    }

    if (!isValidEmail(email)) {
        return "Error: Invalid email format.";
    }

    if (!isValidMessage(message)) {
        return "Error: Message should be at least 10 characters long.";
    }

    try {
        // Firestore document reference
        const faqDocRef = doc(db, "faq", "questionsDocument"); 

        // Fetch the existing document
        const faqDocSnap = await getDoc(faqDocRef);

        let questionsArray = []; // Default to an empty array if the document doesn't exist

        if (faqDocSnap.exists()) {
            const data = faqDocSnap.data();
            questionsArray = data.questions || []; // Use existing array if present
        }

        // Add the new question to the array
        const newQuestion = {
            email: email.trim(),
            message: message.trim(),
            answer: "",
            approved: false,
            createdAt: new Date().toISOString(),
        };

        questionsArray.push(newQuestion);

        // Update the document in Firestore
        await setDoc(faqDocRef, { questions: questionsArray });

        return "Your question has been submitted successfully.";
    } catch (error) {
        console.error("Firestore Error:", error);
        return "An error occurred while submitting your question. Please try again.";
    }
};
