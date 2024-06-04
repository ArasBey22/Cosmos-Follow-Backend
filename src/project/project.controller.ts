import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@ApiTags('project')
@ApiBearerAuth()  
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  
  @Get()
  async findAllProjects(@Res() res: Response) {
    return await this.projectService.findAllProjects(res);
  }
  
  @Get(':id')
  async findOneProject(@Param('id') id: number, @Res() res: Response) {
    return await this.projectService.findOneProject(id, res);
  }
  
  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto, @Res() res: Response) {
    return await this.projectService.createProject(createProjectDto, res);
  }
  
  @Post('update/:id')
  async updateProject(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto, @Res() res: Response) {
    return await this.projectService.updateProject(id, updateProjectDto, res);
  }
  
  @Post('delete/:id')
  async removeProject(@Param('id') id: number, @Res() res: Response) {
    return await this.projectService.removeProject(id, res);
  }
  
  @Post(':project_id/add-user/:user_id')
  async addUserToProject(@Param('project_id') project_id: number, @Param('user_id') user_id: number, @Res() res: Response) {
    return await this.projectService.addUserToProject(project_id, user_id, res);
  }

  @Post('add-task/:project_id/:task_id')
  async addTaskToProject(@Param('project_id') project_id: number, @Param('task_id') task_id: number, @Res() res: Response) {
    return await this.projectService.addProjectTask(project_id, task_id, res);
  }
}
