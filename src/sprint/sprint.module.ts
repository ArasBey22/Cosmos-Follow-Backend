import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { Sprint } from './entities/sprint.entity';
import { Task } from 'src/task/entities/task.entity';
import { Status } from './entities/status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Retro } from 'src/task/entities/retro.entity';

@Module({
  controllers: [SprintController],
  providers: [SprintService],
  imports: [TypeOrmModule.forFeature([Sprint,Status,Task,Retro])],
})
export class SprintModule {}
