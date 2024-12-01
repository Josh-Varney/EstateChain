import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingSubscription from "../src/components/landing/components/footer/footer";

// Mock child components
jest.mock("../src/components/landing/components/footer/components/footer-form", () => () => (
    <div data-testid="subscription-form">Subscription Form</div>
));
jest.mock("../src/components/landing/components/footer/components/footer-card", () => () => (
    <div data-testid="links-card">Links Card</div>
));
jest.mock("../src/components/landing/components/footer/components/footer-info", () => () => (
    <div data-testid="footer">Footer</div>
));

describe("LandingSubscription Component", () => {
    it("should render the SubscriptionForm component", () => {
        render(<LandingSubscription />);
        expect(screen.getByTestId("subscription-form")).toBeInTheDocument();
    });

    it("should render the LinksCard component", () => {
        render(<LandingSubscription />);
        expect(screen.getByTestId("links-card")).toBeInTheDocument();
    });

    it("should render the Footer component", () => {
        render(<LandingSubscription />);
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("should match the snapshot", () => {
        const { container } = render(<LandingSubscription />);
        expect(container).toMatchSnapshot();
    });
});
