import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Project } from './entities/project.entity';
import { ProjectTasks } from './entities/project_tasks.entity';
import { ProjectUsers } from './entities/project_users.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Task } from 'src/task/entities/task.entity';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [TypeOrmModule.forFeature([ProjectTasks,ProjectUsers,Project,Task]),UsersModule]
})
export class ProjectModule {}
