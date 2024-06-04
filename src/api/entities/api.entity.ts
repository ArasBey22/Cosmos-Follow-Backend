import { Permission } from "../../permission/entities/permission.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('api')
export class Api {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    path: string;

    @Column()
    method: string;

    @OneToMany(() => Permission, permission => permission.api)
    permissions: Permission[];
}
