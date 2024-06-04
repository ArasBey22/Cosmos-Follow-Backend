import { ApiProperty } from "@nestjs/swagger";

export class UpdateAffordDto  {
    @ApiProperty()
    point: number;
}