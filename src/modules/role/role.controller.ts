import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';
import { RoleService } from './role.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }
  @Public()
  @Get()
  findAll(): Promise<Role[]> {
    const errorCondition = true;

    if (errorCondition) {
      throw new NotFoundException('Item not found');
    }
    return this.roleService.findAll();
  }

  @Get('/get/:id')
  async findOne(@Param('id') id: string): Promise<Role> {
    const role = await this.roleService.findOne(id);
    if (!role) {
      throw new NotFoundException(`角色不存在`);
    }
    return this.roleService.findOne(id);
  }
  @Get(':name')
  async findOneByName(@Param('name') name: string): Promise<Role> {
    const role = await this.roleService.findOneByName(name);
    if (!role) {
      throw new NotFoundException(`角色 ${name} 不存在`);
    }
    return this.roleService.findOneByName(name);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.roleService.remove(id);
  }
}
