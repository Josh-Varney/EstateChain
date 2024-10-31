import { MetaMaskInpageProvider } from "@metamask/providers";
import { MetaMaskConnect } from "../src/wallet-connect/web3";

type MockedMetaMaskProvider = MetaMaskInpageProvider & {
    request: jest.Mock;
};

// Unit test for the connectMetaMask function
describe("ConnectMetaMask", () => {
    beforeEach(() => {
        // Clear any previous mock data before each test
        (window.ethereum as MockedMetaMaskProvider | undefined) = undefined;
        jest.clearAllMocks();
    });

    it("should log the account when MetaMask is connected", async () => {
        // Mock MetaMask installed and account response
        const mockAccounts = ["0x1234567890abcdef"];
        window.ethereum = {
            request: jest.fn().mockResolvedValue(mockAccounts),
        } as MockedMetaMaskProvider;

        // Spy on console.log to verify output
        const consoleLogSpy = jest.spyOn(console, "log");

        await MetaMaskConnect();

        expect(window.ethereum?.request).toHaveBeenCalledWith({ method: "eth_requestAccounts" });
        expect(consoleLogSpy).toHaveBeenCalledWith("MetaMask Accounts:", mockAccounts);
    });

    it("should log an error message when MetaMask connection fails", async () => {
        // Mock MetaMask installed but throws error on request
        const mockError = new Error("User rejected the request");
        window.ethereum = {
            request: jest.fn().mockRejectedValue(mockError),
        } as MockedMetaMaskProvider;

        // Spy on console.log to verify output
        const consoleLogSpy = jest.spyOn(console, "log");

        await MetaMaskConnect();

        expect(window.ethereum?.request).toHaveBeenCalledWith({ method: "eth_requestAccounts" });
        expect(consoleLogSpy).toHaveBeenCalledWith("MetaMask Connection Error:", mockError);
    });

    it("should log 'Please install MetaMask' if MetaMask is not installed", async () => {
        // MetaMask not installed
        window.ethereum = undefined;

        // Spy on console.log to verify output
        const consoleLogSpy = jest.spyOn(console, "log");

        await MetaMaskConnect();

        expect(consoleLogSpy).toHaveBeenCalledWith("Please install MetaMask.");
    });
});
