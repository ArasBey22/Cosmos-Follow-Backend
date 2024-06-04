import { ApiProperty } from "@nestjs/swagger";

export class CreateAffordDto {
    @ApiProperty()
    point: number;
}