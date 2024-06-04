import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BranchUsers } from "./branch_users.entity";
import { BranchSub } from "./branch_sub.entity";
import { Message } from "../../chat/entities/message.entity";

@Entity('branch')
export class Branch {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({nullable: true, default: null})
    description: string; 
    @CreateDateColumn()
    created_at: Date;
    @OneToMany(() => BranchUsers, (branch_users) => branch_users.branch)
    branch_users: BranchUsers[];
    @OneToMany(() => BranchSub, (branch_sub) => branch_sub.head_branch)
    branch_subs: BranchSub[];
    @OneToMany(() => Message, message => message.branch)
    messages: Message[];
}