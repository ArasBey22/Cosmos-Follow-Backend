import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Afford } from './entities/afford.entity';
import { Priority } from './entities/priority.entity';
import { Task } from './entities/task.entity';
import { TaskUsers } from './entities/task_users.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Retro } from './entities/retro.entity';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task,Afford,Priority,TaskUsers,Retro]), UsersModule],
})
export class TaskModule {}
