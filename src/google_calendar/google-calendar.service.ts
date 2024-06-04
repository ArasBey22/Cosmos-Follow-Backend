import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { response } from 'express';

@Injectable()
export class GoogleCalendarService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.REDIRECT_URI,
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  async listEvents(calendarId: string = 'primary') {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    const res = await calendar.events.list({
      calendarId,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return res.data.items;
  }

  async createEvent(calendarId: string = 'primary', event: any) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    const res = await calendar.events.insert({
      calendarId,
      resource: event,
    });
    return res.data ;
  }
}
