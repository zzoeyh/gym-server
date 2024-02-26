import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { Public } from '../auth/decorators/public.decorator';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public() // 使用 IS_PUBLIC_KEY 装饰器来跳过授权验证
  @Post('register')
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

  @Get('/id/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`用户 ${id} 不存在`);
    }
    return this.usersService.findOne(id);
  }
  @Get('/name/:username')
  async findOneByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException(`用户 ${username} 不存在`);
    }
    return user;
  }
  @Get('/detail/:id')
  async getUserDetail(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserDetail(id);
    if (!user) {
      throw new NotFoundException(`用户 ${id} 不存在`);
    }
    return user;
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
