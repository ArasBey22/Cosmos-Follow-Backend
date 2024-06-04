import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Task } from "../../task/entities/task.entity";

@Entity('department')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => User, (user) => user.department) //bir department birden fazla user a ait olabilir
    users: User[];
    @OneToMany(() => Task, (task) => task.department) //bir department birden fazla task a ait olabilir
    tasks: Task[];
}