import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Role } from './role.model';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  // providers: [UsersService],
  // controllers: [UsersController],
})
export class RoleModule {}
