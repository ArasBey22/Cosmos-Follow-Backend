import { Inject, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from '../users/users.service';
import { ChatService } from './chat.service';

interface User {
  email: string;
  rooms: Set<string>;
  socketId: string;
}

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');
  private users: Map<string, User> = new Map();

  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
    @Inject(ChatService)
    private readonly chatService: ChatService,
  ) {}

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.users.forEach((user, key) => {
      if (user.socketId === client.id) {
        this.users.delete(key);
      }
    });
  }

  @SubscribeMessage('chatToServer')
  async handleMessage(client: Socket, message: { sender: string, room: string, message: string }) {
    this.wss.to(message.room).emit('chatToClient', message);
    await this.chatService.saveMessageForBranch(message.sender, message.room, message.message);
  }

  @SubscribeMessage('directMessage')
  async handleDirectMessage(client: Socket, message: { sender: string, recipient: string, message: string }) {
    const senderExists = await this.userService.getUserByEmail(message.sender);
    const recipientExists = await this.userService.getUserByEmail(message.recipient);

    if (!senderExists) {
      client.emit('error', { message: 'Sender not found' });
      return;
    }

    if (!recipientExists) {
      client.emit('error', { message: 'Recipient not found' });
      return;
    }

    // Alıcıya mesajı gönder
    const recipientUser = Array.from(this.users.values()).find(user => user.email === message.recipient);
    if (recipientUser) {
      this.wss.to(recipientUser.socketId).emit('directMessageToClient', message);
      await this.chatService.saveMessageForDirect(message.sender, message.recipient, message.message);
    } else {
      client.emit('error', { message: 'Recipient not connected' });
    }
  }

  @SubscribeMessage('joinRoom')
  async handleRoomJoin(client: Socket, data: { email: string, room: string }) {
    const { email, room } = data;

    const userExists = await this.userService.getUserByEmail(email);
    if (!userExists) {
      client.emit('error', { message: 'User not found' });
      return;
    }

    const branchExists = await this.chatService.findBranchByName(room);
    if (!branchExists) {
      client.emit('error', { message: 'Room not found' });
      return;
    }

    if (!this.users.has(client.id)) {
      this.users.set(client.id, { email, rooms: new Set(), socketId: client.id });
    }

    const user = this.users.get(client.id);

    if (user.rooms.has(room)) {
      client.emit('alreadyJoinedRoom', { email, room });
    } else {
      user.rooms.add(room);
      client.join(room);
      client.emit('joinedRoom', { email, room });
      this.wss.to(room).emit('chatToClient', { sender: 'Server', room, message: `${email} joined the room` });
    }
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, data: { email: string, room: string }) {
    const { email, room } = data;

    if (this.users.has(client.id)) {
      const user = this.users.get(client.id);
      if (user.rooms.has(room)) {
        user.rooms.delete(room);
        client.leave(room);
        client.emit('leftRoom', { email, room });
        this.wss.to(room).emit('chatToClient', { sender: 'Server', room, message: `${email} left the room` });
      }
    }
  }
}
