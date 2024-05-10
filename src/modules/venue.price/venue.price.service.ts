import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVenuePriceDto } from './dto/venue-price.dto';
import { VenuePrice } from './venue.price.model';

@Injectable()
export class VenuePriceService {
  constructor(
    @InjectModel(VenuePrice)
    private readonly venuePriceModel: typeof VenuePrice,
  ) {}

  create(createVenuePriceDto: CreateVenuePriceDto): Promise<VenuePrice> {
    return this.venuePriceModel.create({
      vid: createVenuePriceDto.vid,
      type: createVenuePriceDto.type,
      price: createVenuePriceDto.price,
      createId: createVenuePriceDto.createId,
    });
  }

  async findAll(): Promise<VenuePrice[]> {
    return this.venuePriceModel.findAll();
  }

  findOne(id: number): Promise<VenuePrice> {
    return this.venuePriceModel.findOne({
      where: {
        id,
      },
      // include: User,
    });
  }
  findOneByName(name: string): Promise<VenuePrice> {
    return this.venuePriceModel.findOne({
      where: {
        name,
      },
    });
  }
  async remove(id: number): Promise<void> {
    const venue = await this.venuePriceModel.findOne({
      where: {
        vid: id,
      },
    });
    await venue.destroy();
  }

  async updateVenuePrice(id: number, price: number): Promise<void> {
    try {
      const venuePrice = await this.venuePriceModel.findOne({
        where: {
          vid: id,
        },
      });
      if (!venuePrice) {
        throw new NotFoundException('VenuePrice not found');
      }
      await venuePrice.update({ price });
    } catch (error) {
      // 在这里可以根据具体情况抛出自定义的异常
      throw new NotFoundException('更新信息失败，请检查输入的字段');
    }
  }
}
