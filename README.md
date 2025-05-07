
# Project Name

## Description

Brief description of your project and what it does.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (for front-end and smart contract tests)
- [Go](https://golang.org/) (for server-side functionality)
- [Hardhat](https://hardhat.org/) (for Ethereum development and deploying smart contracts)

---

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Install Dependencies

Install both Node.js and Go dependencies:

```bash
npm install --legacy-peer-deps       # Installs Node.js dependencies
```

### 2. Configure Environment

Ensure that you have a `.env` file in the root directory. This file is required for configuration and should contain the necessary environment variables for both the Go server and the front-end development.

### 3. Start Development Server

To run both the Go server and front-end development server concurrently, use the following command:

```bash
npm run dev
```

This will start the Go server and the front-end (e.g., React or similar framework) development server.

---

## Running Automated Tests

To run automated tests for both the smart contract and the front-end, execute:

```bash
npm test
```

> **Note:** Some tests may intermittently fail due to concurrency and timing issues, particularly those involving asynchronous operations. This is a known limitation and does not necessarily indicate a problem with the underlying code.

### Running Independent Jest Test Files

You can also run individual test files with `npx jest` by specifying the test file name:

```bash
npx jest test-file-name
```

Make sure to replace `test-file-name` with the actual name of the test file you want to run.

### Running Independent Hardhat Test Files

```bash
npx hardhat test
```
---

## Deploying a Smart Contract via Admin Portal

To deploy a smart contract through the admin portal, use the following command:

```bash
MODULE_NAME="PropertyName" PROPERTY_TOKEN_SUPPLY=1000 PROPERTY_TOKEN_PRICE=10 PROPERTY_OWNER="0x12345" PROPERTY_IS_RENTAL=true PROPERTY_MONTHLY_INCOME=500 PROPERTY_NAME="Property Name" PROPERTY_ABR="PNM" npx hardhat ignition deploy ./ignition/modules/TokenOwnership.js --network holesky
```

Make sure to replace the values with the specific property details:

- `MODULE_NAME`: The name of the property module.
- `PROPERTY_TOKEN_SUPPLY`: The total supply of property tokens.
- `PROPERTY_TOKEN_PRICE`: The price of each property token.
- `PROPERTY_OWNER`: The address of the property owner.
- `PROPERTY_IS_RENTAL`: Whether the property is rental (true/false).
- `PROPERTY_MONTHLY_INCOME`: Monthly rental income for the property.
- `PROPERTY_NAME`: The full name of the property.
- `PROPERTY_ABR`: An abbreviation for the property name.

This command will deploy the smart contract to the specified network (`holesky` in this case).

---

## .env File Example

Here’s an example of how your `.env` file might look:

```
GO_SERVER_PORT=8080
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=development
```

> Adjust the values based on your environment and project requirements.

---

## Additional Information

If you need help with setting up the development environment or troubleshooting, feel free to reach out to the team or refer to our documentation.
