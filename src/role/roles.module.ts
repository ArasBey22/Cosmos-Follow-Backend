import { Module } from '@nestjs/common';
import { RolesService } from './role.service';
import { RolesController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([Role]),],
})
export class RolesModule {}
