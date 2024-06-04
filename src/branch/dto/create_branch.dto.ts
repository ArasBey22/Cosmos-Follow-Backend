import { ApiProperty } from "@nestjs/swagger";

export class CreateBranchDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty({nullable: true, default: null})
    head_branch_id?: number;

}
