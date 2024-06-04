import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity('message_types')
export class MessageType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    name: string;
    @OneToMany(() => Message, (message) => message.type)
    messages: Message[];
}