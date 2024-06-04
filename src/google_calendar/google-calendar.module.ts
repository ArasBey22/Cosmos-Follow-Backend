import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleCalendarService } from './google-calendar.service';
import { GoogleCalendarController } from './google-calendar.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [GoogleCalendarService],
  controllers: [GoogleCalendarController],
})
export class GoogleCalendarModule {}
