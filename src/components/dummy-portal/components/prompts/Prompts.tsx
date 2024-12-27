import React from "react";
import WalletPrompt from "../prompts/WalletWarningPrompt";
import WalletDropdown from "../prompts/WalletConnected";
import ProfileDropdown from "../prompts/ProfileDropdown";
import NotificationDropdown from "../prompts/NotificationDropdown";

interface PromptsProps {
  walletConnectPrompt: boolean;
  walletConnectedPrompt: boolean;
  profilePrompt: boolean;
  notificationPrompt: boolean;
  closeWalletConnectPrompt: () => void;
  closeWalletConnectedPrompt: () => void;
  closeProfilePrompt: () => void;
  closeNotificationPrompt: () => void;
}

const Prompts: React.FC<PromptsProps> = ({
  walletConnectPrompt,
  walletConnectedPrompt,
  profilePrompt,
  notificationPrompt,
  closeWalletConnectPrompt,
  closeWalletConnectedPrompt,
  closeProfilePrompt,
  closeNotificationPrompt,
}) => {
  return (
    <>
      {/* Wallet Prompts */}
      {walletConnectPrompt && (
        <WalletPrompt close={closeWalletConnectPrompt} />
      )}
      {walletConnectedPrompt && (
        <WalletDropdown
          close={closeWalletConnectedPrompt}
          isOpen={walletConnectedPrompt}
        />
      )}

      {/* Notification Dropdown */}
      {notificationPrompt && (
        <NotificationDropdown
          close={closeNotificationPrompt}
          isOpen={notificationPrompt}
          notifications={[]}
        />
      )}

      {/* Profile Dropdown */}
      {profilePrompt && (
        <ProfileDropdown close={closeProfilePrompt} isOpen={profilePrompt} />
      )}
    </>
  );
};

export default Prompts;
