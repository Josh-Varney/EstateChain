// import React from "react";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import LandingPage from "../src/components/landing/landing-page/landing";

// // Mock child components
// jest.mock("../src/components/landing/components/header/header", () => () => <header>LandingHeader</header>);
// jest.mock("../src/components/landing/landing-page/components/landing-title", () => () => <h1>LandingTitle</h1>);
// jest.mock("../src/components/landing/landing-page/components/landing-partners", () => () => <section aria-label="Partner Cards">PartnerCards</section>);
// jest.mock("../src/components/landing/landing-page/components/landing-features", () => () => <section aria-label="Features">Features</section>);
// jest.mock("../src/components/landing/landing-page/components/landing-training", () => () => (
//   <section aria-label="Training Dashboard">TrainingDashboard</section>
// ));
// jest.mock("../src/components/landing/landing-page/components/landing-FAQ.tsx", () => () => <section aria-label="FAQ">LandingFAQ</section>);
// jest.mock("../src/components/landing/components/footer/footer", () => () => <footer>LandingSubscription</footer>);

// describe("LandingPage Component", () => {
//   const renderPage = () => render(<LandingPage />);

//   it("renders all key sections", () => {
//     renderPage();

//     // Assert that all main sections are rendered
//     expect(screen.getByText("LandingHeader")).toBeInTheDocument();
//     expect(screen.getByText("LandingTitle")).toBeInTheDocument();
//     expect(screen.getByLabelText("Partner Cards")).toBeInTheDocument();
//     expect(screen.getByLabelText("Features")).toBeInTheDocument();
//     expect(screen.getByLabelText("Training Dashboard")).toBeInTheDocument();
//     expect(screen.getByLabelText("FAQ")).toBeInTheDocument();
//     expect(screen.getByText("LandingSubscription")).toBeInTheDocument();
//   });

//   it("renders sections in the correct order", () => {
//     renderPage();

//     const elements = [
//       screen.getByText("LandingHeader"),
//       screen.getByText("LandingTitle"),
//       screen.getByLabelText("Partner Cards"),
//       screen.getByLabelText("Features"),
//       screen.getByLabelText("Training Dashboard"),
//       screen.getByLabelText("FAQ"),
//       screen.getByText("LandingSubscription"),
//     ];

//     // Assert that elements are in the correct order
//     elements.reduce((prev, curr) => {
//       expect(prev.compareDocumentPosition(curr)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
//       return curr;
//     });
//   });

//   it("has the correct background classes applied to the main container", () => {
//     renderPage();
//     const container = screen.getByTestId("landing-page-container");
//     expect(container).toHaveClass("relative", "min-h-screen", "bg-gradient-to-b", "from-gray-800", "to-gray-900", "overflow-hidden");
//   });

//   it("contains a horizontal divider between FAQ and Subscription", () => {
//     renderPage();
//     const divider = screen.getByRole("separator");
//     expect(divider).toBeInTheDocument();
//   });
// });
