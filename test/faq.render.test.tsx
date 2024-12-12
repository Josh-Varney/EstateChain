import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import FAQPage from "../src/components/landing/faq-page/faq";
import * as faqGrab from "../src/firebase/faq/faq-grab"; // Mock Firebase functions

// Mock child components
jest.mock("../src/components/landing/components/header/header", () => () => <header>LandingHeader</header>);
jest.mock("../src/components/landing/components/footer/footer", () => () => <footer>LandingSubscription</footer>);
jest.mock("../src/components/landing/faq-page/components/faq-title", () => () => <h1>FAQTitle</h1>);
jest.mock("../src/components/landing/faq-page/components/faq-search", () => ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) => (
  <input
    aria-label="Search FAQs"
    placeholder="Search FAQs"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
));
jest.mock("../src/components/landing/faq-page/components/faq-list", () => ({
  faqs,
  openItem,
  setOpenItem,
}: {
  faqs: { question: string; answer: string }[];
  openItem: number | null;
  setOpenItem: (i: number | null) => void;
}) => (
  <ul aria-label="FAQ List">
    {faqs.map((faq, index) => (
      <li key={index}>
        <h2>{faq.question}</h2>
        {openItem === index && <p>{faq.answer}</p>}
      </li>
    ))}
  </ul>
));
jest.mock("../src/components/landing/faq-page/components/faq-form", () => ({
  error,
  successMessage,
  newQuestion,
  setNewQuestion,
  newEmail,
  setNewEmail,
  handleFormSubmit,
}: any) => (
  <form onSubmit={handleFormSubmit}>
    {error && <p className="error">{error}</p>}
    {successMessage && <p className="success">{successMessage}</p>}
    <input
      aria-label="Your Question"
      value={newQuestion}
      onChange={(e) => setNewQuestion(e.target.value)}
    />
    <input
      aria-label="Your Email"
      value={newEmail}
      onChange={(e) => setNewEmail(e.target.value)}
    />
    <button type="submit">Submit</button>
  </form>
));

// Mock getApprovedQuestions
jest.spyOn(faqGrab, "getApprovedQuestions").mockResolvedValue([
  { question: "What is FAQ?", answer: "Frequently Asked Questions" },
  { question: "How does it work?", answer: "It just works!" },
]);

describe("FAQPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the page container with the correct structure and classes", () => {
    render(<FAQPage />);
    const container = screen.getByRole("main");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("flex-1 px-6 py-12");
  });

  it("renders the LandingHeader component", () => {
    render(<FAQPage />);
    expect(screen.getByText("LandingHeader")).toBeInTheDocument();
  });

  it("renders the FAQTitle component", () => {
    render(<FAQPage />);
    expect(screen.getByText("FAQTitle")).toBeInTheDocument();
  });

  it("renders the FAQSearchTerm component", () => {
    render(<FAQPage />);
    const searchInput = screen.getByLabelText("Search FAQs");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", "Search FAQs");
  });

  // To Fix
  // it("renders the FAQList component with FAQs", async () => {
  //   await act(async () => {
  //     render(<FAQPage />);
  //   });
  //   const faqList = await screen.findByLabelText("FAQ List");
  //   expect(faqList).toBeInTheDocument();
  //   expect(faqList).toHaveTextContent("What is FAQ?");
  //   expect(faqList).toHaveTextContent("How does it work?");
  // });

  it("renders the FAQForm component", () => {
    render(<FAQPage />);
    expect(screen.getByLabelText("Your Question")).toBeInTheDocument();
    expect(screen.getByLabelText("Your Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("renders the LandingSubscription component", () => {
    render(<FAQPage />);
    expect(screen.getByText("LandingSubscription")).toBeInTheDocument();
  });

  it("renders the horizontal dividers", () => {
    render(<FAQPage />);
    const dividers = screen.getAllByRole("separator");
    expect(dividers).toHaveLength(2);
  });

  it("renders error state correctly", async () => {
    jest.spyOn(faqGrab, "getApprovedQuestions").mockRejectedValue(new Error("Failed to fetch FAQs"));
    await act(async () => {
      render(<FAQPage />);
    });

    const faqErrorMessages = await waitFor(() =>
      screen.getAllByText("Failed to load FAQs. Please try again later.")
    );
    expect(faqErrorMessages).toHaveLength(2);
    expect(faqErrorMessages[0]).toBeInTheDocument();
  });
});
