import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import backgroundImage from "../assets/block.webp"; 
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doPasswordReset } from "../../firebase/auth";
import LandingHeader from "../landing/components/header/header";

const ForgotPasswordScreen: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>(""); // Error state
    const [success, setSuccess] = useState<string>(""); // Success message state

    const navigate = useNavigate();

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
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setError(""); // Clear previous errors
            setSuccess(""); // Clear previous success message
            
            await doPasswordReset(email); // Send password reset email
            setSuccess("Password reset email sent successfully. Please check your inbox.");

            setTimeout(() => {
                navigate('/'); // Redirect after a short delay
            }, 400);

        } catch (error: any) {
            setError("Error sending password reset email: " + error.message); // Display error
        }
    };
    
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900">
            <div data-aos="fade-down">
                <LandingHeader />
            </div>

            <div
                className="flex items-center justify-center flex-grow p-4 bg-cover bg-center"
                data-aos="zoom-in"
            >
                <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-white bg-opacity-90">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-semibold text-center mb-6" data-aos="fade-up">
                            Forgot Password
                        </h2>

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

                        <div
                            className="flex font-medium text-sm items-center mb-4 border rounded-full p-2 border-gray-300"
                            data-aos="fade-up"
                        >
                            <FaUser className="text-gray-600 mr-3" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 p-2 outline-none bg-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            data-aos="fade-up"
                        >
                            Send Reset Email
                        </button>

                        <div
                            className="text-center font-medium text-xs text-gray-500 mt-6"
                            data-aos="fade-up"
                        >
                            <p>
                                Remembered your password?{" "}
                                <a href="/login" className="text-blue-500 hover:underline">
                                    Login
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
