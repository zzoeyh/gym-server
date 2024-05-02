import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  // NotFoundException,
} from '@nestjs/common';
import { CreateRaceDto } from './dto/race.dto';
import { Race } from './race.model';
import { RaceService } from './race.service';
import { RaceEquipmentService } from '../race.equipment/race.equipment.service';
@Controller('race')
export class RaceController {
  constructor(
    private readonly raceService: RaceService,
    private readonly raceEquipmentService: RaceEquipmentService,
  ) {}

  @Post('create')
  async create(
    @Body() createRaceDto: CreateRaceDto,
    @Req() request,
  ): Promise<Race> {
    const user = request.user; // 从请求对象中获取用户信息，包括 createId
    const createId = user.sub; // 获取 createId
    // 将 createId 添加到 createVenueDto 中
    createRaceDto.createId = createId;
    const raceEquipment = await this.raceEquipmentService.create({
      eid: createRaceDto.eid,
      createId: createId,
    });
    createRaceDto.reid = raceEquipment;
    return this.raceService.create(createRaceDto);
  }

  @Get()
  findAll(): Promise<Race[]> {
    return this.raceService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.raceService.remove(id);
  }

  @Put('/update/:id') // 使用 PUT 请求来处理更新用户信息
  update(@Param('id') id: number, @Body() updateRaceDto: CreateRaceDto) {
    return this.raceService.update(id, updateRaceDto);
  }
}
