import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  // NotFoundException,
} from '@nestjs/common';
import { CreateUserEquipmentDto } from './dto/create-user-equipment.dto';

import { UserEquipment } from './user.equipment.model';
import { UserEquipmentService } from './user.equipment.service';

@Controller('equipment/user')
export class UserEquipmentController {
  constructor(private readonly equipmentService: UserEquipmentService) {}

  @Post('book')
  create(
    @Body() createEquipmentDto: CreateUserEquipmentDto,
    @Req() request,
  ): Promise<UserEquipment> {
    const user = request.user; // 从请求对象中获取用户信息，包括 createId
    const createId = user.sub; // 获取 createId
    // 将 createId 添加到 createVenueDto 中
    createEquipmentDto.createId = createId;
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  findAll(): Promise<UserEquipment[]> {
    return this.equipmentService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.equipmentService.remove(id);
  }

  @Post('/cancel')
  async cancelBook(
    @Query('id') id: number,
    @Query('damage') damage: number,
  ): Promise<void> {
    return this.equipmentService.cancelBook({ id, damage });
  }

  @Post('/paginate')
  async getUserEquipmentPage(
    @Req() request,
    @Query('current') current,
    @Query('pageSize') pageSize,
  ): Promise<{ data: UserEquipment[]; total: number }> {
    const user = request.user; // 从请求对象中获取用户信息，包括 createId
    const createId = user.sub; // 获取 createId
    const result = await this.equipmentService.paginateUserBookEquipment({
      createId,
      current,
      pageSize,
    });
    return {
      data: result.data,
      total: result.total,
    };
  }
}
