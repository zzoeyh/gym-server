import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { CreateVenuePriceDto } from './dto/venue-price.dto';
import { VenuePrice } from './venue.price.model';
import { VenuePriceService } from './venue.price.service';

@Controller('venue')
export class VenuePriceController {
  constructor(private readonly venuePriceService: VenuePriceService) {}

  @Post('create')
  create(
    @Body() createVenuePriceDto: CreateVenuePriceDto,
    @Req() request,
  ): Promise<VenuePrice> {
    const user = request.user; // 从请求对象中获取用户信息，包括 createId
    const createId = user.sub; // 获取 createId
    // 将 createId 添加到 createVenueDto 中
    createVenuePriceDto.createId = createId;
    console.log(createId);
    return this.venuePriceService.create(createVenuePriceDto);
  }

  @Get('get')
  findAll(): Promise<VenuePrice[]> {
    // const errorCondition = true;

    // if (errorCondition) {
    //   throw new NotFoundException('Item not found');
    // }
    return this.venuePriceService.findAll();
  }

  @Get('/get/:id')
  async findOne(@Param('id') id: number): Promise<VenuePrice> {
    const venue = await this.venuePriceService.findOne(id);
    if (!venue) {
      throw new NotFoundException(`场地不存在`);
    }
    return this.venuePriceService.findOne(id);
  }
  @Get(':name')
  async findOneByName(@Param('name') name: string): Promise<VenuePrice> {
    const venue = await this.venuePriceService.findOneByName(name);
    if (!venue) {
      throw new NotFoundException(`场地 ${name} 不存在`);
    }
    return this.venuePriceService.findOneByName(name);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.venuePriceService.remove(id);
  }
}
