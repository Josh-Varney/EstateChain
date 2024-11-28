import axios from 'axios';

/**
 * Verifies reCAPTCHA token with the backend.
 * @param token - The reCAPTCHA token obtained from the frontend widget
 */
export const verifyCaptcha = async (token: string) => {
  try {
    // Send POST request to the backend
    const response = await axios.post('http://localhost:3001/verify-recaptcha', { token });

    // Check response from the backend
    if (response.data.success) {
      console.log('reCAPTCHA verified successfully!');
      console.log('Google Response:', response);

      // Extract score from the Google response
      const { score } = response.data.googleResponse;

      console.log('Score:', score);
      return { score };
    } else {
      console.error('Verification failed:', response.data.errorCodes || 'Unknown error');
      return { score: null }; // Return null values if verification fails
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return { score: null }; // Return null values on error
  }
};

// Define the shape of executeRecaptcha
type ExecuteRecaptcha = (action: string) => Promise<string>;

export const getCaptchaScore = async (executeRecaptcha: ExecuteRecaptcha | undefined) => {
  if (!executeRecaptcha) {
      console.log('Recaptcha execution not available');
      return;
  }
  try {
      // Get the reCAPTCHA token from Google
      const gRecaptchaToken = await executeRecaptcha('inquirySubmit');
      console.log('reCAPTCHA token:', gRecaptchaToken);

      if (!gRecaptchaToken) {
          console.log('Recaptcha token missing');
          return;
      } else {
          const { score } = await verifyCaptcha(gRecaptchaToken);
          return score;
      }
  } catch (error) {
      console.error('Error during reCAPTCHA verification:', error);
  }
};
