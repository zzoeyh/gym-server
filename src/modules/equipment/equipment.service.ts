import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEquipmentDto, RepairDto } from './dto/create-equipment.dto';
import { Equipment } from './equipment.model';
import { Op } from 'sequelize';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment)
    private readonly equipmentModel: typeof Equipment,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    const eq = await this.findOneByName(createEquipmentDto.name);
    if (eq) {
      throw new HttpException('已有该器材，请重新创建', 201);
    } else {
      return this.equipmentModel.create({
        name: createEquipmentDto.name,
        createId: createEquipmentDto.createId,
        parentId: createEquipmentDto.parentId,
        total: createEquipmentDto.total || 0,
        available: createEquipmentDto.total || 0,
        price: createEquipmentDto.price || 0,
      });
    }
  }

  async findAll(): Promise<Equipment[]> {
    return this.equipmentModel.findAll({
      where: {
        parentId: {
          [Op.ne]: 0, // 排除 parentId 为 0 的数据
        },
      },
    });
  }

  findOne(id: number): Promise<Equipment> {
    return this.equipmentModel.findOne({
      where: {
        id,
      },
      // include: User,
    });
  }
  findOneByName(name: string): Promise<Equipment> {
    return this.equipmentModel.findOne({
      where: {
        name,
      },
    });
  }
  async remove(id: number): Promise<void> {
    const equipment = await this.findOne(id);
    await equipment.destroy();
  }

  /**
   * 报修 减少available,增加damage
   */
  async repair(repairDto: RepairDto): Promise<void> {
    try {
      const eq = await this.equipmentModel.findByPk(repairDto.id);
      if (eq) {
        eq.damage = repairDto.damage;
        eq.available = eq.total - eq.damage;
        await eq.save();
      } else {
        throw new NotFoundException('Equipment Not Found');
      }
    } catch (error) {
      throw new NotFoundException('Equipment Not Found');
    }
  }
  /**
   * 查询父级的equipment
   *
   */
  async getParentEquipment(): Promise<Equipment[]> {
    return this.equipmentModel.findAll({
      where: {
        parentId: 0,
      },
    });
  }

  /**
   * 修改
   * */
  async update(
    id: number,
    updatedEquipment: CreateEquipmentDto,
  ): Promise<void> {
    try {
      await this.equipmentModel.update(updatedEquipment, {
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
  }): Promise<{ data: Equipment[]; total: number }> {
    const offset = (current - 1) * pageSize;
    const limit = pageSize * 1;

    const { count, rows } = await this.equipmentModel.findAndCountAll({
      where: {
        parentId: {
          [Op.ne]: 0, // 排除 parentId 为 0 的数据
        },
      },
      offset,
      limit,
    });

    return {
      data: rows,
      total: count,
    };
  }
}
