import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';
import { User } from '../users/user.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleModel.create({
      name: createRoleDto.name,
      description: createRoleDto.description,
    });
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll();
  }

  findOne(id: number): Promise<Role> {
    return this.roleModel.findOne({
      where: {
        id,
      },
      include: User,
    });
  }
  findOneByName(name: string): Promise<Role> {
    return this.roleModel.findOne({
      where: {
        name,
      },
    });
  }
  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await role.destroy();
  }
}
