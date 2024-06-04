import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Response } from 'express';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}

    async createRole (RoleDetails: CreateRoleDto, res: Response) {
        try {
          const find = await this.roleRepository.findOne({where:{name:RoleDetails.name}});
          if(find) throw new HttpException('Rol zaten var',HttpStatus.BAD_REQUEST);
          else {
            const newRole = await this.roleRepository.create(RoleDetails);
            const result = await this.roleRepository.save(newRole);
            console.log(result);
            return res.status(201).json(result);
          }
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
      async findRoles(res: Response) {
        try {
          const roles = await this.roleRepository.find();
          if (!roles) throw new HttpException('Rol bulunamadı',HttpStatus.NOT_FOUND);
          return res.status(200).json(roles);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
      async findRoleByName(res: Response, name: string) {
        try {
          const role = await this.roleRepository.findOne({where:{name}});
          if (!role) throw new HttpException('Rol bulunamadı',HttpStatus.NOT_FOUND);
          return res.status(200).json(role);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
      async findRoleById(res: Response, id: number) {
        try {
          const role = await this.roleRepository.findOne({where:{id}});
          if (!role) throw new HttpException('Rol bulunamadı',HttpStatus.NOT_FOUND);
          return res.status(200).json(role);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
      async updateRole(id: number, updateRoleDetails: UpdateRoleDto, res: Response) {
        try {
          const role = await this.roleRepository.findOne({ where: { id: id } });
          if (!role) throw new HttpException('Rol bulunamadı',HttpStatus.NOT_FOUND);
          else {
            const updatedRoleData = Object.assign({}, role, updateRoleDetails);
            const result = await this.roleRepository.update(id, updatedRoleData);
            console.log(result);
            if (result.affected > 0) {
              return res.status(200).json(updatedRoleData);
            }
            else {
              throw new HttpException('Rol bilgileri aynı',HttpStatus.BAD_REQUEST); 
            }
          }
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
      async deleteRole(id: number ,res: Response){
        try {
          if (!await this.roleRepository.findOne({where:{id:id}})) throw new HttpException('Rol bulunamadı',HttpStatus.NOT_FOUND);
          else {
            return res.status(200).json(await this.roleRepository.delete({id}));
          }
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
}
