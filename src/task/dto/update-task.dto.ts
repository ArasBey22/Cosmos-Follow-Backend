import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto  } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto ) {
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
