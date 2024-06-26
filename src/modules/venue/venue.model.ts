import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  Table,
  HasOne,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '../users/user.model';
import { VenuePrice } from '../venue.price/venue.price.model';
@Table({
  tableName: 'venue',
})
export class Venue extends Model {
  @AutoIncrement
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  createId: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  announcement: string;

  @Column
  img: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @HasOne(() => VenuePrice, { foreignKey: 'vid' })
  price: number;
}
