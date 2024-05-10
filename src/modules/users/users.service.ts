import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { Role } from '../role/role.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const id = await this.generateUniqueStringId(); // 调用生成函数来设置主键值
    return this.userModel.create({
      id,
      username: createUserDto.username,
      password: createUserDto.password,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
      // attributes: ['id', 'username', 'email'], // 指定要返回的键
    });
  }
  findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        username,
      },
    });
  }

  findOneByUsernameExpectPwd(username: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        username,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'], // 显式排除 createdAt 和 updatedAt 字段
      },
    });
  }
  /**
   * 查询detail
   **/
  getUserDetail(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
      include: Role,
      attributes: {
        exclude: ['createdAt', 'updatedAt'], // 显式排除 createdAt 和 updatedAt 字段
      },
    });
  }

  async update(id: string, updatedUser: CreateUserDto): Promise<void> {
    try {
      await this.userModel.update(updatedUser, {
        where: {
          id,
        },
      });
    } catch (error) {
      // 在这里可以根据具体情况抛出自定义的异常
      throw new NotFoundException('更新用户信息失败,请检查输入的字段');
    }
  }
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
  /**
   * 生成唯一的字符串 ID 的函数
   * */
  async generateUniqueStringId(): Promise<string> {
    const userList = await this.findAll();
    if (!userList.length) {
      return String(202111701112);
    } else {
      return String(Number(userList[userList.length - 1].id) + 1);
    }
  }
  async paginate({
    current = 1,
    pageSize = 10,
  }): Promise<{ data: User[]; total: number }> {
    const offset = (current - 1) * pageSize;
    const limit = pageSize * 1;

    const { count, rows } = await this.userModel.findAndCountAll({
      offset,
      limit,
    });

    return {
      data: rows,
      total: count,
    };
  }
}
