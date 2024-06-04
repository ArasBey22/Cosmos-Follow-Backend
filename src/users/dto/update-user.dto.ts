import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto { 
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  department_id: number;
  @ApiProperty()
  role_id: number;
  @ApiProperty() 
  created_at: Date;
  }