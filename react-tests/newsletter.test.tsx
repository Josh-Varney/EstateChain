import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SubscriptionForm from "../src/components/landing/components/footer/components/footer-form";
import { validateEmail } from "../src/firebase/footer/newsletter";

jest.mock("../src/firebase/footer/newsletter", () => ({
    validateEmail: jest.fn(),
}));


describe("SubscriptionForm", () => {
    
});