import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutCTA from "../src/components/landing/contact-page/components/about-cta";

describe("Render Test on CTA", () => {

    test("renders AboutCTA component in less than 2 seconds", async () => {
        // Render the AboutCTA component
        render(<AboutCTA />);
      
        // Check if the heading is rendered correctly
        expect(screen.getByRole("heading", { name: /let’s build the future together/i })).toBeInTheDocument();
      
        // Check if the button is rendered and has the correct text
        const button = screen.getByRole("button", { name: /get in touch/i });
        expect(button).toBeInTheDocument();
      
        // Optionally, you can check for the button's aria-label
        expect(button).toHaveAttribute("aria-label", "Get in touch with Webtrix");
    }, 2000);

});

