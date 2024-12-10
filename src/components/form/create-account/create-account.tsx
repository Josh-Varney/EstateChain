import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAuth, signOut } from "firebase/auth";
import Header from "./components/create-account-header";
import CreateAccountForm from "./components/create-account-form";

const CreateAccountScreen: React.FC = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();

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
            <div className="flex items-center justify-center flex-grow p-4 bg-cover bg-center">
                <div className="w-full max-w-sm p-6 rounded-lg shadow-xl bg-slate-700 bg-opacity-90" data-aos="zoom-in">
                    <CreateAccountForm />
                </div>
            </div>
        </div>
    );
};

export default CreateAccountScreen;
