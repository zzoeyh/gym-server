import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { Race } from './race.model';
import { RaceEquipment } from '../race.equipment/race.equipment.model';
import { RaceEquipmentService } from '../race.equipment/race.equipment.service';

@Module({
  imports: [SequelizeModule.forFeature([Race, User, RaceEquipment])],
  providers: [RaceService, RaceEquipmentService],
  exports: [RaceService],
  controllers: [RaceController],
})
export class RaceModule {}
