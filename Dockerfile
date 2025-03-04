# 1️⃣ Base image with Go
FROM golang:1.20 AS go-builder
WORKDIR /EstateChain
COPY . .
RUN go mod tidy  

# 2️⃣ Base image with Node.js
FROM node:18
WORKDIR /EstateChain

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy everything into the container
COPY . .

# Ensure TypeScript is installed globally
RUN npm install -g typescript ts-node concurrently

# Install missing dependencies
RUN npm install cors

# Expose necessary ports
EXPOSE 3000  
EXPOSE 4001  
EXPOSE 1433 

# 3️⃣ Start the full-stack app
CMD ["npm", "run", "dev"]
