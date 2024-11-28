import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

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

// Health check endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// reCAPTCHA verification endpoint
app.post('/verify-recaptcha', async (req, res) => {
  const { token } = req.body; // Extract token from request body
  const secretKey = process.env.REACT_APP_RECAPTCHA_SECRET_KEY; // Get secret key from env variables

  if (!token) {
    console.error('No token received');
    return res.status(400).json({ success: false, error: 'No token provided' });
  }

  if (!secretKey) {
    console.error('No secret key configured');
    return res.status(500).json({ success: false, error: 'Server misconfiguration: No secret key' });
  }

  try {
    // Call Google's reCAPTCHA API
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    // Check if verification is successful
    if (response.data.success) {
      return res.json({ success: true, googleResponse: response.data });
    } else {
      return res.status(400).json({
        success: false,
        errorCodes: response.data['error-codes'],
        googleResponse: response.data,
      });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error', details: error });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
