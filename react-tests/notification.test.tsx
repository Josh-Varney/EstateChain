import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import NotificationDropdown from "../src/components/dummy-portal/components/prompts/NotificationDropdown";

describe("Notifications", () => {
  const closeMock = jest.fn();

  const notifications = [
    { nid: 1, uuid: '123', message: 'Info message 1', type: 'info', related_table: 'table1', related_id: 1, wasRead: false },
    { nid: 2, uuid: '124', message: 'Rejection message 1', type: 'rejection', related_table: 'table1', related_id: 1, wasRead: false },
  ];

  it('renders correctly when the dropdown is open', () => {
    render(
      <NotificationDropdown close={closeMock} notifications={notifications} isOpen={true} />
    );

    // Check if the notification dropdown is rendered
    expect(screen.getByText(/Notifications/)).toBeInTheDocument();
    expect(screen.getByText('Info message 1')).toBeInTheDocument();
    expect(screen.getByText('Rejection message 1')).toBeInTheDocument();
  });

  it('does not render when the dropdown is closed', () => {
    render(
      <NotificationDropdown close={closeMock} notifications={notifications} isOpen={false} />
    );

    // Check if the notification dropdown is not rendered
    expect(screen.queryByText(/Notifications/)).not.toBeInTheDocument();
  });

  it('closes on pressing the Escape key', () => {
    render(
      <NotificationDropdown close={closeMock} notifications={notifications} isOpen={true} />
    );

    // Simulate pressing Escape key
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    // Check if close function is called
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it('handles 1000 notifications and renders them correctly', () => {
    // Generate 100 notifications
    const largeNotifications = Array.from({ length: 1000 }, (_, index) => ({
      nid: index + 1,
      uuid: `uuid-${index + 1}`,
      message: `Notification message ${index + 1}`,
      type: index % 2 === 0 ? 'info' : 'rejection',
      related_table: 'table1',
      related_id: index + 1,
      wasRead: false,
    }));

    render(
      <NotificationDropdown close={closeMock} notifications={largeNotifications} isOpen={true} />
    );

    // Ensure that the dropdown renders all notifications (checking for first and last)
    expect(screen.getByText('Notification message 1')).toBeInTheDocument();
    expect(screen.getByText('Notification message 100')).toBeInTheDocument();

    // Check if rendering handles many notifications efficiently
    const notificationItems = screen.getAllByRole('menuitem');
    expect(notificationItems).toHaveLength(1000);
  }, 200);

});

describe('NotificationDropdown - Accuracy Tests', () => {
    const notifications = [
      { nid: 1, uuid: '123', message: 'Info message 1', type: 'info', related_table: 'table1', related_id: 1, wasRead: false },
      { nid: 2, uuid: '124', message: 'Rejection message 1', type: 'rejection', related_table: 'table1', related_id: 1, wasRead: false },
      { nid: 3, uuid: '125', message: 'Info message 2', type: 'info', related_table: 'table2', related_id: 2, wasRead: false },
      { nid: 4, uuid: '126', message: 'Rejection message 2', type: 'rejection', related_table: 'table2', related_id: 2, wasRead: false },
    ];
  
    it('displays notifications with the correct message content', () => {
      render(<NotificationDropdown close={() => {}} notifications={notifications} isOpen={true} />);
  
      // Ensure that each notification message is rendered correctly
      notifications.forEach((notification) => {
        expect(screen.getByText(notification.message)).toBeInTheDocument();
      });
    });
  
    it('displays correct icon based on notification type', () => {
      render(<NotificationDropdown close={() => {}} notifications={notifications} isOpen={true} />);
  
      // Check that the correct icon is rendered for each notification based on type
      const infoNotification = screen.getByText('Info message 1').previousElementSibling;
      const rejectionNotification = screen.getByText('Rejection message 1').previousElementSibling;
  
      // Check the info notification for a check circle icon
      expect(infoNotification).toBeInstanceOf(SVGElement);
      expect(infoNotification?.tagName).toBe('svg'); // It should be an SVG element (FaCheckCircle)
      expect(infoNotification?.classList.contains('text-blue-500')).toBe(true); // Blue color for info
  
      // Check the rejection notification for a times circle icon
      expect(rejectionNotification).toBeInstanceOf(SVGElement);
      expect(rejectionNotification?.tagName).toBe('svg'); // It should be an SVG element (FaTimesCircle)
      expect(rejectionNotification?.classList.contains('text-red-500')).toBe(true); // Red color for rejection
    });
  
    it('displays notifications with the correct colors based on type', () => {
      render(<NotificationDropdown close={() => {}} notifications={notifications} isOpen={true} />);
  
      // Check that the correct color is applied to the text based on notification type
      const infoMessage = screen.getByText('Info message 1').parentElement;
      const rejectionMessage = screen.getByText('Rejection message 1').parentElement;
  
      // Check if info message is blue
      expect(infoMessage?.classList.contains('text-blue-600')).toBe(true);
  
      // Check if rejection message is red
      expect(rejectionMessage?.classList.contains('text-red-600')).toBe(true);
    });
  
    it('renders the correct number of notifications', () => {
      render(<NotificationDropdown close={() => {}} notifications={notifications} isOpen={true} />);
  
      // Ensure all notifications are rendered
      const notificationItems = screen.getAllByRole('menuitem');
      expect(notificationItems).toHaveLength(notifications.length); // Should render the same number as the mock data
    });
  });