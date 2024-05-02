import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UploadModule } from './modules/upload/upload.module';
import { RoleModule } from './modules/role/role.module';
import { VenueModule } from './modules/venue/venue.module';
import { UserVenueModule } from './modules/user.venue/user.venue.module';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { RaceModule } from './modules/race/race.module';
import { RaceEquipmentModule } from './modules/race.equipment/race.equipment.module';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'my_gym',
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RoleModule,
    UploadModule,
    VenueModule,
    UserVenueModule,

    EquipmentModule,
    RaceModule,
    RaceEquipmentModule,
  ],
})
export class AppModule {}
