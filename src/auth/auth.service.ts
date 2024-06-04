/*
$ nest g module auth
$ nest g controller auth
$ nest g service auth
*/
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import UserRolesConstant from "constants/user_roles.constant";
import { Response } from "express";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { EncryptionService } from "./encyrption/encyrption";
const encryptor = new EncryptionService
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        ) {}

        async register(userDetails: CreateUserDto,res: Response) { // Burada userService üzerinden createUser fonksiyonunu çağırabilirsiniz 
            try {
                userDetails.role_id = UserRolesConstant.USER // Kullanıcı kaydı yapılırken rolü USER olarak atanır
                const newUser = await this.usersService.createUser(userDetails,res);  // Auth işlemlerinizi gerçekleştirin, örneğin token oluşturun, vs.
                return res.send(newUser);
            } catch (error) {
                return res.status(400).json({ error: 'Bad Request' });
            }
        }   
        async login(email: string , pass: string,res: Response){
            try{
                const user = await this.usersService.getUserByEmail(email);
                const isPasswordValid = await encryptor.comparePassword(pass, user.password);
                if (!isPasswordValid) {
                  throw new UnauthorizedException('Sifre ya da email yanlis');
                }
                const payload = { id: user.id, email: user.email, role: user.role_id, name: user.first_name, last_name: user.last_name }; //tokken ın içine user ın id si mail adresi ve role id si yüklenir
                const access_token = await this.jwtService.signAsync(payload)
                return res.send({access_token:access_token, id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name});   //{access_token: access_token, id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name}
            } catch (error) {
                return res.status(401).send(error.message);
            }   
        }
}
