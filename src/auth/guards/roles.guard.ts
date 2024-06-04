/*import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/users/entities/role.enum";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // what is the requieq role?
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
      context.getHandler(),
      context.getClass(),
    ]);
    if(!requiredRoles){
      return true;
    }

//const { user } = context.switchToHttp().getRequest();
    const  user: User = {
      id: 0,
      email: "himmetemiraras@.com",
      password: "123",
      role_id: 1,
      first_name: 'himmet',
      last_name: "aras",
      created_at: undefined,
      updated_at: undefined,
      roles: [Role.Admin]
    }
    
    //does the current user making the request have thoese required roles?
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
*/

/* --videodan evvelki kod--*/
/*import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean{
    const roles = this.reflector.get(ROLES_KEY, context.getHandler())
    if(!roles)
    return true;
  const request = context.switchToHttp().getRequest()
  const role_id = request.user.role_id
  return matchRoles(roles, role_id)

  }
  //-------videoda yaptıklarım------------
  // canActivate(context: ExecutionContext): boolean {
  //   const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //   if (!requiredRoles) {
  //     return true;
  //   }
  //   const { user } = context.switchToHttp().getRequest();
  //   return requiredRoles.some((role) => user.roles?.includes(role));
  // }
}
  function matchRoles(roles: any[], role_id: any): boolean {
    for(let i=0;roles.length;i++){
      if(roles[i] == role_id)return true
      else return false
    }
    return true
  }*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'decorators/roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(
     private reflector: Reflector,
     private jwtService:JwtService
     ) {}
     async matchRoles(roles: any[], role_id: any): Promise<boolean> {
       for(let i = 0; i < roles.length; i++) { // Döngünün doğru şekilde yapılması için '<' operatörü kullanılmalı
         if(roles[i] == role_id){
           console.log('islem basarılı')
           return true;
         }
       }
       console.log('islem basarısız')
       return false;
     }

     async canActivate(context: ExecutionContext): Promise<boolean> {
       const roles = this.reflector.get(Roles, context.getHandler());
       if (!roles) {
         return true;
       }
       const request = context.switchToHttp().getRequest();
       const token = request.headers.authorization.replace('Bearer ','')
       const user = await this.jwtService.decode(token)
       console.log(token)
       console.log(user)
       if (!user || !user.role) {
         return false; // Kullanıcı veya rol bilgisi yoksa yetkilendirme başarısız olmalı
       }
       return await this.matchRoles(roles, user.role); // matchRoles fonksiyonunu çağırın
     }
   }
