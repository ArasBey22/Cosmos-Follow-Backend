import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sprint } from "./sprint.entity";
import { Task } from "../../task/entities/task.entity";


@Entity('status')
export class Status {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => Sprint, sprint => sprint.status)
    sprints: Sprint[];
    @OneToMany(() => Task , task => task.status)
    tasks: Task[];  
}