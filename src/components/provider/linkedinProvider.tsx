import React from 'react';
import RiseLoader from "react-spinners/RiseLoader";

const LinkedinProvider: React.FC = () => {
    const handleLinkedinLogin = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const popup = window.open(
          'http://localhost:3001/api/linkedin/authorize', // LinkedIn authorization URL
          'linkedinAuthPopup',
          'width=400,height=500'
        );
    
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          alert('Popup blocked. Please allow popups for this website.');
          return;
        }
    };

    return (
        <button
            className="m-1 mb-6 p-2 border bg-white square-full shadow-md transition-transform transform hover:scale-105 hover:bg-blue-500 hover:shadow-lg active:scale-95 focus:outline-none" onClick={handleLinkedinLogin}
            >
            <img
                src={"/assets/icons8-linkedin.svg"}
                alt="Google Logo"
                className="w-11 h-10 opacity-100"
            />
            
        </button>
    );
};


export default LinkedinProvider;