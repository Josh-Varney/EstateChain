// WalletDropdown.tsx
import React from 'react';

interface WalletDropdownProps {
  close: () => void;
}

const WalletDropdown: React.FC<WalletDropdownProps> = ({ close }) => {
    return (
      <div className="absolute right-4 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
        <div className="p-4 hover:bg-gray-200 cursor-pointer" onClick={close}>
          Disconnect
        </div>
        {/* Additional options can be added here */}
      </div>
    );
  };

export default WalletDropdown;