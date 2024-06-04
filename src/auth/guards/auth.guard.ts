import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from 'express';
import { UsersService } from "src/users/users.service";
import { jwtConstants } from "../auth.constans";
import { IS_PUBLIC_KEY } from "./pass-auth.guard";
import { EncryptionService } from "../encyrption/encyrption";

const encryptor = new EncryptionService;

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private usersService: UsersService, private reflector: Reflector) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isPublic) {
          return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
    
        if (!token) {
          throw new UnauthorizedException('Unauthorized');
        }
        try {
          const payload = await this.jwtService.verifyAsync(
            token,
            {
              secret: jwtConstants.secret
            });
          const user = await this.usersService.getUserByEmail(payload.email);
            if(!payload){
              const isPasswordValid = await encryptor.comparePassword(payload.password, user.password);
              if (!isPasswordValid) {
                throw new UnauthorizedException('emir');
              }
            }
          request.user = payload;
        } catch {
          throw new UnauthorizedException('Unauthorized');
        }
        return true;
      }
      private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}
