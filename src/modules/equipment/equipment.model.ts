import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '../users/user.model';

@Table({
  tableName: 'equipment',
})
export class Equipment extends Model {
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
  parentId: number;

  @Column
  total: number;

  @Column
  available: number;

  @Column
  damage: number;

  @Column
  lease: number;

  @Column
  price: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  // @HasOne(() => UserVenue, { foreignKey: 'id' })
  // userVenue: any;
}
