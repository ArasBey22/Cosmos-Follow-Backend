import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Api } from 'src/api/entities/api.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Repository } from 'typeorm';
import { IS_PUBLIC_KEY } from './pass-auth.guard';


  @Injectable()
  export class PermissionGuard implements CanActivate {
    constructor(
     private reflector: Reflector,
     private jwtService:JwtService,
     @InjectRepository(Permission) private permissionRepository: Repository<Permission>, //permission repository eklendi
     @InjectRepository(Api) private apiRepository: Repository<Api> //api repository eklendi
     ) {}
     async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if(isPublic){
        return true;
      }
      const request = context.switchToHttp().getRequest();//baslıktan giris yapmıs olan kullanıcıya eris role id sini al request.user.role diyip role id al sorna
      const path = request.route.path; //path i aldım  
      const method = request.route.stack[0].method; //methodu aldım
      const role_id = request.user.role; //role id yi aldım //request içindeki parametrelerden o apiye ait path i 
      const api = await this.apiRepository.findOne({ where: { path: path, method: method } }); //apinin path ini buldum
      if(api){
        const permission = await this.permissionRepository.findOne({
          where:{
            api_id: api.id,
            role_id: role_id
          }
        }); 
        //api ve role id ye göre permission buldum
        console.log("perm ::",permission) 
        if(permission){
              return true;
        }
        else throw new UnauthorizedException('You do not have permission to access this resource');
      }
    }   
}