import { ApiProperty } from "@nestjs/swagger";

export class CreateUserForProjectDto {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    project_id: number;
}