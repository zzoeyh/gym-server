import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VenuePrice } from './venue.price.model';
import { User } from '../users/user.model';
import { VenuePriceService } from './venue.price.service';
import { VenuePriceController } from './venue.price.controller';

@Module({
  imports: [SequelizeModule.forFeature([VenuePrice, User])],
  providers: [VenuePriceService],
  exports: [VenuePriceService],
  controllers: [VenuePriceController],
})
export class VenuePriceModule {}
