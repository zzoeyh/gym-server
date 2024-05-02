import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
// import { User } from '../users/user.model';
import { Equipment } from '../equipment/equipment.model';
// import { Race } from '../race/race.model';

@Table({
  tableName: 'race_equipment',
})
export class RaceEquipment extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, allowNull: false, type: DataTypes.INTEGER })
  id: number;

  @Column
  @ForeignKey(() => Equipment)
  eid: number;

  @Column
  createId: string;
  // @AutoIncrement
  @Column
  groupId: number;
  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
