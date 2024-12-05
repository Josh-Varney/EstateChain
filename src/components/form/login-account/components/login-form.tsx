import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doSendEmailVerification, doSignInWithEmailAndPassword } from "../../../../firebase/auth";
import SocialLoginProviders from "./login-form-social-providers";
import ErrorSuccessMessage from "./login-form-error-message";
import FormField from "./login-form-field";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showResendLink, setShowResendLink] = useState<boolean>(false);

  const navigate = useNavigate();

  const resendVerification = async () => {
    try {
      setShowResendLink(false);
      await doSendEmailVerification();
      setSuccess("Verification email sent. Please check your inbox.");
    } catch (error: any) {
      console.error("Error sending email verification: ", error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      const userCredentials = await doSignInWithEmailAndPassword(username, password);

      if (userCredentials.emailVerified) {
        setTimeout(() => navigate("/home"), 2000);
      } else {
        setError("Please verify your email.");
        setShowResendLink(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.code === "auth/invalid-credential"
          ? "Invalid credentials. Please check your email and password."
          : "Sign-in error: An unexpected error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-white bg-opacity-90">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-center mb-6" data-aos="fade-up">
          Login Form
        </h2>

        <ErrorSuccessMessage error={error} success={success} onResend={resendVerification} showResendLink={showResendLink} />

        <FormField
          icon="user"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormField
          icon="lock"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center font-medium text-xs text-gray-500 justify-between mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember Me
          </label>
          <a href="/forgot" className="text-blue-500 font-medium text-xs hover:underline">
            Forgot Password?
          </a>
        </div>

        <SocialLoginProviders />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Login
        </button>

        <div className="text-center text-xs font-medium text-gray-500 mt-6">
          <p>
            Don't Have An Account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
