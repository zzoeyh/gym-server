import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { RaceEquipmentService } from './race.equipment.service';
import { RaceEquipmentController } from './race.equipment.controller';
import { RaceEquipment } from './race.equipment.model';

@Module({
  imports: [SequelizeModule.forFeature([RaceEquipment, User])],
  providers: [RaceEquipmentService],
  exports: [RaceEquipmentService],
  controllers: [RaceEquipmentController],
})
export class RaceEquipmentModule {}
