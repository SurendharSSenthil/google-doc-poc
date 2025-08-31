import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GoogleAuthService {
  private oAuth2Client;

  constructor() {
    const credentialsPath = path.join(process.cwd(), 'credentials.json');
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

    const { client_secret, client_id, redirect_uris } =
      credentials.installed || credentials.web;

    this.oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );

    // Load token.json if available
    const tokenPath = path.join(process.cwd(), 'token.json');
    if (fs.existsSync(tokenPath)) {
      const token = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
      this.oAuth2Client.setCredentials(token);
      console.log('✅ Google OAuth2 client initialized with existing token.');
      console.log('Token details:', token);
    } else {
      console.error('⚠️ No token.json found. Please authenticate first.');
    }
  }

  getClient() {
    return this.oAuth2Client;
  }
}
