import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateStatusDto } from './dto/create-status.dto';

@ApiTags('sprint')
@ApiBearerAuth()
@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  
  @Get()
  async findAll(@Res() res: Response) {
    return res.status(200).json(await this.sprintService.findAllSprints(res));
  }
  
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response){
    try {
      return res.status(200).json(await this.sprintService.findOneById(id));
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  @Get('retro/get/all/retros/list')
  async findRetro(@Res() res: Response){
    return res.status(200).json(await this.sprintService.findRetro(res));
  }
  
  @Get('status/all')
  async findAllStatus(@Res() res: Response){
    return res.status(200).json(await this.sprintService.findAllStatus(res));
  }
  
  @Get('retro/get/all/retros')
  async findAllRetro(@Res() res: Response){
    return res.status(200).json(await this.sprintService.findAllRetros(res));
  }
  
  @Post()
  async create(@Body() createSprintDto: CreateSprintDto, @Res() res: Response){
    return res.status(201).json(await this.sprintService.create(createSprintDto, res));
  }

  @Post('status/create')
  async createStatus(@Body() createStatusDto: CreateStatusDto, @Res() res: Response){
    return res.status(201).json(await this.sprintService.createStatus(createStatusDto, res));
  }
  
  @Post('update/:id')
  async update(
    @Param('id') id: number, 
    @Body() updateSprintDto: UpdateSprintDto, 
    @Res() res: Response
  ){
    await this.sprintService.update(id, updateSprintDto, res);
  }

  @Post('status/update/:id')
  async updateStatus(
    @Param('id') id: number, 
    @Body() updateStatusDto: CreateStatusDto, 
    @Res() res: Response
  ){
    await this.sprintService.updateStatus(id, updateStatusDto, res);
  }

  @Post('delete/:id')
  async remove(@Param('id') id: number, @Res() res: Response){
    return res.status(200).json(await this.sprintService.remove(id, res));
  }

  @Post('status/delete/:id')
  async removeStatus(@Param('id') id: number, @Res() res: Response){
    return res.status(200).json(await this.sprintService.removeStatus(id, res));
  }
  @Post('sprint/add/retro_table')
  async add_sprint_to_retro_table(@Res() res: Response) {
    return await this.sprintService.add_sprint_to_retro_table(res);
  }
  @Post('task/add/retro/if_time_passed')
  async add_task_to_retro_table_if_time_passed(@Res() res: Response) {
    return await this.sprintService.addUnfinishedTasksToRetro(res);
  }
  @Post('retro/remove/:id')
  async removeRetro(@Param('id') id: number, @Res() res: Response){
    return res.status(200).json(await this.sprintService.removeRetro(id, res));
  }
}
