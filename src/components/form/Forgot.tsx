import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import backgroundImage from '../assets/block.webp'; 
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doPasswordReset } from "../../firebase/auth";

const ForgotPasswordScreen: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>(""); // Error state
    const [success, setSuccess] = useState<string>(""); // Success message state

    // Initialize navigate hook
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                // If user is logged in, log them out
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
        // const auth = getAuth();
    
        try {
            setError(""); // Clear previous errors
            setSuccess(""); // Clear previous success message
            
            // Send password reset email
            await doPasswordReset(email);
            setSuccess("Password reset email sent successfully. Please check your inbox.");

            setTimeout(() => {
                navigate('/'); // Redirect after a delay
            }, 400); // Delay in milliseconds

        } catch (error: any) { // Explicitly typing error as 'any'
            setError("Error sending password reset email: " + error.message); // Set error message for UI
        }
    };
    
    return (
        <div
            className="flex items-center justify-center min-h-screen p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-white bg-opacity-90">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

                    {error && <div className="mb-4 text-red-500">{error}</div>} {/* Display error message */}
                    {success && <div className="mb-4 text-green-500">{success}</div>} {/* Display success message */}

                    <div className="flex font-medium text-sm items-center mb-4 border rounded-full p-2 border-gray-300">
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
                    >
                        Send Reset Email
                    </button>

                    <div className="text-center font-medium text-xs text-gray-500 mt-6">
                        <p>
                            Remembered your password? <a href="/" className="text-blue-500 hover:underline">Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
