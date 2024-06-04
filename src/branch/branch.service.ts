import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateBranchDto } from './dto/create_branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';
import { BranchSub } from './entities/branch_sub.entity';
import { BranchUsers } from './entities/branch_users.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)private branchRepository: Repository<Branch>,
    @InjectRepository(BranchUsers)private branchUsersRepository: Repository<BranchUsers>,
    private userService: UsersService,
    @InjectRepository(BranchSub)private branchSubRepository: Repository<BranchSub>,
  ) {}
  
  async findAll(res: Response) {
    try {
      const branches = await this.branchRepository.find();
      if (!branches) throw new HttpException('Branch not found',HttpStatus.NOT_FOUND);
      return res.status(200).json(branches);
    } catch (error) {
      res.status(500).json({ error: error.message})
    }
  }
  /*async GetAllBranches() {
    try {
      const branches = await this.branchRepository.find();
      if (!branches) throw new Error('Branch not found');
      return branches.branch_subs;
    } catch (error) {
      throw new Error(error.message)
    }
  }*/
  async findOne(id: number,res: Response) {
    try {
      const branch = await this.branchRepository.findOne({ where: { id: id } });
      if (!branch) throw new HttpException('Branch not found',HttpStatus.NOT_FOUND);
      return res.status(200).json(branch);
    } catch (error) {
      res.status(500).json({ error: error.message})
    }
  }
  async findAllSubBranches(res: Response) {
    try {
      const branchSub = await this.branchSubRepository.find()
      if (!branchSub) throw new  HttpException('Branch sub not found',HttpStatus.NOT_FOUND);
      return res.status(200).json(branchSub);
    } catch (error) {
      res.status(500).json({ error: error.message})
    }
  }

  async create(BranchDetails: CreateBranchDto, res: Response) {
    try {
      const findbranch = await this.branchRepository.findOne({ where: { name: BranchDetails.name } });
      if (findbranch) {
        throw new Error('Branch already exists');
      } else {
        const newBranch = await this.branchRepository.create(BranchDetails);
        const savedBranch = await this.branchRepository.save(newBranch);
        if (BranchDetails.head_branch_id) {
          const findHeadBranch = await this.branchRepository.findOne({ where: { id: BranchDetails.head_branch_id } });
          if (!findHeadBranch) {
            throw new HttpException('Head branch not found',HttpStatus.NOT_FOUND); //response dönülecek
          } 
          const branchSub = this.branchSubRepository.create({
            head_branch_id: BranchDetails.head_branch_id,
            sub_branch_id: savedBranch.id,
          });
          if (!branchSub) {
            throw new HttpException('Branch sub not created',HttpStatus.NOT_FOUND);
          }
          await this.branchSubRepository.save(branchSub);
        }
        return res.status(201).json(savedBranch);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //24 nisan 2024 te bu fonksiyonda değisiklik yatım
  async update(id: number, updateBranchDto: UpdateBranchDto, res: Response) {
    try {
      const branch = await this.branchRepository.findOne({ where: { id: id } });
      if (!branch) throw new HttpException('Branch not found',HttpStatus.NOT_FOUND);
      else {
        const updatedBranchData = Object.assign({}, branch, updateBranchDto);
        const updatedBranch = await this.branchRepository.update(id, updatedBranchData);
        if (!updatedBranch) {
          throw new HttpException('Branch not updated',HttpStatus.NOT_FOUND);
        }
        console.log('Branch updated');
        return res.status(200).json(updatedBranch);
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
    
  async removeSubBranch(id: number,res: Response) {
    try {
      const branchSub = await this.branchSubRepository.findOne({ where: { id } });
      if (!branchSub) throw new HttpException('Branch sub not found',HttpStatus.NOT_FOUND);
      else {
        const deletedBranchSub = await this.branchSubRepository.delete({ id });
        if(deletedBranchSub.affected > 0) 
        console.log('branch sub deleted');
        else throw new HttpException('Branch sub not deleted',HttpStatus.NOT_FOUND);
        return res.status(200).json(deletedBranchSub);
      }
    } catch (error) {
      res.status(500).json({ error: error.message})
    }
  }
  async remove(id: number,res: Response) {
    try {
      const branch = await this.branchRepository.findOne({ where: { id: id } });
      if (!branch) throw new HttpException('Branch not found',HttpStatus.NOT_FOUND);
      else {
        const deletedBranch = await this.branchRepository.delete({ id });
        if(deletedBranch.affected > 0)
        console.log('branch deleted');
        else throw new HttpException('Branch not deleted',HttpStatus.NOT_FOUND);
        return res.status(200).json(deletedBranch);
      }
    } catch (error) {
      res.status(500).json({ error: error.message})
    }
  }
  async addUsersToBranch(branch_id: number, user_id: number,res: Response) {
    try {
      await this.validateUserBranch(branch_id, user_id);
      if (!branch_id || !user_id) throw new HttpException('Branch id or user id not found',HttpStatus.NOT_FOUND);
      const newBranchUser = await this.branchUsersRepository.create({ branch_id, user_id });
      const result = await this.branchUsersRepository.save(newBranchUser);
      if (!result) throw new HttpException('Branch user not created',HttpStatus.INTERNAL_SERVER_ERROR);
      return res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message})
    }
  }
  async findallBranchUsers(res: Response) {
    try {
      const branchUsers = await this.branchUsersRepository.find();
      if (!branchUsers) throw new HttpException('Branch users not found',HttpStatus.NOT_FOUND);
      return res.status(200).json(branchUsers);
    } catch (error) {
      res.status(500).json({ error: error.message})
    }
  }
  async validateUserBranch(branch_id: number, user_id: number) {
    const existUser = await this.userService.findOneById(user_id);
    if (!existUser) throw new HttpException('User not found',HttpStatus.NOT_FOUND);
    const existBranch = await this.branchRepository.findOne({ where: { id: branch_id } });
    if (!existBranch) throw new HttpException('Branch not found',HttpStatus.NOT_FOUND);
    const existBranchUser = await this.branchUsersRepository.findOne({ where: { branch_id, user_id } });
    if (existBranchUser) throw new HttpException('User already in branch',HttpStatus.BAD_REQUEST);
  }
  async removeUserFromBranch(id: number,res: Response) {
    try {
      const branchUser = await this.branchUsersRepository.findOne({ where: { id } });
      console.log(branchUser)
      if (!branchUser) throw new HttpException('Branch user not found',HttpStatus.NOT_FOUND);
      else {
        const deletedBranchUser = await this.branchUsersRepository.delete({ id });
        if(deletedBranchUser.affected > 0) console.log('branch user deleted');
        else console.log('branch user not deleted');
        return res.status(200).json(deletedBranchUser);
      }
    } catch (error) {
      res.status(500).json({ error: error.message})
    }
  }  

  

  async findAllBranches(res: Response) {
    try {
      // Tüm ana dalları bul
      const mainBranches = await this.branchRepository.find({ relations: ["branch_subs", "branch_subs.sub_branch"] });
  
      // Ana dalları ve onların alt dallarını içeren bir ağaç oluştur
      const tree = mainBranches
        .filter(mainBranch => mainBranch.branch_subs.length > 0) // Hiç alt dala sahip olmayan ana dalları filtrele
        .map(mainBranch => ({
          id: mainBranch.id,
          name: mainBranch.name,
          description: mainBranch.description,
          created_at: mainBranch.created_at,
          sub_branches: mainBranch.branch_subs.map(branchSub => ({
            id: branchSub.sub_branch.id,
            name: branchSub.sub_branch.name,
            description: branchSub.sub_branch.description,
            created_at: branchSub.sub_branch.created_at
          }))
        }));
  
      return res.status(200).json(tree);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  



  
}
