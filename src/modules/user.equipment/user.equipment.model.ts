import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '../users/user.model';
import { Equipment } from '../equipment/equipment.model';
@Table({
  tableName: 'user_equipment',
})
export class UserEquipment extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, allowNull: false, type: DataTypes.INTEGER })
  id: number;

  @Column
  @ForeignKey(() => User)
  createId: string;

  @Column
  @ForeignKey(() => Equipment)
  eid: string;

  @BelongsTo(() => Equipment)
  equipment: Equipment;
  @Column
  borrow: number;

  @Column
  damage: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
  @Column
  status: number;
}
