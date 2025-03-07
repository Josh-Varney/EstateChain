// import React from "react";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import PricingPage from "../src/components/landing/pricing-page/pricing";

// // Mock child components with typed props
// jest.mock("../src/components/landing/components/header/header", () => () => <header>LandingHeader</header>);
// jest.mock("../src/components/landing/components/footer/footer", () => () => <footer>LandingSubscription</footer>);

// jest.mock("../src/components/landing/pricing-page/components/pricing-hero", () => {
//   return ({ hasStartedFreeTrial }: { hasStartedFreeTrial: boolean }) => (
//     <section aria-label="Pricing Hero">
//       PricingHero - Free Trial: {hasStartedFreeTrial ? "Started" : "Not Started"}
//     </section>
//   );
// });

// jest.mock("../src/components/landing/pricing-page/components/pricing-sticky", () => {
//   return ({ billingCycle }: { billingCycle: "monthly" | "yearly" }) => (
//     <div aria-label="Pricing Sticky Header">
//       PricingStickyHeader - Billing Cycle: {billingCycle}
//     </div>
//   );
// });

// jest.mock("../src/components/landing/pricing-page/components/pricing-plan", () => {
//   return ({ billingCycle }: { billingCycle: "monthly" | "yearly" }) => (
//     <section aria-label="Pricing Plans">
//       PricingPlans - Billing Cycle: {billingCycle}
//     </section>
//   );
// });

// jest.mock("../src/components/landing/pricing-page/components/pricing-testimonial", () => () => (
//   <section aria-label="Testimonials">PricingTestimonials</section>
// ));

// jest.mock("../src/components/landing/pricing-page/components/pricing-faq", () => () => (
//   <section aria-label="FAQ">PricingFAQ</section>
// ));

// describe("PricingPage Component", () => {
//   const renderPage = () => render(<PricingPage />);

//   it("renders the page container with the correct structure and classes", () => {
//     renderPage();
//     const container = screen.getByTestId("pricing-page-container");
//     expect(container).toBeInTheDocument();
//     expect(container).toHaveClass("min-h-screen", "bg-gradient-to-br", "from-gray-800", "to-gray-900", "text-white", "pb-8");
//   });

//   it("renders all main child components", () => {
//     renderPage();

//     // Assert the presence of all key sections
//     expect(screen.getByText("LandingHeader")).toBeInTheDocument();
//     expect(screen.getByLabelText("Pricing Hero")).toBeInTheDocument();
//     expect(screen.getByLabelText("Pricing Sticky Header")).toBeInTheDocument();
//     expect(screen.getByLabelText("Pricing Plans")).toBeInTheDocument();
//     expect(screen.getByLabelText("Testimonials")).toBeInTheDocument();
//     expect(screen.getByLabelText("FAQ")).toBeInTheDocument();
//     expect(screen.getByText("LandingSubscription")).toBeInTheDocument();
//   });

//   it("renders multiple horizontal dividers separating sections", () => {
//     renderPage();
//     const dividers = screen.getAllByRole("separator");
//     expect(dividers).toHaveLength(3); // Expect three horizontal dividers
//   });

//   it("ensures the order of sections is maintained", () => {
//     renderPage();

//     const elements = [
//       screen.getByText("LandingHeader"),
//       screen.getByLabelText("Pricing Hero"),
//       screen.getByLabelText("Pricing Sticky Header"),
//       screen.getByLabelText("Pricing Plans"),
//       screen.getByLabelText("Testimonials"),
//       screen.getByLabelText("FAQ"),
//       screen.getByText("LandingSubscription"),
//     ];

//     // Verify the order of sections in the DOM
//     elements.reduce((prev, curr) => {
//       expect(prev.compareDocumentPosition(curr)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
//       return curr;
//     });
//   });
// });
