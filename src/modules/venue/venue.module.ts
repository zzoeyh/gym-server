import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Venue } from './venue.model';
import { User } from '../users/user.model';
import { VenuePrice } from '../venue.price/venue.price.model';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { VenuePriceService } from '../venue.price/venue.price.service';
@Module({
  imports: [SequelizeModule.forFeature([VenuePrice, Venue, User])],
  providers: [VenueService, VenuePriceService],
  exports: [VenueService],
  controllers: [VenueController],
})
export class VenueModule {}
