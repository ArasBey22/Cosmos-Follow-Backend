import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Api } from 'src/api/entities/api.entity';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { Permission } from 'src/permission/entities/permission.entity';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { UsersService } from './users.service';


@Module({
  controllers: [UserController ],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature
  ([
    User,
    Permission,
    PermissionGuard,
    Api,
  ])],
  exports: [UsersService],
})
export class UsersModule {}
