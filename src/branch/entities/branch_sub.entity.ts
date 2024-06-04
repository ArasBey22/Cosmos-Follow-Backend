import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Branch } from "./branch.entity";

@Entity('branch_sub')
export class BranchSub {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    head_branch_id: number;
    @Column()
    sub_branch_id: number;
    @ManyToOne(() => Branch, (branch) => branch.branch_subs)
    @JoinColumn({
        name: "head_branch_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_bs_head_branch_id"
    })
    head_branch: Branch;
    @ManyToOne(() => Branch, (branch) => branch.branch_subs)
    @JoinColumn({
        name: "sub_branch_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_bs_sub_branch_id"
    })
    sub_branch: Branch;
}
