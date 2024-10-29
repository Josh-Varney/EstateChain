import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updatePassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    UserCredential,
    User,
} from "firebase/auth";
import { auth } from "./firebase"; // Ensure the correct path to your firebase.ts file

export const doCreateUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Re-throw error for handling at the call site
    }
};

export const doSignInWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the signed-in user
    } catch (error) {
        console.error("Error during sign-in:", error);
        console.error("Error code:", error);
        console.error("Error message:", error);
        throw error; // Re-throw error for handling at the call site
    }
};

export const doSignInWithGoogle = async (): Promise<User> => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user; // Return the signed-in user
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error; // Re-throw error for handling at the call site
    }
};

export const doSignOut = async (): Promise<void> => {
    try {
        await signOut(auth);
        console.log("User signed out successfully.");
    } catch (error) {
        console.error("Error signing out:", error);
        throw error; // Re-throw error for handling at the call site
    }
};

export const doPasswordReset = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent.");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error; // Re-throw error for handling at the call site
    }
};

export const doPasswordChange = async (password: string): Promise<void> => {
    try {
        if (auth.currentUser) {
            await updatePassword(auth.currentUser, password);
            console.log("Password updated successfully.");
        } else {
            throw new Error("No user is currently signed in.");
        }
    } catch (error) {
        console.error("Error updating password:", error);
        throw error; // Re-throw error for handling at the call site
    }
};

export const doSendEmailVerification = async (): Promise<void> => {
    try {
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser, {
                url: `${window.location.origin}/`, // URL to redirect to after verification
            });
            console.log("Verification email sent.");
        } else {
            throw new Error("No user is currently signed in.");
        }
    } catch (error) {
        console.error("Error sending email verification:", error);
        throw error; // Re-throw error for handling at the call site
    }
};
