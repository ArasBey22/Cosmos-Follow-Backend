import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto  {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    priority_id: number;
    @ApiProperty()
    status_id: number;
    @ApiProperty()
    sprint_id: number;
    @ApiProperty()
    afford_id: number;
    @ApiProperty()
    department_id: number;
    @ApiProperty({nullable: true, default: null})
    finished_at: Date;
    @ApiProperty({default: false})
    is_finished: boolean;
}
