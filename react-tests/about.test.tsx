import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutCTA from "../src/components/landing/contact-page/components/about-cta";
import PricingStickyHeader from "../src/components/landing/pricing-page/components/pricing-sticky";
import PricingPlans from "../src/components/landing/pricing-page/components/pricing-plan";

describe("Render Test on CTA", () => {

    // Test for rendering AboutCTA component in under 2 seconds
    test("renders AboutCTA component in less than 2 seconds", async () => {
        const renderStartTime = Date.now();

        // Render the AboutCTA component
        render(<AboutCTA />);
      
        // Check if the heading is rendered correctly
        expect(screen.getByRole("heading", { name: /let’s build the future together/i })).toBeInTheDocument();
      
        // Check if the link containing the "Get in Touch" text is present
        const link = screen.getByText("Get in Touch");
        
        // Assert that the link is in the document
        expect(link).toBeInTheDocument();

        // Check if the test completes within 2 seconds
        const renderEndTime = Date.now();
        const renderDuration = renderEndTime - renderStartTime;
        expect(renderDuration).toBeLessThanOrEqual(2000);  // Ensures test runs under 2 seconds
    }, 2000);  // Test timeout of 2 seconds

    // Test for opening email client with the correct mailto link on button click
    test("opens email client with correct mailto link on button click", () => {
        // Render the AboutCTA component
        render(<AboutCTA />);
      
        // Get the link element
        const link = screen.getByText("Get in Touch");
      
        // Assert that the link is in the document
        expect(link).toBeInTheDocument();
      
        // Check if the link's href is correct
        expect(link).toHaveAttribute("href", "mailto:test@example.com?subject=Inquiry from Webtrix");
      
        // Simulate the click event
        fireEvent.click(link);
    }, 200);
});

describe("Tests on Pricing", () => {

    test("renders pricing plans correctly in less than 2 seconds", async () => {
        // Render the component with monthly billing cycle
        render(<PricingPlans billingCycle="monthly" />);
    }, 2000);

    test("renders pricing information correctly", () => {
        // Mock the toggle function
        const toggleBillingCycle = jest.fn();
    
        // Initial billing cycle is set to 'monthly'
        render(<PricingStickyHeader billingCycle="monthly" toggleBillingCycle={toggleBillingCycle} />);
    
        // Check if the text "Monthly" and "Yearly" are present
        expect(screen.getByText(/Monthly/i)).toBeInTheDocument();
        expect(screen.getByText(/Yearly/i)).toBeInTheDocument();
    
        // Check that the "Save 20% with yearly plans!" message is not displayed initially
        expect(screen.queryByText(/Save 20% with yearly plans!/i)).not.toBeInTheDocument();
      }, 2000);

      test("renders yearly pricing correctly with a 20% discount", () => {
        // Render the component with yearly billing cycle
        render(<PricingPlans billingCycle="yearly" />);
    
        // Check if the Pro plan displays a 20% discount
        const proPrice = screen.getByText("$288"); // 30 * 12 * 0.8 = 288
        expect(proPrice).toBeInTheDocument();
      }, 2000);

      test("renders plan features correctly in less than 2 seconds", () => {
        // Render the component with monthly billing cycle
        render(<PricingPlans billingCycle="monthly" />);
    
        // Check that each plan feature is listed for the Basic plan
        expect(screen.getByText("1 Project")).toBeInTheDocument();
        expect(screen.getByText("Basic Support")).toBeInTheDocument();
    
        // Check that each plan feature is listed for the Pro plan
        expect(screen.getByText("10 Projects")).toBeInTheDocument();
        expect(screen.getByText("Priority Support")).toBeInTheDocument();
    
        // Check that each plan feature is listed for the Enterprise plan
        expect(screen.getByText("Unlimited Projects")).toBeInTheDocument();
        expect(screen.getByText("Custom Integrations")).toBeInTheDocument();
      }, 2000);
    
    
      test("displays discount message when billing cycle is switched to 'yearly' in less than 2 seconds", async () => {
        // Mock the toggle function
        const toggleBillingCycle = jest.fn();
    
        // Render with 'yearly' billing cycle
        render(<PricingStickyHeader billingCycle="yearly" toggleBillingCycle={toggleBillingCycle} />);
    
        // Check that the "Save 20% with yearly plans!" message is visible
        expect(screen.getByText(/Save 20% with yearly plans!/i)).toBeInTheDocument();
      }, 2000);
    
      test("button click toggles the billing cycle", () => {
        // Mock the toggle function
        const toggleBillingCycle = jest.fn();
    
        // Initial render with 'monthly'
        render(<PricingStickyHeader billingCycle="monthly" toggleBillingCycle={toggleBillingCycle} />);
    
        // Find the toggle button and simulate a click
        const button = screen.getByRole("button");
        fireEvent.click(button);
    
        // Check that the toggle function was called (i.e., the billing cycle was toggled)
        expect(toggleBillingCycle).toHaveBeenCalled();
      }, 2000);
});

describe("Invalid Tests on Pricing", () => {
  
  test("throws error when invalid billingCycle is passed", () => {
    const toggleBillingCycle = jest.fn();
  
    expect(() =>
      render(<PricingStickyHeader billingCycle="weekly" toggleBillingCycle={toggleBillingCycle} />)
    ).toThrow();
  });
  
  test("throws if required internal structure is broken", () => {
    const BrokenAboutCTA = () => {
      // AboutCTA but removing or breaking child nodes
      return <div />;
    };
  
    expect(() => render(<BrokenAboutCTA />)).toThrow();
  });
  
  test("fails gracefully if toggleBillingCycle is not a function", () => {
    // @ts-ignore
    render(<PricingStickyHeader billingCycle="monthly" toggleBillingCycle="notAFunction" />);
  
    const button = screen.getByRole("button");
    expect(() => fireEvent.click(button)).toThrow();
  });
  
  test("throws TypeError when prop is missing", () => {
    expect(() => 
      render(<PricingPlan />)  // Missing 'price' prop
    ).toThrowError(TypeError);
  });
  
});
