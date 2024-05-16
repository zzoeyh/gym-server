import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRaceDto } from './dto/race.dto';
import { Race } from './race.model';

@Injectable()
export class RaceService {
  constructor(
    @InjectModel(Race)
    private readonly raceModel: typeof Race,
  ) {}

  create(createRaceDto: CreateRaceDto): Promise<Race> {
    return this.raceModel.create({
      title: createRaceDto.title,
      description: createRaceDto.description,
      createId: createRaceDto.createId,
      beginAt: createRaceDto.beginAt,
      endAt: createRaceDto.endAt,
      vid: createRaceDto.vid,
      reid: createRaceDto.reid,
      umpireId: createRaceDto.umpireId,
      status: 0,
    });
  }

  async findAll(): Promise<Race[]> {
    return this.raceModel.findAll();
  }

  findOne(id: number): Promise<Race> {
    return this.raceModel.findOne({
      where: {
        id,
      },
      // include: User,
    });
  }
  findOneByName(name: string): Promise<Race> {
    return this.raceModel.findOne({
      where: {
        name,
      },
    });
  }
  async remove(id: number): Promise<void> {
    const Race = await this.findOne(id);
    await Race.destroy();
  }
  //取消赛事<不删除记录>
  async cancelBook(id: number): Promise<void> {
    try {
      const race = await this.raceModel.findByPk(id); // 根据 id 查找对应的记录
      if (race) {
        race.status = 0; // 将 status 字段改为 0
        await race.save(); // 保存修改后的记录
        console.log('Successfully updated status.'); // 输出成功信息
      } else {
        throw new NotFoundException(`UserVenue not found`); // 输出未找到信息
      }
    } catch (error) {
      console.error('Error updating status:', error); // 输出错误信息
    }
  }

  //修改
  async update(id: number, updatedRace: CreateRaceDto): Promise<void> {
    try {
      await this.raceModel.update(updatedRace, {
        where: {
          id,
        },
      });
    } catch (error) {
      // 在这里可以根据具体情况抛出自定义的异常
      throw new NotFoundException('更新用户信息失败,请检查输入的字段');
    }
  }

  async paginate({
    current = 1,
    pageSize = 10,
  }): Promise<{ data: Race[]; total: number }> {
    const offset = (current - 1) * pageSize;
    const limit = pageSize * 1;

    const { count, rows } = await this.raceModel.findAndCountAll({
      offset,
      limit,
    });

    return {
      data: rows,
      total: count,
    };
  }

  async paginateForUser({
    current = 1,
    pageSize = 10,
    id,
  }): Promise<{ data: Race[]; total: number }> {
    const offset = (current - 1) * pageSize;
    const limit = pageSize * 1;

    const { count, rows } = await this.raceModel.findAndCountAll({
      offset,
      limit,
      where: {
        id,
      },
    });

    return {
      data: rows,
      total: count,
    };
  }
}
