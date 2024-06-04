import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getUsers(@Res() res: Response) {
    return this.usersService.findUsers(res);
  }
  @Get('get/by_role/:role_id')
  async getUsersByRole(@Res() res: Response, @Param('role_id') roleId: number) {
    return this.usersService.getUsersByRole(res, roleId);
  }
  @Get('get/by_email/:email')
  async getUserByEmail(@Param('email') email: string, @Res() res: Response) { 
    return await this.usersService.findOneByEmail(res, email);
  }
  
  @Get('get/by_id/:id')
  async getUserById(@Param('id') id: number, @Res() res: Response) {
    try {
      return res.status(200).send(await this.usersService.findOneById(id));
    } catch(error) {
      return res.status(500).json({ error: error.message });
    }
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return res.status(HttpStatus.CREATED).json(await this.usersService.createUser(createUserDto, res)); 
  } 
  @Post('update/:id')
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    await this.usersService.updateUser(id, updateUserDto, res); 
  }
  @Post('delete/:id')
  async deleteUserById(@Param('id') id: number, @Res() res: Response) {
    await this.usersService.deleteUser(id, res);
  }
}

  /*-------------mete abimin yazdıgı örnek---------
  @Get()
  getUsers(@Req() req: any,@Res() res: Response){
    const user_id = req.user.sub 
    console.log(user_id)
    return this.usersService.findUsers();
  }
  //@Public() -------------------------------------
  */
  //benim ilk yapmıs oldugum find users


  // -------video izleyerek yapılanlar------
  // @Roles(Role.Admin)
  // @Post('createuserwithpermission')
  // async create(@Body() CreateUserDto: CreateUserDto,@Res() res: Response){
  //   return res.status(HttpStatus.CREATED).json(await this.usersService.createUserForPermission(CreateUserDto,res)); 
  // }
  // @Get('getuserbypermission')
  // @Roles(Role.Admin)
  // getUsersByPermission(@Res() res: Response) {
  //   return this.usersService.findUsers(res);
  // }




//-------post ve get islemleri ile update delete creaate get islemleri yapılır
// import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Get()
//   getUsers() {
//     return this.usersService.findUsers();
//   }
//   @Post()
//   createUser(@Body() CreateUserDto: CreateUserDto) {
//     this.usersService.createUser(CreateUserDto); 
//   } 
//   @Get(':id')
//   getUserBYId(@Param('id', ParseIntPipe) id: number) {
//     this.usersService.findOne(id);
//   }
//   @Post('update/:id')
//   async updateUserById(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() UpdateUserDto: UpdateUserDto
//     ) {
//     await this.usersService.updateUser(id, UpdateUserDto); 
//   }
//   @Post('delete/:id')
//   async deleteUserById(@Param('id', ParseIntPipe) id: number,) {
//     await this.usersService.deleteUser(id);
//   }
// }
/* --bu kısımda delete put get ve post işlemleri yapılır

-------videoda kaldığım nokta 43,22 typeorm crash course

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findUsers();
  }
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    this.usersService.createUser(CreateUserDto); // Pass CreateUserDto as an argument
  } 
  @Get(':id')
  getUserBYId(@Param('id') id: string) {
    console.log(id)
    return { id };
  }
  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateUserDto: UpdateUserDto
    ) {
    await this.usersService.updateUser(id, UpdateUserDto); 
  }
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number,) {
    await this.usersService.deleteUser(id);
  }
}
*/


/*----bu kısımda postman kullanarak
first_name 
last_name
email
password 
giriş yaparak yeni bir kullanıcı oluşturulabilir ve listeleyebiliriz

utils klasörü içerisinde types.ts dosyası oluşturulur ve içerisine CreateUserParams adında bir interface oluşturulur
giris aynı tarzda yapılır

--utils dosyası böyle sonra değistiririm diye yine yazayım dedim
export type CreateUserParams = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};
----------------
entity nin yazımı 

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
----------------
import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findUsers();
  }
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    this.usersService.createUser(CreateUserDto); // Pass CreateUserDto as an argument
  } 

  @Get(':id')
  getUserBYId(@Param('id') id: string) {
    console.log(id)
    return { id };
  }
}
*/