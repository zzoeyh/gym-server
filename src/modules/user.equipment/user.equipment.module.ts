import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { UserEquipmentService } from './user.equipment.service';
import { UserEquipmentController } from './user.equipment.controller';
import { UserEquipment } from './user.equipment.model';

@Module({
  imports: [SequelizeModule.forFeature([UserEquipment, User])],
  providers: [UserEquipmentService],
  exports: [UserEquipmentService],
  controllers: [UserEquipmentController],
})
export class UserEquipmentModule {}
