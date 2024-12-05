import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { doCreateUserWithEmailAndPassword, doSendEmailVerification } from "../../../../firebase/auth";
import { useNavigate } from "react-router-dom";
import FormInput from "./create-account-form-input";
import Notification from "./create-account-notification";

const CreateAccountForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setError("");
            setSuccess("");

            const userCredentials = await doCreateUserWithEmailAndPassword(email, password);
            const user = userCredentials.user;

            await doSendEmailVerification();
            console.log(user.emailVerified);

            setSuccess("Account created successfully");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error: any) {
            setError("Sign-up error: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>

            {error && <Notification message={error} type="error" />}
            {success && <Notification message={success} type="success" />}

            <FormInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={FaUser}
                required
            />

            <FormInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={FaLock}
                required
            />

            <FormInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={FaLock}
                required
            />

            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Create Account
            </button>

            <div className="font-medium text-xs text-gray-500 text-center mt-6">
                <p>
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </form>
    );
};

export default CreateAccountForm;
