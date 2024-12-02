import React, { useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import backgroundImage from '../assets/block.webp'; 
import { doCreateUserWithEmailAndPassword, doSendEmailVerification } from "../../firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LandingHeader from "../landing/components/header/header";

const CreateAccountScreen: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>(""); // Error state
    const [success, setSuccess] = useState<string>(""); // Success message state

    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a duration
        AOS.refresh(); // Refresh to ensure animations work dynamically

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

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setError(""); // Clear previous errors
            setSuccess(""); // Clear previous success message

            const userCredentials = await doCreateUserWithEmailAndPassword(email, password);
            const user = userCredentials.user;

            await doSendEmailVerification();

            console.log(user.emailVerified);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSuccess("Account created successfully");

            setTimeout(() => {
                navigate('/'); // Redirect after a delay
            }, 2000); // Delay in milliseconds

        } catch (error: any) {
            setError("Sign-up error: " + error.message); // Set error message for UI
        }
    };

    return (
        <div>
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="LandingHeader" data-aos="fade-down">
                    <LandingHeader />
                </div>
                <div
                    className="flex items-center justify-center flex-grow p-4 bg-cover bg-center"
                >
                    <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-white bg-opacity-90" data-aos="zoom-in">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-semibold text-center mb-6" data-aos="fade-up">Create an Account</h2>

                            {error && <div className="mb-4 text-red-500" data-aos="fade-right">{error}</div>}
                            {success && <div className="mb-4 text-green-500" data-aos="fade-right">{success}</div>}

                            <div className="flex items-center font-medium text-sm mb-4 border rounded-full p-2 border-gray-300" data-aos="fade-up">
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

                            <div className="flex items-center font-medium text-sm mb-4 border rounded-full p-2 border-gray-300" data-aos="fade-up">
                                <FaLock className="text-gray-600 mr-3" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="flex-1 p-2 outline-none bg-transparent"
                                />
                            </div>

                            <div className="flex items-center font-medium text-sm mb-6 border rounded-full p-2 border-gray-300" data-aos="fade-up">
                                <FaLock className="text-gray-600 mr-3" />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="flex-1 p-2 outline-none bg-transparent"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                data-aos="fade-up"
                            >
                                Create Account
                            </button>

                            <div className="font-medium text-xs text-gray-500 text-center mt-6" data-aos="fade-up">
                                <p>
                                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountScreen;
