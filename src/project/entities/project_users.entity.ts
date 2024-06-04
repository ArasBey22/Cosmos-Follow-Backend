import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Project } from "./project.entity";



@Entity('project_users')
export class ProjectUsers {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    project_id: number;
    @Column()
    user_id: number;
    @CreateDateColumn()
    created_at: Date;
    @ManyToOne(() => Project, (project) => project.project_users)
    @JoinColumn({
        name: "project_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_pu_project_id"
    })
    project: Project;
    @ManyToOne(() => User, (user) => user.project_users)
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_pu_user_id"
    })
    user: User;
}