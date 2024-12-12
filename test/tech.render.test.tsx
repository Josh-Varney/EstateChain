import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TechnologyPage from "../src/components/landing/technology-page/technology";

// Mock child components
jest.mock("../src/components/landing/components/header/header", () => () => (
  <div data-testid="landing-header">LandingHeader</div>
));
jest.mock("../src/components/landing/components/footer/footer", () => () => (
  <div data-testid="landing-subscription">LandingSubscription</div>
));
jest.mock("../src/components/landing/technology-page/components/tech-hero", () => () => (
  <div data-testid="technology-hero">TechnologyHero</div>
));
jest.mock("../src/components/landing/technology-page/components/tech-used", () => () => (
  <div data-testid="cutting-edge-technologies">CuttingEdgeTechnologies</div>
));
jest.mock("../src/components/landing/technology-page/components/tech-use", () => () => (
  <div data-testid="tokenization-section">TokenizationSection</div>
));

describe("TechnologyPage", () => {
  beforeEach(() => {
    render(<TechnologyPage />);
  });

  it("renders the page without crashing", () => {
    // Assert that all key components are rendered
    expect(screen.getByTestId("landing-header")).toBeInTheDocument();
    expect(screen.getByTestId("technology-hero")).toBeInTheDocument();
    expect(screen.getByTestId("cutting-edge-technologies")).toBeInTheDocument();
    expect(screen.getByTestId("tokenization-section")).toBeInTheDocument();
    expect(screen.getByTestId("landing-subscription")).toBeInTheDocument();
  });

  it("renders components in the correct order", () => {
    const elements = [
      screen.getByTestId("landing-header"),
      screen.getByTestId("technology-hero"),
      screen.getByTestId("tokenization-section"),
      screen.getByTestId("cutting-edge-technologies"),
      screen.getByTestId("landing-subscription"),
    ];

    // Assert that each element appears in the correct order
    for (let i = 0; i < elements.length - 1; i++) {
      expect(elements[i].compareDocumentPosition(elements[i + 1])).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    }
  });

  it("does not render unexpected elements", () => {
    // Verify that certain elements or components are not rendered
    expect(screen.queryByTestId("unexpected-component")).not.toBeInTheDocument();
    expect(screen.queryByText("Unexpected Text")).not.toBeInTheDocument();
  });

  it("ensures the footer is always rendered last", () => {
    const footer = screen.getByTestId("landing-subscription");
    expect(footer.nextElementSibling).toBeNull();
  });
});
