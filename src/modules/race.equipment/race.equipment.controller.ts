import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  // NotFoundException,
} from '@nestjs/common';
import { CreateRaceEquipmentDto } from './dto/race.equipment.dto';
import { RaceEquipment } from './race.equipment.model';
import { RaceEquipmentService } from './race.equipment.service';

@Controller('race/equipment')
export class RaceEquipmentController {
  constructor(private readonly raceService: RaceEquipmentService) {}

  @Post('create')
  create(
    @Body() createRaceEquipmentDto: CreateRaceEquipmentDto,
  ): Promise<number> {
    // 将 createId 添加到 createVenueDto 中
    return this.raceService.create(createRaceEquipmentDto);
  }

  @Get()
  findAll(): Promise<RaceEquipment[]> {
    return this.raceService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.raceService.remove(id);
  }
}
