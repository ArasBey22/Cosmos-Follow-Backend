import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiService } from './api.service';
import { Response } from 'express';

@ApiTags('api')
@ApiBearerAuth()
@Controller('apii')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}
  @Get()
  async findAll(@Res() res: Response) {
    return await this.apiService.findAll(res);
  }
}
