import React from "react";
import GoogleProvider from "../../../provider/googleProvider";
import LinkedinProvider from "../../../provider/linkedinProvider";

const SocialLoginProviders: React.FC = () => (
  <div>
    <div className="flex flex-row justify-center space-x-10">
        <GoogleProvider />
        <LinkedinProvider />
    </div>
  </div>
);

export default SocialLoginProviders;
