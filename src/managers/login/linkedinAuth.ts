import axios from "axios";
import qs from 'qs';

export const Authorization = (): string => {
    // Validate environment variables
    const clientId = process.env.LINKEDIN_CLIENT_KEY;
    const scope = process.env.LINKEDIN_SCOPE;
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
  
    if (!clientId || !scope || !redirectUri) {
      const missingVars = [
        !clientId && 'LINKEDIN_CLIENT_KEY',
        !scope && 'LINKEDIN_SCOPE',
        !redirectUri && 'LINKEDIN_REDIRECT_URI',
      ]
        .filter(Boolean)
        .join(', ');
  
      throw new Error(`Missing required environment variables: ${missingVars}`);
    }
  
    // Construct authorization URL
    return encodeURI(
      `https://linkedin.com/oauth/v2/authorization?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`
    );
};
  
  
export const Redirect = async (code: string): Promise<any> => {
  if (!code) {
    console.error('Code is required for redirection.');
    throw new Error('Code is required for redirection.');
  }

  const payload = {
    client_id: process.env.LINKEDIN_CLIENT_KEY,
    client_secret: process.env.LINKEDIN_SECRET_KEY,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    grant_type: "authorization_code",
    code: code
  };

  console.log('Payload for LinkedIn Token Request:', payload);

  try {
    const { data } = await axios({
      url: `https://www.linkedin.com/oauth/v2/accessToken`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify(payload)
    });

    console.log('LinkedIn Access Token Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching access token from LinkedIn:', error);
    throw new Error('Failed to fetch access token from LinkedIn.');
  }
};
  