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
import { auth } from "./firebase"; 
import axios from "axios";


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

        if (userCredential.user){
            
            const response = await axios.get(`http://localhost:3001/api/checkUserExists`, {
                params: { uuid: userCredential.user.uid },
            });

            if (userCredential.user && !response.data.exists){

                const userData: { 
                    uuid: string;
                    email: string;
                    displayName: string;
                    photoURL: string;
                    providerID: string;
                    phone_number: string;
                } = {
                    uuid: userCredential.user.uid,
                    email: userCredential.user.email ? userCredential.user.email : "NotProvidedbyGoogle",
                    displayName: userCredential.user.displayName ? userCredential.user.displayName : "NotProvidedbyGoogle",
                    photoURL: userCredential.user.photoURL ? userCredential.user.photoURL : "NotProvidedByGoogle",
                    providerID: userCredential.user.providerId ? userCredential.user.providerId : "NotProvidedByGoogle",
                    phone_number: userCredential.user.phoneNumber ? userCredential.user.phoneNumber : "NotProvidedByGoogle"
                }
    
                try {
                    const response = await axios.post(`http://localhost:3001/api/postUser`, { userData });
                    console.log('Response from server:', response.data);
                }
                catch (error) {
                    console.error('Error sending user data:', error);
                }
            }
            localStorage.setItem('uuid', userCredential.user.uid);
        }

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

        if (result.user){
            const response = await axios.get(`http://localhost:3001/api/checkUserExists`, {
                params: { uuid: result.user.uid },
            });
    
            if (result.user && !response.data.exists){
    
                const userData: { 
                    uuid: string;
                    email: string;
                    displayName: string;
                    photoURL: string;
                    providerID: string;
                    phone_number: string;
                } = {
                    uuid: result.user.uid,
                    email: result.user.email ? result.user.email : "NotProvidedbyGoogle",
                    displayName: result.user.displayName ? result.user.displayName : "NotProvidedbyGoogle",
                    photoURL: result.user.photoURL ? result.user.photoURL : "NotProvidedByGoogle",
                    providerID: result.user.providerId ? result.user.providerId : "NotProvidedByGoogle",
                    phone_number: result.user.phoneNumber ? result.user.phoneNumber : "NotProvidedByGoogle"
                }
    
                try {
                    const response = await axios.post(`http://localhost:3001/api/postUser`, { userData });
                    console.log('Response from server:', response.data);
                }
                catch (error) {
                    console.error('Error sending user data:', error);
            }
            
        }
        localStorage.setItem("uuid", result.user.uid);
    }
        return result.user; // Return the signed-in user
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error; // Re-throw error for handling at the call site
    }
};

export const checkUserIsPrivileged = async (): Promise<boolean> => {
    try {
        const uuid = localStorage.getItem("uuid");
        if (!uuid) {
            console.log("UUID not found in localStorage");
            return false;
        }

        const response = await axios.get(`http://localhost:3001/api/checkClient`, {
            params: { uuid }
        });

        return response.data.isPrivileged || false; // Ensure it returns a boolean
    } catch (error) {
        console.error("Error checking privileges:", error);
        return false;
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
