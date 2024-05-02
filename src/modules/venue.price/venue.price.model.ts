import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '../users/user.model';
import { Venue } from '../venue/venue.model';
@Table({
  tableName: 'venue_price',
})
export class VenuePrice extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, allowNull: false, type: DataTypes.INTEGER })
  id: number;

  @ForeignKey(() => Venue)
  @Column
  vid: number;

  @Column
  type: number;

  @Column
  price: number;

  @Column
  @ForeignKey(() => User)
  createId: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  // @HasOne(() => UserVenue, { foreignKey: 'id' })
  // userVenue: any;
}
