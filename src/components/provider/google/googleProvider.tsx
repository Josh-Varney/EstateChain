import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignInWithGoogle } from '../../../firebase/auth';

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
            className="
                m-1 mb-6 w-fit p-1 pl-2 pr-2 border bg-white bg-opacity-20
                square-full shadow-md rounded-lg 
                transition-transform transform 
                hover:scale-105 hover:bg-white
                hover:shadow-md active:scale-95 
                focus:outline-none
            "
            onClick={handleSubmit}
        >
            <div className="flex flex-row text-center justify-center items-center">
                <img
                    src="/assets/icons8-google.svg"
                    className="h-8"
                    alt="Google Icon"
                />
                <p className="pl-2 text-sm">Sign In With Google</p>
            </div>
        </button>
      );
};


export default GoogleProvider;