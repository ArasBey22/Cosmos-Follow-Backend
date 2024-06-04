import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { BranchUsers } from './entities/branch_users.entity';
import { UsersModule } from 'src/users/users.module';
import { BranchSub } from './entities/branch_sub.entity';

@Module({
  controllers: [BranchController],
  providers: [BranchService],
  imports: [TypeOrmModule.forFeature([Branch, BranchUsers,BranchSub]),UsersModule
  ],
})
export class BranchModule {}
