import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Api } from 'src/api/entities/api.entity';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {

  constructor(
    @InjectRepository(Api) private apiRepository: Repository<Api>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>
) {}
  async assignAdminPermissions() {
    // Admin rolünü bul
    const adminRole = await this.roleRepository.findOne({ where: { name: 'ADMIN' } });
    if (!adminRole) {
        console.error('Admin role not found!');
        return;
    }

    // Tüm API'leri al
    const apis = await this.apiRepository.find();
    //console.log('tüm apiler',apis)  //console log ile terminalde çok fazla veri gösteriyor bu yüzden yorum satırına aldım

    // Her API için Admin izinlerini ata
    for (const api of apis) {
        const permissionExists = await this.permissionRepository.findOne({
            where: { role: adminRole, api: api }
        });

        if (!permissionExists) {
            const permission = this.permissionRepository.create({
                role: adminRole,
                api: api
            });
            await this.permissionRepository.save(permission);
        }
    }
    console.log('Admin permissions assigned successfully.');
}
}
