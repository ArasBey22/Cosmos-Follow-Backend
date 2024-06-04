import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "../../role/entities/role.entity";
import { Api } from "../../api/entities/api.entity";


@Entity('permission')
@Unique("ui_api_id_role_id", ["role_id","api_id"])
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Api,(api) => api.permissions)   //izinler bir api ye ait olabilir
    @JoinColumn({ 
        name: 'api_id',
        referencedColumnName:'id',
        foreignKeyConstraintName:'fk_p_api_id',
        })
    api: Api;
    @Column()
    role_id: number;
    @Column()
    api_id: number;
    @ManyToOne(() => Role,(role) => role.permissions) //izinler bir role a ait olabilir
    @JoinColumn({
        name: 'role_id',
        referencedColumnName: 'id',   
        foreignKeyConstraintName: 'fk_p_role_id',
        })
    role: Role;
}
