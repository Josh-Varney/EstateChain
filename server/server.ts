import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { Authorization, Redirect } from '../src/managers/login/linkedinAuth';

dotenv.config();

const app = express();

// Enable CORS with specific origin
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Update with your front-end URL
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Serve static files (optional for deployment)
app.use(express.static(path.join(process.cwd(), 'build')));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
