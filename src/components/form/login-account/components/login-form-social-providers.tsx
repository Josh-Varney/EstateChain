import React from "react";
import GoogleProvider from "../../../provider/googleProvider";

const SocialLoginProviders: React.FC = () => (
  <div>
    <div className="flex flex-row justify-center space-x-10">
        <GoogleProvider />
    </div>
  </div>
);

export default SocialLoginProviders;
