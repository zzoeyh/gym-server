import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserEquipmentDto } from './dto/create-user-equipment.dto';
import { UserEquipment } from './user.equipment.model';
import { Equipment } from '../equipment/equipment.model';
@Injectable()
export class UserEquipmentService {
  constructor(
    @InjectModel(UserEquipment)
    private readonly userEquipmentModel: typeof UserEquipment,
  ) {}
  create(createUserEqDto: CreateUserEquipmentDto): Promise<UserEquipment> {
    return this.userEquipmentModel.create({
      eid: createUserEqDto.eid,
      borrow: createUserEqDto.borrow,
      damage: 0,
      createId: createUserEqDto.createId,
      status: 1,
    });
  }

  async findAll(): Promise<UserEquipment[]> {
    return this.userEquipmentModel.findAll();
  }

  findOne(id: number): Promise<UserEquipment> {
    return this.userEquipmentModel.findOne({
      where: {
        id,
      },
      // include: User,
    });
  }
  findOneByName(name: string): Promise<UserEquipment> {
    return this.userEquipmentModel.findOne({
      where: {
        name,
      },
    });
  }
  async remove(id: number): Promise<void> {
    const UserEquipment = await this.findOne(id);
    await UserEquipment.destroy();
  }
  /**
   * 归还
   * @param eid
   */
  async cancelBook({
    id,
    damage,
  }: {
    id: number;
    damage: number;
  }): Promise<void> {
    try {
      const UserEquipment = await this.userEquipmentModel.findByPk(id); // 根据 id 查找对应的记录
      if (UserEquipment) {
        UserEquipment.borrow = 0; // 将 status 字段改为 0
        UserEquipment.damage = damage;
        UserEquipment.status = 0;
        await UserEquipment.save(); // 保存修改后的记录
        console.log('Successfully updated status.'); // 输出成功信息
      } else {
        throw new NotFoundException(`UserEquipment not found`); // 输出未找到信息
      }
    } catch (error) {
      console.error('Error updating status:', error); // 输出错误信息
    }
  }

  async paginateUserBookEquipment({
    createId,
    current = 1,
    pageSize = 10,
  }): Promise<{ data: UserEquipment[]; total: number }> {
    try {
      const offset = (current - 1) * pageSize;
      const limit = pageSize * 1;

      const { count, rows } = await this.userEquipmentModel.findAndCountAll({
        where: {
          createId,
        },
        include: [
          {
            model: Equipment,
            attributes: ['name'],
            as: 'equipment',
          },
        ],
        offset,
        limit,
      });

      return {
        data: rows,
        total: count,
      };
    } catch (error) {
      // 在这里可以根据具体情况抛出自定义的异常
      throw new Error('分页查询预定场地数据失败');
    }
  }
}
