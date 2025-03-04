import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

interface FAQ {
    createdAt: string;
    message: string;
    answer: string;
    email: string;
    status: "pending" | "approved" | "rejected";
}

/**
 * Fetches unapproved FAQs from Firestore.
 * @returns A list of unapproved FAQs.
 */
export const fetchFAQs = async (): Promise<FAQ[]> => {
    const questionsDocRef = doc(db, "faq", "questionsDocument");

    try {
        const docSnap = await getDoc(questionsDocRef);
        if (!docSnap.exists()) {
            console.error("No FAQ document found.");
            return [];
        }

        const data = docSnap.data();
        const questions: FAQ[] = data.questions || [];

        return questions.filter((faq) => faq.status == "pending"); // Return only unapproved FAQs
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }
};

/**
 * Rejects an FAQ by setting its approved status to false and marking it as rejected.
 * @param faqId - The unique ID (createdAt) of the FAQ.
 * @returns True if successful, false otherwise.
 */
// Function to reject FAQ
export const rejectFAQInFirestore = async (faqCreatedAt: string) => {
    try {
        console.log("Attempting to reject FAQ with createdAt:", faqCreatedAt); // Debugging line to confirm createdAt
        
        const questionsDocRef = doc(db, "faq", "questionsDocument");

        // Fetch current document from Firestore
        const docSnap = await getDoc(questionsDocRef);
        if (!docSnap.exists()) throw new Error("No FAQ document found.");

        const data = docSnap.data();
        let questionsArray = data.questions || [];

        // Find the FAQ by createdAt or other unique field (message, email, etc.)
        const faqIndex = questionsArray.findIndex((faq: any) => faq.createdAt === faqCreatedAt);
        if (faqIndex === -1) throw new Error(`FAQ with createdAt ${faqCreatedAt} not found.`);

        // Update the status of the specific FAQ
        const updatedQuestions = questionsArray.map((faq: any) =>
            faq.createdAt === faqCreatedAt ? { ...faq, status: "rejected" } : faq
        );

        // Update Firestore with the modified questions array
        await updateDoc(questionsDocRef, { questions: updatedQuestions });

        console.log(`✅ FAQ with createdAt ${faqCreatedAt} marked as rejected.`);
        return true;
    } catch (error) {
        console.error("🔥 Error rejecting FAQ:", error);
        return false;
    }
};


/**
 * Adds an answer to an FAQ and marks it as approved.
 * @param faqId - The unique ID (createdAt) of the FAQ.
 * @param answer - The answer to be added.
 * @returns True if successful, false otherwise.
 */
export const addAnswerToFAQ = async (faqId: string, answer: string): Promise<boolean> => {
    try {
        const questionsDocRef = doc(db, "faq", "questionsDocument");

        // Get current FAQs
        const docSnap = await getDoc(questionsDocRef);
        if (!docSnap.exists()) {
            console.error("No FAQ document found.");
            return false;
        }

        const data = docSnap.data();
        let questions: FAQ[] = data.questions || [];

        // Find the FAQ by its createdAt timestamp
        const questionIndex = questions.findIndex((q) => q.createdAt === faqId);
        if (questionIndex === -1) {
            console.error(`FAQ with ID ${faqId} not found.`);
            return false;
        }

        // Update FAQ with the answer and approval status
        questions[questionIndex] = {
            ...questions[questionIndex],
            answer,
            status: "approved",
        };

        // Save updated questions array back to Firestore
        await updateDoc(questionsDocRef, { questions });

        console.log(`FAQ ${faqId} updated with an answer.`);
        return true;
    } catch (error) {
        console.error("Error updating FAQ answer:", error);
        return false;
    }
};

