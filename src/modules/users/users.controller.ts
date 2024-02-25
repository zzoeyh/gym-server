import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    const errorCondition = true;

    if (errorCondition) {
      throw new NotFoundException('Item not found');
    }
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`用户 ${id} 不存在`);
    }
    return this.usersService.findOne(id);
  }
  @Get(':username')
  async findOneByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException(`用户 ${username} 不存在`);
    }
    return this.usersService.findOneByUsername(username);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
