import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VenueDto } from './dto/venue.dto';
import { Venue } from './venue.model';
import { VenuePrice } from '../venue.price/venue.price.model';
@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue)
    private readonly venueModel: typeof Venue,
  ) {}

  create(createVenueDto: VenueDto): Promise<Venue> {
    return this.venueModel.create({
      name: createVenueDto.name,
      description: createVenueDto.description,
      img: createVenueDto.img,
      announcement: createVenueDto.announcement,
      createId: createVenueDto.createId,
    });
  }

  async findAll(): Promise<Venue[]> {
    return this.venueModel.findAll();
  }

  findOne(id: number): Promise<Venue> {
    return this.venueModel.findOne({
      where: {
        id,
      },
      // include: User,
    });
  }
  findOneByName(name: string): Promise<Venue> {
    return this.venueModel.findOne({
      where: {
        name,
      },
    });
  }
  async remove(id: number): Promise<void> {
    const venue = await this.findOne(id);
    await venue.destroy();
  }

  async update(id: number, updatedVenue: VenueDto): Promise<void> {
    try {
      await this.venueModel.update(updatedVenue, {
        where: {
          id,
        },
      });
    } catch (error) {
      // 在这里可以根据具体情况抛出自定义的异常
      throw new NotFoundException('更新信息失败,请检查输入的字段');
    }
  }
  async paginate({
    current = 1,
    pageSize = 10,
  }): Promise<{ data: Venue[]; total: number }> {
    const offset = (current - 1) * pageSize;
    const limit = pageSize * 1;

    const { count, rows } = await this.venueModel.findAndCountAll({
      offset,
      limit,
      include: {
        model: VenuePrice,
      },
    });

    const venues = rows.map((row) => {
      const venue = row.get();
      venue.price = venue.price && venue.price.price ? venue.price.price : 0;
      return venue;
    });
    return {
      data: venues,
      total: count,
    };
  }
}
