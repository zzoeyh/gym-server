import { Injectable } from '@nestjs/common';
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
    const venue = await this.findOne(id);
    await venue.destroy();
  }
}
