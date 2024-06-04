import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSprintDto } from './create-sprint.dto';

export class UpdateSprintDto extends PartialType(CreateSprintDto) {
    @ApiProperty()
    name: string;
    @ApiProperty({nullable: true, default: null})
    start_at: Date;
    @ApiProperty({nullable: true, default: null})
    end_at: Date;
    @ApiProperty()
    status_id: number;
}
