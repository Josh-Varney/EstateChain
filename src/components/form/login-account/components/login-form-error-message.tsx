import React from "react";

interface Props {
  error: string;
  success: string;
  onResend: () => void;
  showResendLink: boolean;
}

const ErrorSuccessMessage: React.FC<Props> = ({ error, success, onResend, showResendLink }) => {
  return (
    <div className="flex flex-col items-center space-y-4 mb-2">
      {error && (
        <div
          className="flex items-center justify-center text-sm mb-4 text-red-600 bg-red-100 border border-red-300 rounded-md p-3 w-full max-w-md"
          aria-live="assertive"
        >
          <span>{error}</span>
          {showResendLink && (
            <button
              className="ml-2 text-blue-500 hover:underline focus:outline-none"
              onClick={onResend}
            >
              Resend
            </button>
          )}
        </div>
      )}
      {success && (
        <div
          className="flex mb-2 items-center justify-center text-sm text-green-600 bg-green-100 border border-green-300 rounded-md p-3 w-full max-w-md"
          aria-live="polite"
        >
          {success}
        </div>
      )}
    </div>
  );
};

export default ErrorSuccessMessage;
