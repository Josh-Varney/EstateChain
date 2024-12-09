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

app.get('/api/linkedin/authorize', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Generating LinkedIn authorization URL...');
    const authUrl = Authorization(); // If Authorization is async, add `await`
    console.log('Generated LinkedIn Authorization URL:', authUrl);
    res.redirect(authUrl);
  } catch (error) {
    console.error('Error generating LinkedIn authorization URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/linkedin/redirect', async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      console.error('No authorization code received');
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    const payload = await Redirect(code);

    console.log("LinkedIn Access Token Response:", payload);

    // Redirect to a frontend callback route with token data
    console.log("Time for Redirect");

    res.redirect(
      `http://localhost:3000/linkedin/callback?access_token=${payload.access_token}&expires_in=${payload.expires_in}`
    );
  } catch (error) {
    console.error('Error processing LinkedIn redirect:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
