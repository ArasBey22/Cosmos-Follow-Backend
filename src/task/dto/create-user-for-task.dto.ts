import { ApiProperty } from "@nestjs/swagger";

export class CreateUserForTaskDto{
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    task_id: number;
}