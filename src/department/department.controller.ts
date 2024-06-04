import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/auth/guards/pass-auth.guard';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiBearerAuth()
@ApiTags('department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  
  // @Get('departments')
  // async getDepartments(@Res() res: Response) {
  //   return this.departmentService.getDepartments(res);
  // }
  
  @Post('update/department/:id')
  async updateDepartmentById(
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @Res() res: Response,
  ) {
    await this.departmentService.updateDepartment(id, updateDepartmentDto, res); 
  }

  @Post('delete/department/:id')
  async deleteDepartmentById(@Param('id') id: number, @Res() res: Response) {
    await this.departmentService.deleteDepartment(id, res);
  }

  @Public()
  @Post('create/department/:id')
  async createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @Res() res: Response
  ) {
    return res.status(HttpStatus.CREATED).json(await this.departmentService.createDepartment(createDepartmentDto, res)); 
  }
}
