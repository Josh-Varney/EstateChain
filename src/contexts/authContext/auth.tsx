import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../../firebase/firebase'; 
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

// Define the shape of the context value
interface AuthContextType {
    currentUser: User | null;
    userLoggedIn: boolean;
    loading: boolean;
    logout: () => Promise<void>;
}

// Create the context with a default value of null
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode; // Define the type for children prop
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const value: AuthContextType = {
        currentUser,
        userLoggedIn: !!currentUser, // userLoggedIn is derived from currentUser
        loading,
        logout, // Provide logout function
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
