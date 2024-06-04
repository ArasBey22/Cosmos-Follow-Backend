import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto { 
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
  @ApiHideProperty() // Sadece okunabilir (değiştirilemez)
  role_id: number; // Varsayılan olarak kullanıcı rolü atanacak
}