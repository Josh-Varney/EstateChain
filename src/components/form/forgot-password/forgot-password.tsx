import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAuth, signOut } from "firebase/auth";
import Header from "./components/forgot-password-header";
import PasswordResetForm from "./components/forgot-password-reset-form";

const ForgotPasswordScreen: React.FC = () => {

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
                <div className="w-full max-w-sm p-6 rounded-lg shadow-xl bg-slate-700 bg-opacity-90">
                    <PasswordResetForm />
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
