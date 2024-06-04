import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Message } from './entities/message.entity';
import { MessageType } from './entities/message_type.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Branch } from '../branch/entities/branch.entity';
import { BranchService } from 'src/branch/branch.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, MessageType, User, Branch]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, UsersService],
})
export class ChatModule {}
