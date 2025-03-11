import React, { useEffect, useState } from "react";
import WalletPrompt from "../prompts/WalletWarningPrompt";
import WalletDropdown from "../prompts/WalletConnected";
import ProfileDropdown from "../prompts/ProfileDropdown";
import NotificationDropdown from "../prompts/NotificationDropdown";
import { getNotifications } from "./notification manager/get";
import { ethers } from "ethers";

interface PromptsProps {
  walletConnectPrompt: boolean;
  walletConnectedPrompt: boolean;
  profilePrompt: boolean;
  notificationPrompt: boolean;
  setWalletConnectPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setWalletConnectedPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  closeProfilePrompt: () => void;
  closeNotificationPrompt: () => void;
}

interface NotificationType {
  nid: number;
  uuid: string;
  message: string;
  type: 'info' | 'rejection'; // maybe more
  related_table: string;
  related_id: number;
  wasRead: boolean;
}

const Prompts: React.FC<PromptsProps> = ({
  walletConnectPrompt,
  walletConnectedPrompt,
  profilePrompt,
  notificationPrompt,
  setWalletConnectPrompt,
  setWalletConnectedPrompt,
  closeProfilePrompt,
  closeNotificationPrompt,
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userUUID = localStorage.getItem("uuid");

  useEffect(() => {
    if (!userUUID) return; // Prevent request if no UUID

    const fetchNotifications = async () => {
      setLoading(true);
      const fetchedNotifications = await getNotifications<any>(
        `http://localhost:8080/get-notifications/${userUUID}`,
        "GET"
      );
      
      // Set notifications
      setNotifications(Array.isArray(fetchedNotifications.notifications) ? fetchedNotifications.notifications : []);
      setLoading(false);
    };

    fetchNotifications();
  }, [userUUID])
  

  return (
    <>
      {/* Wallet Prompts */}
      {walletConnectPrompt && (
        <WalletPrompt close={setWalletConnectPrompt} />
      )}

      {walletConnectedPrompt && (
        <WalletDropdown
          close={setWalletConnectedPrompt}
          isOpen={walletConnectedPrompt}
        />
      )}

      {/* Notification Dropdown */}
      {notificationPrompt && (
        <NotificationDropdown
          close={closeNotificationPrompt}
          isOpen={notificationPrompt}
          notifications={notifications}
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
