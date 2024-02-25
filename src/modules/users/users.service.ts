import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({
      username: createUserDto.username,
      password: createUserDto.password,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
  findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        username,
      },
    });
  }
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
