import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { UserVenueService } from './user.venue.service';
import { UserVenueController } from './user.venue.controller';
import { UserVenue } from './user.venue.model';

@Module({
  imports: [SequelizeModule.forFeature([UserVenue, User])],
  providers: [UserVenueService],
  exports: [UserVenueService],
  controllers: [UserVenueController],
})
export class UserVenueModule {}
