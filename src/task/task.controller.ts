import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateAffordDto } from './dto/update-afford.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { CreatePriorityDto } from './dto/create-priority.dto';

@ApiTags('task')
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @Get()
  async findAll(@Res() res: Response){
    return await this.taskService.findAllTasks(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: number,@Res() res: Response){
    return await this.taskService.findOneTask(id,res);
  }

  @Get('priorities')
  async getPriorities(@Res() res: Response){
    return await this.taskService.getPriorities(res);
  }

  @Get('afforts')
  async findAllAffords(@Res() res: Response){
    return await this.taskService.findAllAffords(res);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto,@Res() res: Response){
    return await this.taskService.createTask(createTaskDto,res);
  }

  @Post('update/:id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto,@Res() res: Response){
    return await this.taskService.updateTask(id,updateTaskDto,res);
  }

  @Post('delete/:id')
  async removeTask(@Param('id') id: number,@Res() res: Response){
    return await this.taskService.removeTask(id,res);
  }

  @Post(':task_id/add-user/:user_id')
  async addUserToTask(@Param('task_id') task_id: number, @Param('user_id') user_id: number,@Res() res: Response){
    return await this.taskService.addUserToTask(task_id,user_id,res);
  }

  @Post('create/afford')
  async createAfford(@Body() affordDetails: UpdateAffordDto,@Res() res: Response){
    return await this.taskService.createAfford(res,affordDetails);
  }

  @Post('create/priority')
  async createPriority(
    @Body() createPriorityDto: CreatePriorityDto,
    @Res() res: Response,
  ){
    return await this.taskService.createPriority(res,createPriorityDto);
  }

  @Post('update/priority/:id')
  async updatePriority(
    @Param('id') id: number,
    @Body() updatePriorityDto: UpdatePriorityDto,
    @Res() res: Response,
  ){
    return await this.taskService.updatePriority(id,updatePriorityDto,res);
  }

  @Post('delete/priority/:id')
  async removePriority(@Param('id') id: number,@Res() res: Response){
    return await this.taskService.removePriority(id,res);
  }

  @Post('update/afford/:id')
  async updateAfford(
    @Param('id') id: number,
    @Body() updateAffordDto: UpdateAffordDto,
    @Res() res: Response,
  ){
    return await this.taskService.updateAfford(id,updateAffordDto,res);
  }

  @Post('delete/afford/:id')
  async removeAfford(@Param('id') id: number,@Res() res: Response){
    return await this.taskService.removeAfford(id,res);
  }
}
