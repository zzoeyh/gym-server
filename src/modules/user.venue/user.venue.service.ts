import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateUserVenueDto,
  UserVenueWeekDto,
} from './dto/create-user-venue.dto';
import { UserVenue } from './user.venue.model';
import { Op } from 'sequelize';

@Injectable()
export class UserVenueService {
  constructor(
    @InjectModel(UserVenue)
    private readonly userVenueModel: typeof UserVenue,
  ) {}

  create(createUserVenueDto: CreateUserVenueDto): Promise<UserVenue> {
    return this.userVenueModel.create({
      vid: createUserVenueDto.vid,
      beginAt: createUserVenueDto.beginAt,
      endAt: createUserVenueDto.endAt,
      type: createUserVenueDto.type,
      createId: createUserVenueDto.createId,
      status: 0,
    });
  }

  async findAll(): Promise<UserVenue[]> {
    return this.userVenueModel.findAll();
  }

  findOne(id: number): Promise<UserVenue> {
    return this.userVenueModel.findOne({
      where: {
        id,
      },
      // include: User,
    });
  }
  findOneByName(name: string): Promise<UserVenue> {
    return this.userVenueModel.findOne({
      where: {
        name,
      },
    });
  }
  async remove(id: number): Promise<void> {
    const userVenue = await this.findOne(id);
    await userVenue.destroy();
  }
  /**
   * 查询指定日期范围内的用户场地信息
   * @param startDate 开始日期
   * @param endDate 结束日期
   */
  async findUserVenuesByDateRange(
    userVenueWeekDto: UserVenueWeekDto,
  ): Promise<UserVenue[]> {
    return this.userVenueModel.findAll({
      where: {
        beginAt: {
          [Op.gte]: userVenueWeekDto.startDate, // 大于或等于开始日期
        },
        endAt: {
          [Op.lte]: userVenueWeekDto.endDate, // 小于或等于结束日期
        },
      },
      attributes: ['creatId', 'vid', 'beginAt', 'endAt', 'status'], // 选择要返回的字段
    });
  }

  /**
   * 退订场地
   * @param vid
   */
  async cancelBook(id: number): Promise<void> {
    try {
      const userVenue = await this.userVenueModel.findByPk(id); // 根据 id 查找对应的记录
      if (userVenue) {
        userVenue.status = 0; // 将 status 字段改为 0
        await userVenue.save(); // 保存修改后的记录
        console.log('Successfully updated status.'); // 输出成功信息
      } else {
        throw new NotFoundException(`UserVenue not found`); // 输出未找到信息
      }
    } catch (error) {
      console.error('Error updating status:', error); // 输出错误信息
    }
  }
}
