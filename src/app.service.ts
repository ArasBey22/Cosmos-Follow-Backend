import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getmsg(): string {
    let msg = 'burası Emir Arasa tarafından yazılmıştır'
    return msg;
  }
  getDate(): any {
    const date = new Date();
    return date;
  }
}
