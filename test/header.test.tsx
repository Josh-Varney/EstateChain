import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
    const navLabels = ["Home", "Technology", "Features", "Pricing", "FAQ", "Contact Us"];

    // Ensure all nav labels are present
    navLabels.forEach((label) =>
      expect(desktopNavLinks.some((link) => link.textContent === label)).toBe(true)
    );
  });

  it("toggles mobile menu visibility when the hamburger icon is clicked", () => {
    renderComponent();
    const hamburgerButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    // Open the mobile menu
    fireEvent.click(hamburgerButton);
    const mobileNavLinks = screen.getAllByRole("link");

    // Ensure mobile menu links are present
    const navLabels = ["Home", "Technology", "Features", "Pricing", "FAQ", "Contact Us"];
    navLabels.forEach((label) =>
      expect(mobileNavLinks.some((link) => link.textContent === label)).toBe(true)
    );

    // Close the mobile menu
    fireEvent.click(hamburgerButton);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders the 'Create Account' button in both desktop and mobile views", () => {
    renderComponent();

    // Desktop button
    const desktopButton = screen.getByRole("button", { name: /create account/i });
    expect(desktopButton).toBeInTheDocument();

    // Mobile menu button
    const hamburgerButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    fireEvent.click(hamburgerButton);

    const mobileButton = screen.getAllByRole("button", { name: /create account/i })[1]; // Select the second button
    expect(mobileButton).toBeInTheDocument();
  });

  it("closes the mobile menu when a navigation link is clicked", () => {
    renderComponent();
    const hamburgerButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    // Open the mobile menu
    fireEvent.click(hamburgerButton);

    const mobileNavLinks = screen.getAllByText("Home");
    fireEvent.click(mobileNavLinks[1]); // Click the mobile version of "Home"

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
