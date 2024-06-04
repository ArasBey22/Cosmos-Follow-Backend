import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateAffordDto } from './dto/create-afford.dto';
import { CreateTaskDto  } from './dto/create-task.dto';
import { UpdateAffordDto  } from './dto/update-afford.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Afford } from './entities/afford.entity';
import { Priority } from './entities/priority.entity';
import { Task } from './entities/task.entity';
import { TaskUsers } from './entities/task_users.entity';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { CreatePriorityDto  } from './dto/create-priority.dto';

@Injectable()
export class TaskService {
  constructor(
  @InjectRepository(Task)
  private taskRepository: Repository<Task>,
  @InjectRepository(TaskUsers)
  private taskUsersRepository: Repository<TaskUsers>,
  private userService: UsersService,
  @InjectRepository(Priority)
  private priorityRepository: Repository<Priority>,
  @InjectRepository(Afford)
  private affordRepository: Repository<Afford>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto ,res: Response) {
    try {
      const task = await this.taskRepository.findOne({where:{name: createTaskDto.name}});
      if(task) throw new HttpException('Task zaten var',HttpStatus.BAD_REQUEST);
      else {
      const newTask = await this.taskRepository.create(createTaskDto);
      const result = await this.taskRepository.save(newTask);
      console.log(result);
      return res.status(201).json(result);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async findAllTasks(res: Response) {
    try {
      const findedTasks = await this.taskRepository.find();
      if(!findedTasks) throw new HttpException('Task bulunamadı',HttpStatus.NOT_FOUND);
      else return res.status(200).json(findedTasks);
    } catch (error) { 
      return res.status(500).json({ error: error.message});
    }
  }
  async findAllAffords(res: Response) {
    try {
      const findedAffords = await this.affordRepository.find();
      if(!findedAffords) throw new HttpException('Afford bulunamadı',HttpStatus.NOT_FOUND);
      else return res.status(200).json(findedAffords);
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async findOneTask(id: number,res: Response) {
    try {
      const task = await this.taskRepository.findOne({where:{id:id}});
      console.log('sanırım burayı kullandım');
      if(!task) throw new HttpException('Task bulunamadı',HttpStatus.NOT_FOUND);
      else {
        console.log(task);
        return res.status(200).json(task);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async updateTask(id: number, updateTaskDto: UpdateTaskDto,res: Response) {  //24 nisan 2024 te degsiklik yapıldı eski halini kaydetmeyi unuttum
    try {
      const task = await this.taskRepository.findOne({where:{id:id}});
      if(!task) throw new HttpException('Task bulunamadi',HttpStatus.NOT_FOUND);
      else {
        const updateTask = Object.assign(task, updateTaskDto);
        const result = await this.taskRepository.update(id, updateTask);
        console.log(result);
        if(result.affected > 0) return res.status(200).json(result);
        throw new HttpException('Task güncellenmedi',HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async removeTask(id: number,res: Response) {
    try {
      if(!await this.taskRepository.findOne({where:{id:id}})) throw new HttpException('Task bulunamadı',HttpStatus.NOT_FOUND);
      else await this.taskRepository.delete(id);
      return res.status(200).json({message: 'Task silindi'});
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async addUserToTask(task_id: number, user_id: number,res: Response) {
    try {
     await this.validateUserTask(task_id, user_id);
     if(!await this.taskRepository.findOne({where:{id:task_id}})) throw new HttpException('Task bulunamadı',HttpStatus.NOT_FOUND);
      const newTaskUser = await this.taskUsersRepository.create({task_id, user_id});
      const result = await this.taskUsersRepository.save(newTaskUser);
      if(!result) throw new HttpException('Task user eklenemedi',HttpStatus.BAD_REQUEST);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }

  async validateUserTask(task_id: number, user_id: number) {
    try{
    await this.userService.findOneById(user_id);
    const task = await this.taskRepository.findOne({where:{id:task_id}});
    if(!task) throw new HttpException('Task bulunamadı',HttpStatus.NOT_FOUND);
    const checkTaskUserExist = await this.taskUsersRepository.findOne({where:{user_id: user_id}});
    if(checkTaskUserExist) throw new HttpException('Kullanıcı zaten task a ekli',HttpStatus.BAD_REQUEST);
    }
    catch (error){
      throw error
    }
  }
  async createAfford(res: Response, AffordDetails: CreateAffordDto) {
    try {
      const findedAfford = await this.affordRepository.findOne({where:{point:AffordDetails.point}});
      if(findedAfford) {
      throw new HttpException('Afford zaten var',HttpStatus.BAD_REQUEST);
      }
      else {
        const newAfford = await this.affordRepository.create(AffordDetails);
        const result = await this.affordRepository.save(newAfford);
        if(!result) throw new HttpException('Afford eklenemedi',HttpStatus.BAD_REQUEST);
        return res.status(201).json(result);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async updateAfford(id: number,updateAffordDetails: UpdateAffordDto  ,res: Response) { //24 nisan 2024 te degsiklik yapıldı
    try {
      const afford = await this.affordRepository.findOne({ where: { id: id } });
      if (!afford) throw new HttpException('Afford bulunamadı',HttpStatus.NOT_FOUND);
      else {
        const updatedAffordData = Object.assign({}, afford, updateAffordDetails);
        const result = await this.affordRepository.update(id, updatedAffordData);
        console.log(result);
        if (result.affected > 0) return res.status(200).json(result);
        throw new HttpException('Afford updatelenemedi',HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    /*
    try {
      if(!await this.affordRepository.findOne({where:{id:id}})) throw new Error('Afford bulunamadı');
      else {
      const result =  await this.affordRepository.update(id, updateAffordDetails)
      console.log(result)
      if(result.affected > 0) return res.status(200).json(result);
      throw new Error('Afford updatelenemedi');
      }
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
    */
  }
  async removeAfford(id: number,res: Response) {
    try {
      if(!await this.affordRepository.findOne({where:{id:id}})) throw new HttpException('Afford bulunamadı',HttpStatus.NOT_FOUND);
      else await this.affordRepository.delete(id);
      return res.status(200).json({message: 'Afford silindi'});
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async createPriority(res: Response,priorityDetails: CreatePriorityDto ) {
    try {
      const findedPriority = await this.priorityRepository.findOne({where:{name:priorityDetails.name}});
      if(findedPriority) {
      throw new HttpException('Priority zaten var',HttpStatus.BAD_REQUEST);
      }
      else {
        const newPriority = await this.priorityRepository.create(priorityDetails);
        const result = await this.priorityRepository.save(newPriority);
        if(!result) throw new HttpException('Priority eklenemedi',HttpStatus.BAD_REQUEST);
        return res.status(201).json(result);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async updatePriority(id: number, UpdatePriorityDetails: UpdatePriorityDto,res: Response) { //24 nisan 2024 te degsiklik yapıldı
    /*
    try {
      if(!await this.priorityRepository.findOne({where:{id:id}})) throw new Error('Priority bulunamadı');
      else {
      const result =  await this.priorityRepository.update(id, UpdatePriorityDetails)
      console.log(result)
      if(result.affected > 0) return res.status(200).json(result);
      throw new Error('Priority updatelenemedi');
      }
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
    */
   try {
    const priority = await this.priorityRepository.findOne({ where: { id: id } });
    if (!priority) throw new HttpException('Priority bulunamadı',HttpStatus.NOT_FOUND);
    else {
      const updatedPriorityData = Object.assign({}, priority, UpdatePriorityDetails);
      const result = await this.priorityRepository.update(id, updatedPriorityData);
      console.log(result);
      if (result.affected > 0) return res.status(200).json(result);
      throw new HttpException('Priority updatelenemedi',HttpStatus.BAD_REQUEST);
    }
  }
   catch (error) {
    return res.status(500).json({ error: error.message });
   }
  }
  async removePriority(id: number,res: Response) {
    try {
      if(!await this.priorityRepository.findOne({where:{id:id}})) throw new HttpException('Priority bulunamadı',HttpStatus.NOT_FOUND);
      else await this.priorityRepository.delete(id);
      return res.status(200).json({message: 'Priority silindi'});
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
  async getPriorities(res: Response) {
    try {
      const findedPriority = await this.priorityRepository.find();
      if(!findedPriority) throw new HttpException('Priority bulunamadı',HttpStatus.NOT_FOUND);
      else return res.status(200).json(findedPriority);
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  }
}




  // async createPriority(res: Response, name: string) {
  //   try {
  //     const findedPriority = await this.priorityRepository.findOne({where:{name:CreatePriorityDto.name}});
  //     if(findedPriority) {
  //     throw new Error('Priority zaten var');
  //     }
  //     else {
  //       const newPriority = await this.priorityRepository.create(CreatePriorityDto);
  //       const result = await this.priorityRepository.save(newPriority);
  //       return res.status(201).json(result);
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message});
  //   }

  // }

