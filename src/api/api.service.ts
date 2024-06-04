import { HttpException, HttpStatus, INestApplication, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { Api } from './entities/api.entity';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Api)
    private apiRepository: Repository<Api>,
  ) {}
  async findAll(res: Response) {
    try {
      const findedApis = await this.apiRepository.find();
      if (!findedApis) {
        throw new HttpException('Api not found',HttpStatus.NOT_FOUND);
      }
      return res.status(200).json(findedApis);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async syncApis(app: INestApplication) {
    const routes = await this.extractRoutes(app);
    const apis = await this.apiRepository.find();

    const routesToCreate = routes.filter(route => !apis.some(api => this.compareRoutes(api, route))); 
    const routesToDelete = apis.filter(api => !routes.some(route => this.compareRoutes(api, route)));

    if (routesToDelete.length > 0) {
        console.log("Veritabanında bulunan fakat uygulamada bulunmayan API'ler bulundu ve başarı ile veritabanından kaldırıldı.");
        console.log("Veritabanından kaldırılan API'ler :: ", routesToDelete);
        await this.apiRepository.remove(routesToDelete);
    }

    if (routesToCreate.length > 0) {
        console.log("Yeni API'ler bulundu ve başarı ile veritabanına kaydedildi.");
        console.log("Yeni eklenen API'ler :: ", routesToCreate);
        await this.apiRepository.save(routesToCreate);
    } else {
        console.log("Veritabanı ve Uygulamadaki API'ler Güncel");
    }
  }
  private compareRoutes(route1: { path: string, method: string }, route2: { path: string, method: string }) { // iki apiyi karşılaştırır
    return route1.path === route2.path && route1.method === route2.method;
  }
  async extractRoutes(app: INestApplication) { // uygulamadaki apileri listeler
    const server = await app.getHttpAdapter().getInstance();
    const router = server._router;
    const stack = router.stack;

    return router.stack
        .filter(layer => layer.route && !layer.route.path.includes('swagger')) // swagger apilerini almamak için
        .map(layer => ({
            path: layer.route.path,
            method: layer.route.stack[0].method
        }));
  }
}
