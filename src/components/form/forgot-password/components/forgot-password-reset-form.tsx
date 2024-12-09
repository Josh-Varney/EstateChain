import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { doPasswordReset } from "../../../../firebase/auth";

const PasswordResetForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>(""); // Local state for error messages
    const [success, setSuccess] = useState<string>(""); // Local state for success messages

    // Effect to clear error and success messages after 4 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setError("");
            setSuccess("");
        }, 4000);

        return () => clearTimeout(timer); // Cleanup timer on unmount or state change
    }, [error, success]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError(""); // Clear previous errors
            setSuccess(""); // Clear previous success messages

            await doPasswordReset(email); // Send password reset email
            setSuccess("Password reset email sent successfully. Please check your inbox.");
        } catch (error: any) {
            setError("Error sending password reset email: " + error.message); // Display error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center mb-6" data-aos="fade-up">
                Forgot Password
            </h2>

            <div className="mb-4">
                {error && (
                    <div
                        className="flex items-center justify-center text-sm mb-4 text-red-600 bg-red-100 border border-red-300 rounded-md p-3 w-full max-w-md"
                        aria-live="assertive"
                    >
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div
                        className="flex items-center justify-center text-sm text-green-600 bg-green-100 border border-green-300 rounded-md p-3 w-full max-w-md"
                        aria-live="polite"
                    >
                        {success}
                    </div>
                )}
            </div>
            <div
                className="flex font-medium text-sm items-center mb-6 border rounded-full p-2 border-gray-300"
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
    );
};

export default PasswordResetForm;
