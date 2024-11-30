import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * Fetches approved questions from the Firestore database.
 * @returns An array of approved questions.
 */
export const getApprovedQuestions = async () => {
    try {
        // Reference to the specific document
        const faqDocRef = doc(db, "faq", "questionsDocument");

        // Fetch the document
        const faqDocSnap = await getDoc(faqDocRef);

        if (!faqDocSnap.exists()) {
            console.log("No questions document found.");
            return [];
        }

        // Retrieve the "questions" array
        const questionsArray = faqDocSnap.data()?.questions || [];

        // Filter for approved questions
        const approvedQuestions = questionsArray.filter((question: any) => question.approved);

        return approvedQuestions;
    } catch (error) {
        console.error("Error fetching approved questions:", error);
        return [];
    }
};
