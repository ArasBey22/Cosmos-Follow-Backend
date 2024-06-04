import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { EncryptionService } from 'src/auth/encyrption/encyrption';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const encryptor = new EncryptionService;

@Injectable()
export class UsersService {

  constructor(
   @InjectRepository(User) private userRepository: Repository<User>, //depoyu injekte etme
  )
  {}
  async findUsers(res: Response){
    try {
      const findedUsers = await this.userRepository.find({relations:{role:true}});
      if (!findedUsers) throw new HttpException('Kullanıcı bulunamadı',HttpStatus.NOT_FOUND)
      else return res.status(200).json(findedUsers);
    } catch (error) {
      return res.status(500).json({ error : error.message });
    }
  } 
  async findOneByEmail(res: Response ,email: string) {   // kontrollerda cagırılan bir fonksiyon oldugu için response almak zorundayım
    try {
      const user = await this.getUserByEmail(email);
      if(!user) throw new HttpException('Kullanıcı bulunamadı',HttpStatus.NOT_FOUND) //Error('Kullanıcı bulunamadı'); 
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async getUserByEmail(email: string) { 
  //birden fazla yerde ortak kullanılan bir fonksiyon oldugu 
  //için sadece veri dönüsü olan bir fonksiyon ortak kullanım için olan bir fonksiyon
    const user = await this.userRepository.findOne({where:{email:email}});
    console.log(user);
    if(!user){
      console.log('kullanıcı bulunamadı');
      throw new HttpException('Kullanıcı bulunamadı',HttpStatus.NOT_FOUND); //throw new Error('Kullanıcı bulunamadı
    }
    else {
      return user;
    } 
  }
  //  get users by role id in try catch block
  async getUsersByRole(res: Response, role_id: number) {
    try {
      const users = await this.userRepository.find({where:{role_id:role_id}});
      if (!users) throw new HttpException('Kullanıcı bulunamadı',HttpStatus.NOT_FOUND);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async findOneById(id: number) {
    try {
      const user = await this.userRepository.findOne({where:{id}}); //soldaki id entity bölümünden gelir sağdaki id ise parametre olarak gelen id dir
      if (!user) throw new HttpException('Kullanıcı bulunamadı',HttpStatus.NOT_FOUND);
      return {user};
    } catch (error) {
      throw error
    }
  }
  async createUser(userDetails: CreateUserDto, res: Response) {
    try {
      const user = await this.userRepository.findOne({where:{email:userDetails.email}});
      if(user) throw new HttpException('Kullanıcı zaten var',HttpStatus.BAD_REQUEST);
      else {
        userDetails.password = await encryptor.hashPassword(userDetails.password);
        const newUser = await this.userRepository.create(userDetails);
        const result = await this.userRepository.save(newUser);
        console.log(result);
        return res.status(201).json(result);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }   
  }
  //update fonskiyonunda object assign kullanarak değişiklik yaptım 24 nisan 2024
  /*
  async updateUser(id: number, updateUserDetails: UpdateUserDto,res: Response) {
    try {
      if (!await this.userRepository.findOne({where:{id:id}})) throw new Error('Kullanıcı bulunamadı');
      else {
        const result = await this.userRepository.update(id, updateUserDetails);
        console.log(result);
        if(result.affected > 0) return res.status(200).json(result);
        throw new Error('Kullanıcı bilgileri aynı');
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  */
  async updateUser(id: number, updateUserDetails: UpdateUserDto, res: Response) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) throw new HttpException('Kullanıcı bulunamadı',HttpStatus.NOT_FOUND);
      else {
        const updatedUserData = Object.assign({}, user, updateUserDetails);
        const result = await this.userRepository.update(id, updatedUserData);
        console.log(result);
        if (result.affected > 0) {
          return res.status(200).json(updatedUserData);
        }
        else {
          throw new HttpException('Kullanıcı bilgileri aynı',HttpStatus.BAD_REQUEST); 
        }
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }//update fonksiyonunda object assign kullanarak değişiklik yaptım 24 nisan 2024
  }  
  async deleteUser(id: number ,res: Response){
    try {
      if (!await this.userRepository.findOne({where:{id:id}})) throw new HttpException('Kullanıcı bulunamadı',HttpStatus.NOT_FOUND);
      else {
        return res.status(200).json(await this.userRepository.delete({id}));
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

}
/* user servisin res.status kullanılmamıs hali
-----------------------------------------------------------------------------------------------------------------------------------------------------------
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {
  userRepositoy: any;
  static findUsers() {
      throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(User) private userRepository: Repository<User> ) //depoyu injekte etme
  {}
  async findUsers() {
    return await this.userRepository.find();
  }
  async findOneByEmail(email: string) {
    const user = this.userRepository.findOne({where:{email:email}});
    if(!user) throw new Error('Kullanıcı bulunamadı');
    return user
  }
  async findOne(id: number) {
    const user =await this.userRepository.findOne({where:{id:id}}); //soldaki id entity bölümünden gelir sağdaki id ise parametre olarak gelen id dir
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return {user};
  }
  async createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create(userDetails);
    await this.userRepository.save(newUser);
    console.log(newUser);
    return newUser;
  }
  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update(id, updateUserDetails);
  }
  deleteUser(id: number ){
    return this.userRepository.delete({id});
  }
}
-----------------------------------------------------------------------------------------------------------------------------------------------------------
*/
/*--delete put get ve post işlemleri yapılır
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User> ) //depoyu injekte etme
  {}
  findUsers() {
    return this.userRepository.find();
  }
  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      created_at: new Date()
    });
    return this.userRepository.save(newUser);
  }
  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update(id, updateUserDetails);
  }
  deleteUser(id: number ){
    return this.userRepository.delete({id});
  }
}
------------------------------------------------------------------------------------
*/
/*
--bu kısımda postman kullanarak controllerda yazdığım yorum satırlarında anlattığım islem yapılır

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>/*depoyu injekte etme) 
  {}

  findUsers() {
  return this.userRepository.find();
  }
  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
       created_at: new Date()
    });
    return this.userRepository.save(newUser);
  }
   */
   /*Users = {
      first_name: 'aslan',
      last_name: 'kral',
      email: 'krallaslan@.com',
      password: '123456'
    };
  
  createUser(createUserDto: CreateUserDto) {
    const user = new User();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
  }
  getAllUsers() {
    return this.Users;
  } 
}
*/