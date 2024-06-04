import { ApiProperty } from "@nestjs/swagger";

export class UpdatePriorityDto {
    @ApiProperty()
    name: string;
}