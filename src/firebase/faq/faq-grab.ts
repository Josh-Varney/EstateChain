import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Define the expected structure of a Question
type Question = {
    email: string;
    message: string;
    answer: string;
    status: string;
    createdAt: string;
};

/**
 * Fetches approved questions from the Firestore database.
 * @returns A Promise resolving to an array of approved questions.
 */
export const getApprovedQuestions = async (): Promise<Question[]> => {
    try {
        // Reference to the specific FAQ document containing all questions
        const faqDocRef = doc(db, "faq", "questionsDocument");

        // Fetch the document containing questions
        const faqDocSnap = await getDoc(faqDocRef);

        if (!faqDocSnap.exists()) {
            console.log("No questions document found.");
            return [];
        }

        // Retrieve the "questions" array with proper type assertion
        const data = faqDocSnap.data();
        const questionsArray: Question[] = (data?.questions as Question[]) || [];

        // Filter for approved questions
        const approvedQuestions = questionsArray.filter((question) => question.status == "approved");

        return approvedQuestions;
    } catch (error) {
        console.error("Error fetching approved questions:", error);
        return [];
    }
};
