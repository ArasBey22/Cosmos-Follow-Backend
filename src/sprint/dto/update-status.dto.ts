import { ApiProperty } from "@nestjs/swagger";

export class UpdateStatusDto {
  @ApiProperty()
  name: string;
}