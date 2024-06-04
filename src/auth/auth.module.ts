import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './auth.constans';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [UsersModule,JwtModule.register({
    global: true,
    secret : jwtConstants.secret,
    signOptions: {expiresIn: '1d'} // 1 day
})],
  controllers: [AuthController],
  providers: [AuthService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AuthModule {}
