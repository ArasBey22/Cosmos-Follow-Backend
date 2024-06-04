import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../../role/entities/role.entity";
import { Department } from "../../department/entities/department.entity";
import { ProjectUsers } from "../../project/entities/project_users.entity";
import { TaskUsers } from "../../task/entities/task_users.entity";
import { BranchUsers } from "../../branch/entities/branch_users.entity";
import { Message } from "../../chat/entities/message.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    email: string;
    @Column()
    password: string;
    @Column()
    first_name: string;
    @Column({nullable: true,default: null})
    role_id: number;
    @Column({nullable: true,default: null})
    department_id: number;
    @Column()
    last_name: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @ManyToOne(() => Role, (role) => role.users) //bir user bir role a ait olabilir
    @JoinColumn([
        {
        name: 'role_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_u_role_id',
         },
        ])
    role: Role;
    @ManyToOne(() => Department, (department) => department.users) 
    @JoinColumn([
        {
        name: 'department_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_u_department_id',
     },])
    department: Department;
    @OneToMany(() => ProjectUsers , (project_users) => project_users.user)
    project_users: ProjectUsers[];
    @OneToMany(() => TaskUsers , (task_users) => task_users.user)
    task_users: TaskUsers[];
    @OneToMany(()=> BranchUsers, (branch_users) => branch_users.user)
    branch_users: BranchUsers[];
    @OneToMany(()=> Message, (message) => message.reciever)
    reciever: Message[];
    @OneToMany(()=> Message, (message) => message.sender)
    sender: Message[];
}