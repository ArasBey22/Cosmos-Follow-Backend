import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { Task } from "../../task/entities/task.entity";
@Entity('project_tasks')
export class ProjectTasks {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    project_id: number;
    @Column()
    task_id: number;
    @ManyToOne(() => Project, (project) => project.project_tasks)
    @JoinColumn({
        name: "project_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_pt_project_id"
    })
    project: Project;
    @ManyToOne(() => Task, (task) => task.project_tasks)
    @JoinColumn({
        name: "task_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_pt_task_id"
    })
    task: Task;
}