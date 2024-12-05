import React from "react";
import GoogleProvider from "../../../provider/google/googleProvider";
import FacebookProvider from "../../../provider/google/facebookProvider";

const SocialLoginProviders: React.FC = () => (
  <div>
    <h3 className="flex items-center text-xs mb-4 font-medium text-gray-600">
      <span className="flex-1 border-t border-gray-300"></span>
      <span className="mx-4 text-gray-500">Or Sign In With</span>
      <span className="flex-1 border-t border-gray-300"></span>
    </h3>
    <div className="flex flex-row justify-center space-x-10">
      <GoogleProvider />
      <FacebookProvider />
    </div>
  </div>
);

export default SocialLoginProviders;
