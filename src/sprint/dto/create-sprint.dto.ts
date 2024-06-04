import { ApiProperty } from "@nestjs/swagger";

export class CreateSprintDto {
    @ApiProperty()
    name: string;
    @ApiProperty({nullable: true, default: null})
    start_at: Date;
    @ApiProperty({nullable: true, default: null})
    end_at: Date;
    @ApiProperty()
    status_id: number;
}
