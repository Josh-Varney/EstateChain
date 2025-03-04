import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doSendEmailVerification, doSignInWithEmailAndPassword } from "../../../../firebase/auth";
import SocialLoginProviders from "./login-form-social-providers";
import ErrorSuccessMessage from "./login-form-error-message";
import FormField from "./login-form-field";
import axios from "axios";

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
        setSuccess("Login successful. Redirecting...");

        const response = await axios.get(`http://localhost:3001/api/checkClient`, {
          params: { uuid: userCredentials.uid }
        })

        if (response.data.exists == false){
          setTimeout(() => navigate("/selector"), 2000); //
        }
        else 
        {
          setTimeout(() => navigate("/adm-hub-hidden"), 2000); //
        }
        
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

  // Timer to clear error or success messages
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (error || success) {
      timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000); // 5 seconds
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [error, success]);

  return (
    <div className="w-full max-w-sm p-6 rounded-lg shadow-xl bg-slate-700 bg-opacity-90">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-center text-teal-500 mb-6" data-aos="fade-up">
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

        <div className="flex items-center font-medium text-xs text-white justify-between mb-6">
          <label className="flex items-center">
            <div className="flex flex-row space-x-1">
              <input type="checkbox" className="mr-2 accent-teal-500" />
              Remember Me
            </div>
          </label>
          <a href="/forgot" className="text-teal-500 font-medium text-xs hover:underline">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
          Login
        </button>

        <div className="flex justify-center items-center my-6">
          <hr className="flex-grow border-gray-300 mx-4" />
          <p className="text-white text-xs font-medium">Or Sign In With</p>
          <hr className="flex-grow border-gray-300 mx-4" />
        </div>

        <div>
          <SocialLoginProviders />
        </div>

        <div className="text-center text-xs font-medium text-white mt-6">
          <p>
            Don't Have An Account?{" "}
            <a href="/register" className="text-teal-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
