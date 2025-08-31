import { Injectable, OnModuleInit } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GoogleService implements OnModuleInit {
  private oAuth2Client;

  async onModuleInit() {
    const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
    const data = credentials.installed || credentials.web;

    const { client_secret, client_id, redirect_uris } = data;
    this.oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );

    // Load token if already authenticated
    const tokenPath = path.join(process.cwd(), 'token.json');
    if (fs.existsSync(tokenPath)) {
      const token = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
      this.oAuth2Client.setCredentials(token);
    }
  }

  getAuthUrl() {
    const SCOPES = [
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/drive',
    ];
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
  }

  async saveToken(code: string) {
    console.log('reached');
    const { tokens } = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokens);
    fs.writeFileSync('token.json', JSON.stringify(tokens));
    return 'Token stored successfully!';
  }
}
