import { Controller, Get, Post, Body } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';

@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  @Get('events')
  async listEvents() {
    return this.googleCalendarService.listEvents();
  }

  @Post('events')
  async createEvent(@Body() event: any) {
    return this.googleCalendarService.createEvent('primary', event);
  }
}
