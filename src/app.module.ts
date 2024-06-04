import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { BranchModule } from './branch/branch.module';
import { PermissionModule } from './permission/permission.module';
import { ApiModule } from './api/api.module';
import { SprintModule } from './sprint/sprint.module';
import { DepartmentModule } from './department/department.module';
import { RolesModule } from './role/roles.module';
import { ChatModule } from './chat/chat.module';
import { GoogleCalendarModule } from './google_calendar/google-calendar.module';

@Module({
  imports: [UsersModule, 
  TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cosmos_follow',
      autoLoadEntities: true,
    
}), AuthModule, TaskModule, ProjectModule, BranchModule, PermissionModule, ApiModule, SprintModule, DepartmentModule, RolesModule, ChatModule, GoogleCalendarModule],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  ],
})
export class AppModule {}
