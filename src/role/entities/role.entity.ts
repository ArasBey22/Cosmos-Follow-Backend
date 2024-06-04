import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Permission } from "../../permission/entities/permission.entity";

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => User, (user) => user.role) //bir role birden fazla user olabilir
    users: User[]; //role a ait olan userlar
    @OneToMany(() => Permission, permission => permission.role) // Bir rol birden fazla izne sahip olabilir
    permissions: Permission[];
}