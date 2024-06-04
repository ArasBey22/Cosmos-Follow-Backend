import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskUsers } from "./task_users.entity";
import { ProjectTasks } from "../../project/entities/project_tasks.entity";
import { Afford } from "./afford.entity";
import { Priority } from "./priority.entity";
import { Sprint } from "../../sprint/entities/sprint.entity";
import { Status } from "../../sprint/entities/status.entity";
import { Department } from "../../department/entities/department.entity";
import { Retro } from "../entities/retro.entity";

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    priority_id: number;
    @Column()
    status_id: number;
    @Column()
    sprint_id: number;
    @Column()
    afford_id: number;
    @Column()
    department_id: number;
    @Column()
    is_finished: boolean;
    @CreateDateColumn()
    created_at: Date;
    @Column()
    finish_at: Date;
    @ManyToOne(() => Department, (department) => department.tasks)
    @JoinColumn({ 
        name: "department_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_t_department_id"
    })
    department: Department;
    @OneToMany(() => TaskUsers, (task_users) => task_users.task)
    task_users: TaskUsers[];
    @OneToMany(() => ProjectTasks, (project_tasks) => project_tasks.task)
    project_tasks: ProjectTasks[];
    @ManyToOne(() => Afford, (afford) => afford.tasks)
    @JoinColumn({ 
        name: "afford_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_t_afford"
    })
    afford: Afford;
    @ManyToOne(() => Priority , (priorty) => priorty.tasks)
    @JoinColumn({ 
        name: "priority_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_t_priority"
    })
    priority: Priority;
    @ManyToOne(() => Sprint, (sprint) => sprint.tasks)
    @JoinColumn({ 
        name: "sprint_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_t_sprint"
    })
    sprint: Sprint;
    @ManyToOne(() => Status, (status) => status.tasks)
    @JoinColumn({ 
        name: "status_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_t_status"
    })
    status: Status;
    @OneToMany(() => Retro, retro => retro.task)
    retros: Retro[];
}
