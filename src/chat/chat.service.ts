import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { MessageType } from './entities/message_type.entity';
import { Branch } from '../branch/entities/branch.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(MessageType)
    private readonly messageTypeRepository: Repository<MessageType>,
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveMessageForDirect(senderEmail: string, recipientEmail: string, messageText: string): Promise<Message> {
    const sender = await this.userRepository.findOne({ where: { email: senderEmail } });
    const recipient = await this.userRepository.findOne({ where: { email: recipientEmail } });
    const messageType = await this.messageTypeRepository.findOne({ where: { name: 'direct' } });

    if (!sender || !recipient || !messageType) {
      throw new Error('Sender, recipient or message type not found');
    }

    const message = this.messageRepository.create({
      sender_id: sender.id,
      reciever_id: recipient.id,
      message: messageText,
      type_id: messageType.id,
    });

    return this.messageRepository.save(message);
  }

  async saveMessageForBranch(senderEmail: string, branchName: string, messageText: string): Promise<Message> {
    const sender = await this.userRepository.findOne({ where: { email: senderEmail } });
    const branch = await this.branchRepository.findOne({ where: { name: branchName } });
    const messageType = await this.messageTypeRepository.findOne({ where: { name: 'branch' } });

    if (!sender || !branch || !messageType) {
      throw new Error('Sender, branch or message type not found');
    }

    const message = this.messageRepository.create({
      sender_id: sender.id,
      branch_id: branch.id,
      message: messageText,
      type_id: messageType.id,
    });

    return this.messageRepository.save(message);
  }

  async findBranchByName(name: string): Promise<Branch> {
    return this.branchRepository.findOne({ where: { name } });
  }
}
