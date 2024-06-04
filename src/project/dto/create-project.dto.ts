import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty({default: false})
    is_finished: boolean;
    @ApiProperty({nullable: true, default: null})
    should_end_at: Date;
}
