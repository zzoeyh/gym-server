import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { Equipment } from './equipment.model';

@Module({
  imports: [SequelizeModule.forFeature([Equipment, User])],
  providers: [EquipmentService],
  exports: [EquipmentService],
  controllers: [EquipmentController],
})
export class EquipmentModule {}
