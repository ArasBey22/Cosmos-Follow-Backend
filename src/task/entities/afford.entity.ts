import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";



@Entity('afford')
export class Afford {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    point: number;
    @OneToMany(() => Task, task => task.afford)
    tasks: Task[];
}