// import React from "react";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import AboutUsPage from "../src/components/landing/contact-page/about";

// // Mock child components
// jest.mock("../src/components/landing/components/header/header", () => () => <header>LandingHeader</header>);
// jest.mock("../src/components/landing/components/footer/footer", () => () => <footer>LandingSubscription</footer>);
// jest.mock("../src/components/landing/contact-page/components/about-hero", () => () => <section>AboutHero</section>);
// jest.mock("../src/components/landing/contact-page/components/about-timeline", () => () => <section>AboutTimeline</section>);
// jest.mock("../src/components/landing/contact-page/components/about-testimonials", () => () => <section>AboutTestimonials</section>);
// jest.mock("../src/components/landing/contact-page/components/about-statistics", () => () => <section>AboutStatistics</section>);
// jest.mock("../src/components/landing/contact-page/components/about-awards", () => () => <section>AboutAwards</section>);
// jest.mock("../src/components/landing/contact-page/components/about-cta", () => () => <section>AboutCTA</section>);

// describe("AboutUsPage Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders the page container with the correct structure and classes", () => {
//     render(<AboutUsPage />);
//     const container = screen.getByRole("main");
//     expect(container).toBeInTheDocument();
//     expect(container).toHaveClass("flex-1 px-6 sm:px-8 py-8");
//   });

//   it("renders the LandingHeader component", () => {
//     render(<AboutUsPage />);
//     expect(screen.getByText("LandingHeader")).toBeInTheDocument();
//   });

//   it("renders the AboutHero component", () => {
//     render(<AboutUsPage />);
//     expect(screen.getByText("AboutHero")).toBeInTheDocument();
//   });

//   it("renders the AboutTimeline component", () => {
//     render(<AboutUsPage />);
//     expect(screen.getByText("AboutTimeline")).toBeInTheDocument();
//   });

//   it("renders the AboutTestimonials component", () => {
//     render(<AboutUsPage />);
//     expect(screen.getByText("AboutTestimonials")).toBeInTheDocument();
//   });

//   it("renders the AboutStatistics component", () => {
//     render(<AboutUsPage />);
//     expect(screen.getByText("AboutStatistics")).toBeInTheDocument();
//   });

//   it("renders the AboutAwards component", () => {
//     render(<AboutUsPage />);
//     expect(screen.getByText("AboutAwards")).toBeInTheDocument();
//   });

//   it("renders the AboutCTA component", () => {
//     render(<AboutUsPage />);
//     expect(screen.getByText("AboutCTA")).toBeInTheDocument();
//   });

//   it("renders the LandingSubscription component", () => {
//     render(<AboutUsPage />);
//     expect(screen.getByText("LandingSubscription")).toBeInTheDocument();
//   });

//   it("renders the horizontal divider", () => {
//     render(<AboutUsPage />);
//     const divider = screen.getByRole("separator");
//     expect(divider).toBeInTheDocument();
//   });
// });
