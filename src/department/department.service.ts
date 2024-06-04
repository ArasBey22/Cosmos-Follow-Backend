import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { Response } from 'express';

@Injectable()
export class DepartmentService {
    constructor(
      @InjectRepository(Department) private departmentRepository: Repository<Department>
    ) {

    }
    async createDepartment(departmnetDetails: CreateDepartmentDto,res: Response) {
        try {
          const department = await this.departmentRepository.findOne({where:{name:departmnetDetails.name}});
          if(department) throw new HttpException('Departman zaten var',HttpStatus.BAD_REQUEST);
          else {
            const newDepartment = await this.departmentRepository.create(departmnetDetails);
            const result = await this.departmentRepository.save(newDepartment);
            if (!result) throw new HttpException('Departman oluşturulamadı',HttpStatus.INTERNAL_SERVER_ERROR);
            return res.status(201).json(result);
          }
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
      async updateDepartment(id: number, updateDepartmentDetails: UpdateDepartmentDto,res: Response) {
        try {
          const department = await this.departmentRepository.findOne({ where: { id: id } });
          if (!department) throw new HttpException('Departman bulunamadı',HttpStatus.NOT_FOUND);
          else {
            const updatedDepartmentData = Object.assign({}, department, updateDepartmentDetails);
            const result = await this.departmentRepository.update(id, updatedDepartmentData);
            console.log(result);
            if (result.affected > 0) return res.status(200).json(result);
            throw new HttpException('Departman bilgileri aynı',HttpStatus.BAD_REQUEST);
          }
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
      async deleteDepartment(id: number,res: Response) {
        try {
          if (!await this.departmentRepository.findOne({where:{id:id}})) throw new HttpException('Departman bulunamadı',HttpStatus.NOT_FOUND);
          else {
            return res.status(200).json(await this.departmentRepository.delete({id}));
          }
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
      async getDepartments(res: Response) {
        try {
          const departments = await this.departmentRepository.find();
          if (!departments) throw new HttpException('Departman bulunamadı',HttpStatus.NOT_FOUND);
          return res.status(200).json(departments);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
}
