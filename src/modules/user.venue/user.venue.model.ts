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
  tableName: 'user_venue',
})
export class UserVenue extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, allowNull: false, type: DataTypes.INTEGER })
  id: number;

  @Column
  @ForeignKey(() => User)
  createId: string;

  @Column
  @ForeignKey(() => Venue)
  vid: string;

  @Column
  beginAt: Date;

  @Column
  endAt: Date;

  @Column
  status: number;

  @Column
  type: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
