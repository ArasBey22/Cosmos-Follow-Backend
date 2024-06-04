import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './role.service';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
    @Res() res: Response) 
    {
    return res.status(HttpStatus.CREATED).json(await this.roleService.createRole(createRoleDto, res));
  }

  @Get()
  async getRoles(@Res() res: Response) {
    return this.roleService.findRoles(res);
  }

  @Get('getbyid/:id')
  async getRoleById(@Param('id') id: number, @Res() res: Response) {
    return this.roleService.findRoleById(res, id);
  }

  @Get('getbyname/:name')
  async getRoleByName(@Param('name') name: string, @Res() res: Response) {
    return this.roleService.findRoleByName(res, name);
  }

  @Post('update/:id')
  async updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto, @Res() res: Response) {
    return this.roleService.updateRole(id, updateRoleDto, res);
  }

  @Post('delete/:id')
  async deleteRole(@Param('id') id: number, @Res() res: Response) {
    return this.roleService.deleteRole(id, res);
  }
}

