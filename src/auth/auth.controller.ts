import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './guards/pass-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto:AuthDto, @Res() res: Response) {
    return await this.authService.login(signInDto.email, signInDto.password,res);
  }
  @Public()
  @Post('register')
  async register(@Body() userDetails: CreateUserDto,@Res() res: Response){
    return await this.authService.register(userDetails, res);
    
  }
}

