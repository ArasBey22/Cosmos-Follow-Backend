import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../entities/task.entity";

@Entity('retro')
export class Retro {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    task_id: number;

    @ManyToOne(() => Task, task => task.retros) // Task entity'sine referans
    @JoinColumn({ 
        name: "task_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_r_task_id"       
    })
    task: Task;
}
