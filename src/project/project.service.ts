import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectUsers } from './entities/project_users.entity';
import { UsersService } from 'src/users/users.service';
import { Task } from 'src/task/entities/task.entity';
import { ProjectTasks } from './entities/project_tasks.entity';

@Injectable()
export class ProjectService {
  constructor(
  @InjectRepository(Project)private projectRepository: Repository<Project>,
  @InjectRepository(ProjectUsers)private projectUsersRepository: Repository<ProjectUsers>,
  private userService: UsersService,
  @InjectRepository(Task)private taskRepository: Repository<Task>,
  @InjectRepository(ProjectTasks)private porjectTasksRepository: Repository<ProjectTasks>,
  ) {}

  async createProject(projectDetails: CreateProjectDto, res: Response) {
    try {
      const project = await this.projectRepository.findOne({ where: { name: projectDetails.name } });
      if (project) throw new HttpException('Proje zaten var',HttpStatus.CONFLICT);
      else {
      const newProject = await this.projectRepository.create(projectDetails);
      const result = await this.projectRepository.save(newProject);
      if(!result) throw new HttpException('Proje oluşturulamadı',HttpStatus.INTERNAL_SERVER_ERROR);
      console.log(result);
      return res.status(201).json(result);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
 async findAllProjects(res: Response) {
    try {
      const findedProjects = await this.projectRepository.find();
      if (!findedProjects) throw new HttpException('Proje bulunamadı',HttpStatus.NOT_FOUND);
      else return res.status(200).json(findedProjects);
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async findOneProject(id: number,res: Response) {
    try {
      const project = await this.projectRepository.findOne({ where: { id: id } });
      if (!project) throw new HttpException('Proje bulunamadı',HttpStatus.NOT_FOUND);
      console.log(project);
      return res.status(200).json(project);
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
   async updateProject(id: number, updateProjectDto: UpdateProjectDto,res: Response) {
    /* 24 nisan 2024 te degistirildi
    try {
      if (!await this.projectRepository.findOne({ where: { id: id } })) throw new Error('Proje bulunamadı');
      else {
      return res.status(200).json(await this.projectRepository.update(id, updateProjectDto));
      }
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
    */
   try {
    const project = await this.projectRepository.findOne({ where: { id: id } });
    if (!project) throw new HttpException('Proje bulunamadı',HttpStatus.NOT_FOUND);
    else {
      const updateProject= Object.assign(project, updateProjectDto);
      const result = await this.projectRepository.update(id, updateProject);
      console.log(result);
      if(result.affected > 0) return res.status(200).json({ message: 'Proje güncellendi'});
      throw new HttpException('Proje bilgileri aynı',HttpStatus.BAD_REQUEST);
      }
   } catch (error) {
    return res.status(500).json({ error: error.message}); 
   }
  }
  async removeProject(id: number,res: Response) {
    try {
      if (!await this.projectRepository.findOne({ where: { id: id } })) throw new HttpException('Proje bulunamadı',HttpStatus.NOT_FOUND);
      else {
      return res.status(200).json(await this.projectRepository.delete({ id }));
      }
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async addUserToProject(project_id: number, user_id: number,res: Response) {
    try {
      await this.validateUserProject(project_id, user_id);
      if (!await this.projectRepository.findOne({ where: { id: project_id } })) throw new Error('Proje bulunamadı');
      const newProjectUser = await this.projectUsersRepository.create({ project_id, user_id });
      const result = await this.projectUsersRepository.save(newProjectUser);
      if(!result) throw new HttpException('Kullanıcı projeye eklenemedi',HttpStatus.INTERNAL_SERVER_ERROR);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async validateUserProject(project_id: number, user_id: number) {
   try {
    await this.userService.findOneById(user_id);
    if(!await this.projectRepository.findOne({ where: { id: project_id } })) throw new HttpException('Proje bulunamadı',HttpStatus.NOT_FOUND);
    const project = await this.projectRepository.findOne({ where: { id: project_id } }); 
    if(!project) throw new HttpException('Proje bulunamadı',HttpStatus.NOT_FOUND);
    const projectUserExists = await this.projectUsersRepository.findOne({ where: { project_id: project_id, user_id: user_id } });
    if(projectUserExists) throw new Error('Kullanıcı zaten projede');
    }
    catch(error){
      throw error
   }
  }
  async addProjectTask(project_id: number, task_id: number,res: Response) {
    try {
      if (!await this.projectRepository.findOne({ where: { id: project_id } })) throw new HttpException('Proje bulunamadı',HttpStatus.NOT_FOUND);
      if (!await this.taskRepository.findOne({ where: { id: task_id }} )) throw new HttpException('Task bulunamadı',HttpStatus.NOT_FOUND);
      const existsProjectTask = await this.porjectTasksRepository.findOne({ where: { project_id: project_id, task_id: task_id } });
      if(existsProjectTask) throw new HttpException('Task zaten projede',HttpStatus.CONFLICT);
      else {
        const newProjectTask = await this.porjectTasksRepository.create({ project_id, task_id });
        const result = await this.porjectTasksRepository.save(newProjectTask);
        if(!result) throw new HttpException('Task projeye eklenemedi',HttpStatus.INTERNAL_SERVER_ERROR);
        console.log('task projeye eklendi');
        return res.status(201).json(result);
      }
    }
    catch(error){
      return res.status(500).json({ error: error.message});
    }
  }
}
/* todo project users repo baglanacak inject repository ile
add user project apisinde project_users reposu kullanacak*/