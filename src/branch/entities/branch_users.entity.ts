import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Branch } from "./branch.entity";
import { User } from "../../users/entities/user.entity";


@Entity('branch_users')
export class BranchUsers {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    branch_id: number;
    @CreateDateColumn()
    created_at: Date;  
    @ManyToOne(() => Branch, (branch) => branch.branch_users)
    @JoinColumn({ 
        name: "branch_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_bu_branch_id"
    })
    branch: Branch;
    @ManyToOne(() => User, (user) => user.branch_users)
    @JoinColumn({ 
        name: "user_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_bu_user_id"
    })
    user: User;

}