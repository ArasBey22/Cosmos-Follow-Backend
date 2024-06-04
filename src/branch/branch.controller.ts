import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create_branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@ApiTags('branch')
@ApiBearerAuth()
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}
  
  @Get()
  async findAll(@Res() res: Response){
    return await this.branchService.findAll(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: number,@Res() res: Response) {
    return await this.branchService.findOne(id,res);
  }

  @Get('tree')
  async getAllBranchesAsTree(@Res() res: Response){
    return await this.branchService.findAllBranches(res);
  }

  @Get('users')
  async findAllBranchUsers(@Res() res: Response){
    return await this.branchService.findallBranchUsers(res);
  }

  @Get('subbranches')
  async findAllSubBranches(@Res() res: Response){
    return await this.branchService.findAllSubBranches(res);
  }

  @Post('create')
  async createBranch(@Body() createBranchDto: CreateBranchDto,@Res() res: Response) {
    return await this.branchService.create(createBranchDto,res);
  }

  @Post('update/:id')
  async updateBranch(@Param('id') id: number, @Body() updateBranchDto: UpdateBranchDto,@Res() res: Response) {
    return await this.branchService.update(id, updateBranchDto,res);
  }

  @Post('delete/:id')
  async removeBranch(@Param('id') id: number,@Res() res: Response){
    return await this.branchService.remove(id,res);
  }

  @Post('remove-sub-branch/:id')
  async removeSubBranch(@Param('id') id: number,@Res() res: Response){
    return await this.branchService.removeSubBranch(id,res);
  }

  @Post(':branch_id/add-user/:user_id')
  async addUsersToBranch(@Param('branch_id') id: number,@Param('user_id') user_id: number,@Res() res: Response){
    return await this.branchService.addUsersToBranch(id,user_id,res);
  }

  @Post('remove/user/:id')
  async removeUserFromBranch(@Param('id') id: number,@Res() res: Response){
    return await this.branchService.removeUserFromBranch(id,res);
  }
}
