import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectTasks } from "./project_tasks.entity";
import { ProjectUsers } from "./project_users.entity";


@Entity('project')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    is_finished: boolean;
    @CreateDateColumn()
    created_at: Date;
    @Column()
    should_end: Date;
    @OneToMany(() => ProjectUsers, (project_users) => project_users.project)
    project_users: ProjectUsers[];
    @OneToMany(() => ProjectTasks, (project_tasks) => project_tasks.project)
    project_tasks: ProjectTasks[];
}