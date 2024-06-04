import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Branch } from "../../branch/entities/branch.entity";
import { MessageType } from "./message_type.entity";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: number; 
    @Column({nullable: true})
    reciever_id: number;
    @Column()
    sender_id: number;
    @Column({nullable: true})
    branch_id: number;                         
    @Column()
    message: string;
    @Column()
    type_id: number;    
    @CreateDateColumn()
    createdAt: Date;
    @ManyToOne(() => User, (user) => user.reciever)
    @JoinColumn([
        {
            name: 'reciever_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_m_reciever_id',
        },
    ])
    reciever: User;
    @ManyToOne(() => User, (user) => user.sender)
    @JoinColumn([
        {
            name: 'sender_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_m_sender_id',
        },
    ])
    sender: User;
    @ManyToOne(()   => Branch, (branch) => branch.messages)
    @JoinColumn([
        {
            name: 'branch_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_m_branch_id',
        },
    ])
    branch: Branch;
    @ManyToOne(() => MessageType, (messageType) => messageType.messages)
    @JoinColumn([
        {
            name: 'type_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_mt_type_id',
        },
    ])
    type: MessageType;
}
