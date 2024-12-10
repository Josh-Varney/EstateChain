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
    const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);


    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!agreeToTerms) {
            setError("You must agree to the Terms & Conditions to create an account.");
            return;
        }

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
            <h2 className="text-2xl font-semibold text-teal-500 text-center mb-6">Create an Account</h2>

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
            
            <div className="flex items-center justify-center space-x-2 pb-6 pt-3">
                <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="accent-teal-500"
                />
                <label htmlFor="terms" className="text-xs text-white">
                    I agree to <a href="/policy/t&c-policy" className="text-teal-500 font-medium text-xs hover:underline">Terms & Conditions</a>
                </label>
            </div>


            <button type="submit" className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                Create Account
            </button>

            <div className="font-medium text-xs text-white text-center mt-6">
                <p> 
                    Already have an account? <a href="/login" className="text-teal-500 hover:underline">Login</a>
                </p>
            </div>
        </form>
    );
};

export default CreateAccountForm;
