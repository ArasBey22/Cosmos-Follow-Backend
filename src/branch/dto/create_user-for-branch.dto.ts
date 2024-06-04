import { ApiProperty } from "@nestjs/swagger";

export class CreateUserForBranch {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    branch_id: number;
}