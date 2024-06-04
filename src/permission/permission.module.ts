import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { Api } from 'src/api/entities/api.entity';
import { Role } from 'src/role/entities/role.entity';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from 'src/auth/guards/permission.guard';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    }
  ],
  imports: [TypeOrmModule.forFeature([Permission,Api,Role],
  )],
})
export class PermissionModule {}
