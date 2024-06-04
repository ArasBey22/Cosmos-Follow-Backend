import { Controller, Get, Render, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { Public } from './auth/guards/pass-auth.guard';

@ApiTags('')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 
  @Public()
  @Render('index')
  @Get()
  get(@Res() res: Response) {
    return ;
  }

  @Public ()
  @Get('msg')
  getHello(): string {
    return this.appService.getmsg();
  }
  @Public ()
  @Get('date')
  getDate(): any {
    return this.appService.getDate();
  };
}
