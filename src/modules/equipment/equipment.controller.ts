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
import { CreateEquipmentDto, RepairDto } from './dto/create-equipment.dto';
import { Equipment } from './equipment.model';
import { EquipmentService } from './equipment.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post('create')
  create(
    @Body() createEqDto: CreateEquipmentDto,
    @Req() request,
  ): Promise<Equipment> {
    const user = request.user; // 从请求对象中获取用户信息，包括 createId
    const createId = user.sub; // 获取 createId
    // 将 createId 添加到 createVenueDto 中
    createEqDto.createId = createId;
    return this.equipmentService.create(createEqDto);
  }

  @Public()
  @Get()
  findAll(): Promise<Equipment[]> {
    return this.equipmentService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.equipmentService.remove(id);
  }

  @Post('/repair')
  async repairEquipment(@Body() repairDto: RepairDto): Promise<void> {
    return this.equipmentService.repair(repairDto);
  }
  @Public()
  @Get('/root')
  async getParentEquipment(): Promise<Equipment[]> {
    return this.equipmentService.getParentEquipment();
  }

  @Put('/update/:id') // 使用 PUT 请求来处理更新用户信息
  update(
    @Param('id') id: number,
    @Body() updateEquipmentDto: CreateEquipmentDto,
  ) {
    return this.equipmentService.update(id, updateEquipmentDto);
  }
}
