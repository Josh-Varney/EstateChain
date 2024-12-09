import React, { useEffect, useState } from 'react';

const LoadingDots = () => {
    return (
        <div className="">
            <div className="flex space-x-1">
                <span className="dot animate-bounce bg-gray-700 rounded-full w-3 h-3"></span>
                <span className="dot animate-bounce bg-gray-700 rounded-full w-3 h-3 delay-200"></span>
                <span className="dot animate-bounce bg-gray-700 rounded-full w-3 h-3 delay-400"></span>
            </div>
        </div>
    );
};

const LinkedinCallback: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<string>('Processing LinkedIn login...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');

    if (accessToken) {
      console.log('Access Token:', accessToken);
      console.log('Expires In:', expiresIn);

      // Save the token in local storage
      localStorage.setItem('linkedin_access_token', accessToken);

      // Update status message
      setStatusMessage('Login Successful! You will be redirected.');

      // Notify the parent window about the success
      setTimeout(() => {
        if (window.opener) {
          window.opener.postMessage({ status: 'success', accessToken, expiresIn },'http://localhost:3000');
          window.close(); // Close the popup
        }
      }, 3000); // 3-second delay
    } else {
      console.error('No access token found in the URL');
      setStatusMessage('Login Failed! Redirecting to homepage.');

      // Notify the parent window about the failure
      setTimeout(() => {
        if (window.opener) {
          window.opener.postMessage({ status: 'failure' }, 'http://localhost:3000');
          window.close(); // Close the popup
        }
      }, 3000); // 3-second delay
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
    {/* Logo Section */}
    <section className="flex flex-col items-center mb-2">
        <img
            className="w-3/4 mb-4"
            src="/centreform-new-logo.png"
            alt="Centreform logo"
        />
    </section>

    {/* Status Message and Loading Animation Section */}
    <section className="flex flex-col items-center">
        <div className="text-lg font-medium text-gray-700 mb-2 text-center">
            {statusMessage}
        </div>
        <div>
            <LoadingDots />
        </div>
    </section>
</div>

    );
};

export default LinkedinCallback;