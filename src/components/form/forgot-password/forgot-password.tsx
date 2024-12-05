import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAuth, signOut } from "firebase/auth";
import Header from "./components/forgot-password-header";
import PasswordResetForm from "./components/forgot-password-reset-form";

const ForgotPasswordScreen: React.FC = () => {
    const [error, setError] = useState<string>(""); // Error state
    const [success, setSuccess] = useState<string>(""); // Success message state

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with animations
        AOS.refresh(); // Refresh to ensure dynamic content works

        const checkAuthStatus = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                try {
                    await signOut(auth);
                } catch (error) {
                    console.error("Error signing out: ", error);
                    setError("Error signing out. Please try again.");
                }
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900">
            <Header />
            <div
                className="flex items-center justify-center flex-grow p-4 bg-cover bg-center"
                data-aos="zoom-in"
            >
                <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-white bg-opacity-90">
                    {error && (
                        <div className="mb-4 text-red-500" data-aos="fade-right">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 text-green-500" data-aos="fade-right">
                            {success}
                        </div>
                    )}
                    <PasswordResetForm setError={setError} setSuccess={setSuccess} />
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
