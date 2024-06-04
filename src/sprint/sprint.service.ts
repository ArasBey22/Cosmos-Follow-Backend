import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sprint } from './entities/sprint.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { Task } from '../task/entities/task.entity';
import { Response } from 'express';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Retro } from '../task/entities/retro.entity';

@Injectable()
export class SprintService {
  constructor(
    @InjectRepository(Sprint) private sprintRepository: Repository<Sprint>,
    @InjectRepository(Status) private statusRepository: Repository<Status>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Retro) private retroRepository: Repository<Retro>,
  ) {}

  async create(sprintDetails: CreateSprintDto, res: Response) {
    try {
      const findedSprint = await this.sprintRepository.findOne({where:{name:sprintDetails.name}})
      if(findedSprint) throw new HttpException('Sprint zaten var',HttpStatus.BAD_REQUEST)
      else {
        const newSprint = await this.sprintRepository.create(sprintDetails);
        const result = await this.sprintRepository.save(newSprint);
        if(!result) throw new HttpException('Sprint oluşturulamadı',HttpStatus.BAD_REQUEST)
        return res.status(201).json(result);
        }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async createStatus(statusDetails: CreateStatusDto, res: Response) {
    try {
      const findedStatus = await this.statusRepository.findOne({where:{name:statusDetails.name}})
      if(findedStatus) throw new HttpException('Status zaten var',HttpStatus.BAD_REQUEST)
      else {
        const newStatus = await this.statusRepository.create(statusDetails);
        const result = await this.statusRepository.save(newStatus);
        if(!result) throw new HttpException('Status oluşturulamadı',HttpStatus.BAD_REQUEST)
        return res.status(201).json(result);
        }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async findAllSprints(res) {
    try {
      const findedSprints = await this.sprintRepository.find();
      if(!findedSprints) throw new HttpException('Sprint bulunamadı',HttpStatus.NOT_FOUND);
      else {
        return res.status(200).json(findedSprints);
      }
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

 async findAllRetros(res) {
    try {
      const findedRetros = await this.retroRepository.find();
      if(!findedRetros) throw new HttpException('Retro bulunamadı',HttpStatus.NOT_FOUND);
      else {
        return res.status(200).json(findedRetros);
      }
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findAllStatus(res) {
    try {
      const findedStatus = await this.statusRepository.find();
      if(!findedStatus) throw new HttpException('Status bulunamadı',HttpStatus.NOT_FOUND);
      else {
        return res.status(200).json(findedStatus);
      }
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async findOneById(id: number) {
   try {
    const findedSprint = await this.sprintRepository.findOne({where:{id:id}});
    console.log(findedSprint);
    if(!findedSprint) throw new HttpException('Sprint bulunamadı',HttpStatus.NOT_FOUND);
    return {findedSprint};
   } catch (error) {
     throw error;
   }
  }

  async update(id: number, updateSprintDto: UpdateSprintDto,res: Response) {
    /* 24 nisan 2024 tarihinde degistirildi
    try {
      const findedSprint = await this.sprintRepository.findOne({where:{id:id}});
      if(!findedSprint) throw new Error('Sprint bulunamadı');
      else {
        const result = await this.sprintRepository.update(id, updateSprintDto);
        console.log(result);
        if(result.affected > 0) return res.status(200).json(result);
        throw new Error('Sprint bilgileri aynı');
      }
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
    */
    try {
      const foundSprint = await this.sprintRepository.findOne({ where: { id: id } });
      if (!foundSprint) throw new HttpException('Sprint bulunamadı', HttpStatus.NOT_FOUND);
      
      const updatedSprint = { ...foundSprint, ...updateSprintDto }; // Mevcut sprint'in özelliklerini koruyarak güncelleme verisi oluştur
    
      const result = await this.sprintRepository.update(id, updatedSprint);
      console.log(result);
    
      if (result.affected > 0) return res.status(200).json(result);
      throw new HttpException('Sprint bilgileri aynı', HttpStatus.BAD_REQUEST);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }    
  }
  async updateStatus(id: number, updateStatusDto: UpdateStatusDto,res: Response) {
    try {
      const findedStatus = await this.statusRepository.findOne({where:{id:id}});
      if(!findedStatus) throw new HttpException('Status bulunamadı',HttpStatus.NOT_FOUND);
      else {
        const result = await this.statusRepository.update(id, updateStatusDto);
        console.log(result);
        if(result.affected > 0) return res.status(200).json(result);
        throw new HttpException('Status bilgileri aynı',HttpStatus.BAD_REQUEST);
      }
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async remove(id: number,res: Response) {
   try {
      const findedSprint = await this.sprintRepository.findOne({where:{id:id}});
      if(!findedSprint) throw new HttpException('Sprint bulunamadı',HttpStatus.NOT_FOUND);
      else {
        return res.status(200).json(await this.sprintRepository.delete({id}));
      }
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
   }
  }
  async removeStatus(id: number,res: Response) {
    try {
       const findedStatus = await this.statusRepository.findOne({where:{id:id}});
       if(!findedStatus) throw new HttpException('Status bulunamadı',HttpStatus.NOT_FOUND);
       else {
         return res.status(200).json(await this.statusRepository.delete({id}));
       }
     }
     catch (error) {
       return res.status(500).json({ error: error.message });
    } 
   }
  async add_sprint_to_retro_table(res: Response)  { // 25 nisan 2024 tarihinde yapıldı
    try {
      const currentDateTime = new Date();
      const findedSprintss = await this.sprintRepository.find({where: {end_at: LessThanOrEqual(currentDateTime)}}); // sprint tablosundan bitiş tarihi geçmiş sprintleri getir
      console.log(findedSprintss);
      if(!findedSprintss) {
        console.log('girdimi1')
        throw new HttpException('Sprint bulunamadı',HttpStatus.NOT_FOUND);
      }
      else {
        console.log('girdimi2')
        for (const sprint of findedSprintss) {
                const findInRetro = await this.retroRepository.findOne({ where: { id: sprint.id } });
                console.log('girdimi3')
                if (!findInRetro) {
                  console.log('girdimi4')
                  console.log(sprint.id)
                    // Eğer sprint retro tablosunda bulunamadıysa, ekle
                    const newRetroItem = this.retroRepository.create({ task_id: sprint.id });
                    await this.retroRepository.save(newRetroItem);
                    if(!newRetroItem) throw new HttpException('Retro tablosuna eklenemedi',HttpStatus.BAD_REQUEST);
                }
          }
            return res.status(200).json({ message: 'Sprintler retro tablosuna eklendi' });
      }
    } catch (error) {
        return res.status(500).json({ error: error.message });
      }
  }
  async findRetro(res: Response) { //25 nisan 2024 tarihinde yapıldı
    try {
      const findedRetross = await this.retroRepository.find();
      if (!findedRetross) throw new HttpException('Retro bulunamadı', HttpStatus.NOT_FOUND);
      return res.status(200).json(findedRetross);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  //25 nisan 2024 tarihinde yapıldı
  async addUnfinishedTasksToRetro(res: Response) {
    try {

        const currentDateTime = new Date(); // Süresi geçmiş sprintleri bul
        
        const expiredSprints = await this.sprintRepository.find
        ({

            where: { end_at: LessThanOrEqual(currentDateTime) },
            relations: ['tasks']  // tasks ilişkisini de çek

        });

        if (!expiredSprints) {

            throw new HttpException('Süresi geçmiş sprint bulunamadı.', HttpStatus.NOT_FOUND);

        } else {

          // süresi geçmis sprintlerin tasklarını retro tablosuna ekle eger task bitmemisse
          // task tablosundan is_finished false olmalı ve sprint_id'si expiredSprints içindeki sprintlerden biri olmalı

          console.log('girdimi1')

          const unfinishedTasks = await this.taskRepository.find({ where: { is_finished: false } });

          console.log('girdimi2')

          console.log(unfinishedTasks)

          if(!unfinishedTasks) throw new HttpException('Tamamlanmamış task bulunamadı.', HttpStatus.NOT_FOUND);

            else { //bu unfinished tasklar expired sprintlerin tasklarından biri olmalı ve retro tablosunda olmamalı sonra retro tablosuna eklenmeli

              console.log('girdimi3')

              for (const task of unfinishedTasks) {

                console.log('girdimi4')
                console.log("task = ", task.id)
                const findInRetro = await this.retroRepository.findOne({ 
                  where: { task_id: task.id },
                  relations: {
                    task : true
                  } // ilişkili task verilerini de çek
                });

                console.log(findInRetro)

                if(!findInRetro) {

                  const newRetroItem = this.retroRepository.create({ task_id: task.id });

                  const result = await this.retroRepository.save(newRetroItem);

                  if(!result) throw new HttpException('Retro tablosuna eklenemedi.', HttpStatus.BAD_REQUEST);

                }
            }
          }
        }
        return res.status(200).json({ message: 'Tamamlanmamış tasklar retro tablosuna eklendi' });
      } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
// buradan devam et
/*async addUnfinishedTasksToRetro(res: Response) {
  try {
    const date = new Date(); // Şu anki tarih
    const expiredSprints = await this.sprintRepository.find({
      where: { end_at: LessThanOrEqual(date) }, // Süresi geçmiş sprintleri bul
      relations: ['tasks'], // tasks ilişkisini de çek
    });
    if (!expiredSprints.length) { // Süresi geçmiş sprint bulunamadıysa
      throw new Error('Süresi geçmiş sprint bulunamadı.');
    }
    for (const sprint of expiredSprints) { // Süresi geçmiş sprintleri dön
      for (const task of sprint.tasks) { // Sprint'in tasklarını dön
        if (!task.is_finished) { // Task bitmemişse
          const findInRetro = await this.retroRepository.findOne({ where: { task_id: task.id } }); // Retro tablosunda task var mı kontrol et
          if (!findInRetro) { // Retro tablosunda yoksa ekle
            const newRetroItem = this.retroRepository.create({ task_id: task.id }); 
            await this.retroRepository.save(newRetroItem); // Retro tablosuna ekle
            if (!newRetroItem) {
              throw new Error('Retro tablosuna eklenemedi.');
            }
          }
        }
      }
    }
    return res.status(200).json({ message: 'Tamamlanmamış tasklar retro tablosuna eklendi' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
*/

  async removeRetro(id: number,res: Response) { // 25 nisan 2024 tarihinde yapıldı
    try {
        const findedRetro = await this.retroRepository.findOne({where:{id:id}});
        if(!findedRetro) throw new HttpException('Retro bulunamadı',HttpStatus.NOT_FOUND);
        else {
          return res.status(200).json(await this.retroRepository.delete({id}));
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
    }
  }
}