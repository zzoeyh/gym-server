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
import { VenueDto } from './dto/venue.dto';
import { Venue } from './venue.model';
import { VenueService } from './venue.service';
import { VenuePriceService } from '../venue.price/venue.price.service';
@Controller('venue')
export class VenueController {
  constructor(
    private readonly venueService: VenueService,
    private readonly venuePriceService: VenuePriceService,
  ) {}

  @Post('create')
  create(@Body() createVenueDto: VenueDto, @Req() request): Promise<Venue> {
    const user = request.user; // 从请求对象中获取用户信息，包括 createId
    const createId = user.sub; // 获取 createId
    // 将 createId 添加到 createVenueDto 中
    createVenueDto.createId = createId;
    // 创建场地
    const createVenuePromise = this.venueService.create(createVenueDto);

    // 创建 venue_price 记录
    createVenuePromise.then(async (venue) => {
      // 构建 venue_price 对象
      const venuePrice = {
        vid: venue.id,
        price: createVenueDto.price,
        createId: createVenueDto.createId,
        type: 0,
      };

      await this.venuePriceService.create(venuePrice);
      // 调用 venuePriceService 创建 venue_price 记录
    });
    return createVenuePromise;
  }

  @Get('get')
  findAll(): Promise<Venue[]> {
    // const errorCondition = true;

    // if (errorCondition) {
    //   throw new NotFoundException('Item not found');
    // }
    return this.venueService.findAll();
  }

  @Get('/get/:id')
  async findOne(@Param('id') id: number): Promise<Venue> {
    const venue = await this.venueService.findOne(id);
    if (!venue) {
      throw new NotFoundException(`场地不存在`);
    }
    return this.venueService.findOne(id);
  }
  @Get(':name')
  async findOneByName(@Param('name') name: string): Promise<Venue> {
    const venue = await this.venueService.findOneByName(name);
    if (!venue) {
      throw new NotFoundException(`场地 ${name} 不存在`);
    }
    return this.venueService.findOneByName(name);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.venueService.remove(id);
  }
}
