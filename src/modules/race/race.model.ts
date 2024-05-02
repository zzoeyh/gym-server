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
import { RaceEquipment } from '../race.equipment/race.equipment.model';
@Table({
  tableName: 'race',
})
export class Race extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, allowNull: false, type: DataTypes.INTEGER })
  id: number;

  @Column
  @ForeignKey(() => User)
  createId: string;

  @Column
  beginAt: Date;

  @Column
  endAt: Date;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  @ForeignKey(() => Venue)
  vid: number;

  //器材组
  @Column
  @ForeignKey(() => RaceEquipment)
  reid: number;

  @Column
  umpireId: number;

  //支持取消预订
  @Column
  status: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
