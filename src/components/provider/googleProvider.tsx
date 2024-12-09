import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignInWithGoogle } from '../../firebase/auth';

const GoogleProvider: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // const auth = getAuth();
        try {
            await doSignInWithGoogle();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/home");
        } catch (error) {
            console.error("Sign-in error:", error);
        }
    };

    return (
        <button
            className="m-1 mb-6 p-2 border bg-white square-full shadow-md transition-transform transform hover:scale-105 hover:bg-blue-500 hover:shadow-lg active:scale-95 focus:outline-none" onClick={handleSubmit}
            >
            <img
                src={"/assets/icons8-google-2.svg"}
                alt="Google Logo"
                className="w-11 h-10 opacity-100"
            />
        </button>
    );
};


export default GoogleProvider;