import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";


@Entity('task_users')
export class TaskUsers {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    task_id: number;
    @CreateDateColumn()
    created_at: Date;
    @ManyToOne(() => Task, (task) => task.task_users)
    @JoinColumn({ 
        name: "task_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_tu_task_id"
    })
    task: Task;
    @ManyToOne(() => User, (user) => user.task_users)
    @JoinColumn({ 
        name: "user_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_tu_user_id"
    })
    user: User;
}