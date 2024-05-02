import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRaceEquipmentDto } from './dto/race.equipment.dto';
import { RaceEquipment } from './race.equipment.model';

@Injectable()
export class RaceEquipmentService {
  constructor(
    @InjectModel(RaceEquipment)
    private readonly raceEquipmentModel: typeof RaceEquipment,
  ) {}

  async create(createRaceEqDto: CreateRaceEquipmentDto): Promise<number> {
    let lastGroupId = 0;

    await this.raceEquipmentModel
      .findOne({
        order: [['createdAt', 'DESC']],
        attributes: ['groupId'], // 按 createdAt 字段降序排序
      })
      .then((lastRecord) => {
        console.log(lastRecord, lastGroupId);
        if (lastRecord) {
          lastGroupId = lastRecord.groupId;
        }
      });
    lastGroupId++; // 递增最后 groupid

    for (let i = 0; i < createRaceEqDto.eid.length; i++) {
      try {
        await this.raceEquipmentModel.create({
          eid: createRaceEqDto.eid[i],
          groupId: lastGroupId,
          createId: createRaceEqDto.createId,
        });
      } catch (error) {
        throw new NotFoundException('error');
      }
    }
    return lastGroupId;
  }

  async findAll(): Promise<RaceEquipment[]> {
    return this.raceEquipmentModel.findAll();
  }

  findOne(id: number): Promise<RaceEquipment> {
    return this.raceEquipmentModel.findOne({
      where: {
        id,
      },
      // include: User,
    });
  }
  findOneByName(name: string): Promise<RaceEquipment> {
    return this.raceEquipmentModel.findOne({
      where: {
        name,
      },
    });
  }
  async remove(id: number): Promise<void> {
    const RaceEquipment = await this.findOne(id);
    await RaceEquipment.destroy();
  }
}
