import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../task/entities/task.entity";
import { Status } from "./status.entity";


@Entity('sprint')
export class Sprint {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    start_at: Date;
    @Column()
    end_at: Date;
    @Column()
    status_id: number;
    @ManyToOne(() => Status, status => status.sprints)
    @JoinColumn({
        name: "status_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_s_status"
    })
    status: Status;
    @OneToMany(() => Task, task => task.sprint)
    tasks: Task[];
}