// import React from "react";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import FeaturesPage from "../src/components/landing/feature-page/features";

// // Mock child components
// jest.mock("../src/components/landing/components/header/header", () => () => <header>LandingHeader</header>);
// jest.mock("../src/components/landing/components/footer/footer", () => () => <footer>LandingSubscription</footer>);
// jest.mock("../src/components/landing/feature-page/components/features-hero", () => () => <section aria-label="Features Hero">FeaturesHero</section>);
// jest.mock("../src/components/landing/feature-page/components/features-section", () => () => <section aria-label="Features Section">FeaturesSection</section>);
// jest.mock("../src/components/landing/feature-page/components/features-guide", () => () => <section aria-label="How It Works">HowItWorks</section>);
// jest.mock("../src/components/landing/feature-page/components/features-testimonial", () => () => <section aria-label="Testimonials Section">TestimonialsSection</section>);
// jest.mock("../src/components/landing/feature-page/components/features-cta", () => () => <section aria-label="Call To Action">CallToAction</section>);

// describe("FeaturesPage Component", () => {
//   const renderPage = () => render(<FeaturesPage />);

//   it("renders the page container with the correct structure and classes", () => {
//     renderPage();
//     const container = screen.getByTestId("features-page-container");
//     expect(container).toBeInTheDocument();
//     expect(container).toHaveClass("relative", "min-h-screen", "bg-gradient-to-b", "from-gray-800", "to-gray-900", "text-white", "overflow-hidden");
//   });

//   it("renders all main child components", () => {
//     renderPage();

//     // Assert the presence of all key sections
//     expect(screen.getByText("LandingHeader")).toBeInTheDocument();
//     expect(screen.getByLabelText("Features Hero")).toBeInTheDocument();
//     expect(screen.getByLabelText("Features Section")).toBeInTheDocument();
//     expect(screen.getByLabelText("How It Works")).toBeInTheDocument();
//     expect(screen.getByLabelText("Testimonials Section")).toBeInTheDocument();
//     expect(screen.getByLabelText("Call To Action")).toBeInTheDocument();
//     expect(screen.getByText("LandingSubscription")).toBeInTheDocument();
//   });

//   it("ensures the order of sections is maintained", () => {
//     renderPage();

//     const elements = [
//       screen.getByText("LandingHeader"),
//       screen.getByLabelText("Features Hero"),
//       screen.getByLabelText("Features Section"),
//       screen.getByLabelText("How It Works"),
//       screen.getByLabelText("Testimonials Section"),
//       screen.getByLabelText("Call To Action"),
//       screen.getByText("LandingSubscription"),
//     ];

//     // Verify the order of sections in the DOM
//     elements.reduce((prev, curr) => {
//       expect(prev.compareDocumentPosition(curr)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
//       return curr;
//     });
//   });
// });
