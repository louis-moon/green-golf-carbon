import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env.local

import { google } from 'googleapis';
import readline from 'readline';

// Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function generateRefreshToken() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID, // Client ID from .env.local
    process.env.GMAIL_CLIENT_SECRET, // Client Secret from .env.local
    'http://localhost:3000' // Redirect URI
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
  });

  console.log('Authorize this app by visiting this url:', authUrl);
  console.log('After authorization, paste the code here:');

  // Wait for the user to enter the authorization code
  rl.question('Enter code from Google: ', async (code) => {
    // Get the tokens using the provided authorization code
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens:', tokens);

    // Save the refresh token for future use
    console.log('Refresh Token:', tokens.refresh_token);

    // Close the readline interface
    rl.close();
  });
}

generateRefreshToken();
