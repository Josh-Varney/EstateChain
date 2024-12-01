import { db } from "../firebase"; 
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

/**
 * Validates an email address string.
 * @param email - The email address to validate.
 * @returns A string containing the validation error message, or an empty string if the email is valid.
 */
export const validateEmail = async (email: string): Promise<string> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for basic email validation

    // Check if the email is empty
    if (!email) {
        return "Email address cannot be empty.";
    }

    // Check if the email length exceeds 254 characters (standard max length for email addresses)
    if (email.length > 254) {
        return "Email address is too long.";
    }

    // Validate email format using the regex
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address.";
    }

    // Check if the email contains spaces
    if (email.includes(" ")) {
        return "Email address contains invalid characters.";
    }

    // If all checks pass, return a success message (no errors)
    return await sendEmailToNewsletter(email);;
};

/**
 * Adds an email to a single Firestore document array.
 * Notifies the user if they are already signed up.
 * @param email - The email address to add to the array.
 * @returns A promise that resolves to a success or duplicate notification message.
 */
export const sendEmailToNewsletter = async (email: string): Promise<string> => {
    try {
        // Reference the document in the "newsletter" collection
        const newsletterDocRef = doc(db, "newsletter", "emailList");

        // Fetch the document
        const docSnap = await getDoc(newsletterDocRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const emailsArray = data.emails || [];

            // Check if the email already exists in the array
            if (emailsArray.includes(email.trim())) {
                return "You are already subscribed to the newsletter!";
            }
        } else {
            // If the document doesn't exist, initialize it with an empty array
            await setDoc(newsletterDocRef, { emails: [] });
        }

        // Add the email to the array, ensuring no duplicates
        await updateDoc(newsletterDocRef, {
            emails: arrayUnion(email.trim()), // Use arrayUnion to add the email
        });

        return "Successfully subscribed to the newsletter!";
    } catch (error) {
        // Log the error for debugging
        console.error("Error adding email to newsletter:", error);

        // Throw a user-friendly error message
        throw new Error("Failed to subscribe. Please try again later.");
    }
};

