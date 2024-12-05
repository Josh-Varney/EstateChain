import React from "react";

interface Props {
  error: string;
  success: string;
  onResend: () => void;
  showResendLink: boolean;
}

const ErrorSuccessMessage: React.FC<Props> = ({ error, success, onResend, showResendLink }) => (
  <div>
    {error && (
      <div className="text-red-500 text-sm mb-4 flex justify-center">
        {error}
        {showResendLink && (
          <span className="ml-2 text-blue-500 cursor-pointer hover:underline" onClick={onResend}>
            Resend
          </span>
        )}
      </div>
    )}
    {success && <div className="text-green-500 text-sm mb-4 flex justify-center">{success}</div>}
  </div>
);

export default ErrorSuccessMessage;
