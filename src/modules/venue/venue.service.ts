import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VenueDto } from './dto/venue.dto';
import { Venue } from './venue.model';

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
}
