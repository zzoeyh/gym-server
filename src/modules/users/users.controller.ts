import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
  Put,
  Req,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { Public } from '../auth/decorators/public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('User') // 为控制器类添加标签
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public() // 使用 IS_PUBLIC_KEY 装饰器来跳过授权验证
  @ApiOperation({ summary: '注册' }) // 为方法添加操作介绍
  @ApiBody({ description: '注册' }) // 为请求体添加介绍
  @ApiResponse({
    status: 200,
    description: '注册成功',
  }) // 添加响应介绍
  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    const list = await this.usersService.findAll();

    if (!list) {
      throw new NotFoundException('Item not found');
    }
    return list;
  }

  @Get('/id/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`用户 ${id} 不存在`);
    }
    return this.usersService.findOne(id);
  }
  @Public()
  @Get('/name/:username')
  async findOneByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOneByUsernameExpectPwd(username);
    if (!user) {
      throw new NotFoundException(`用户 ${username} 不存在`);
    }
    return user;
  }
  @Get('/detail')
  async getUserDetail(@Req() request): Promise<User> {
    const user = request.user; // 从请求对象中获取用户信息，包括 createId
    const createId = user.sub; // 获取 createId
    const currentUser = await this.usersService.getUserDetail(createId);
    if (!user) {
      throw new NotFoundException(`用户 ${createId} 不存在`);
    }
    return currentUser;
  }

  @ApiOperation({ summary: 'Update user information' }) // 为方法添加操作介绍
  @ApiBody({ type: CreateUserDto }) // 为请求体添加介绍
  @ApiResponse({
    status: 200,
    description: 'User information updated successfully',
  }) // 添加响应介绍
  @Put('/update/:id') // 使用 PUT 请求来处理更新用户信息
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Get('paginate')
  async paginate(
    @Query('current') current,
    @Query('pageSize') pageSize,
  ): Promise<{ data: User[]; total: number }> {
    const result = await this.usersService.paginate({ current, pageSize });
    return {
      data: result.data,
      total: result.total,
    };
  }
}
