import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Api } from './entities/api.entity';


@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [TypeOrmModule.forFeature([Api])],
})
export class ApiModule {}
