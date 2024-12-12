import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import LandingHeader from "../src/components/landing/components/header/header";

// Mock FontAwesomeIcon for simplicity
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="font-awesome-icon"></span>,
}));

describe("LandingHeader Component", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <LandingHeader />
      </BrowserRouter>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all navigation links for desktop", () => {
    renderComponent();
    const desktopNavLinks = screen.getAllByRole("link");
    const navLabels = ["Home", "Technology", "Features", "Pricing", "FAQ", "About Us"]; // Updated labels

    // Ensure all nav labels are present
    navLabels.forEach((label) =>
      expect(desktopNavLinks.some((link) => link.textContent === label)).toBe(true)
    );
  });

  it("closes the mobile menu when a navigation link is clicked", () => {
    renderComponent();
    const hamburgerButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
  
    // Open the mobile menu
    fireEvent.click(hamburgerButton);
  
    // Limit the scope to the mobile navigation container
    const mobileNavContainer = screen.getByRole("navigation", {
      name: "mobile-navigation", // Ensure this role or label is uniquely identifiable in the component
    });
  
    const mobileNavLink = within(mobileNavContainer).getByText("Home");
  
    // Click the mobile version of "Home"
    fireEvent.click(mobileNavLink);
  
    // Assert the mobile menu is closed
    expect(screen.queryByRole("navigation", { name: "mobile-navigation" })).not.toBeInTheDocument();
  });
  

  it("renders the 'Create Account' button in both desktop and mobile views", () => {
    renderComponent();
  
    // Desktop button
    const desktopButton = screen.getByRole("button", {
      name: /create account/i,
      hidden: false, // Ensures we're checking visible buttons only
    });
    expect(desktopButton).toBeInTheDocument();
  
    // Open the mobile menu
    const hamburgerButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    fireEvent.click(hamburgerButton);
  
    // Mobile menu button
    const mobileMenu = screen.getByRole("navigation", { name: "mobile-navigation" });
    const mobileButton = within(mobileMenu).getByRole("button", { name: /create account/i });
    expect(mobileButton).toBeInTheDocument();
  });
  

  it("closes the mobile menu when a navigation link is clicked", () => {
    renderComponent();
  
    const hamburgerButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
  
    // Open the mobile menu
    fireEvent.click(hamburgerButton);
  
    // Restrict to the mobile navigation container
    const mobileNavContainer = screen.getByRole("navigation", { name: "mobile-navigation" });
    const mobileNavLinks = within(mobileNavContainer).getAllByText("Home");
  
    // Click the mobile version of "Home" (second "Home" link)
    fireEvent.click(mobileNavLinks[0]); // Adjust index based on the actual order in DOM
  
    // Assert the mobile menu is closed
    expect(screen.queryByRole("navigation", { name: "mobile-navigation" })).not.toBeInTheDocument();
  });
});
