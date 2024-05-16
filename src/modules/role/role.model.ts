import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  HasMany,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
@Table({
  tableName: 'role',
})
export class Role extends Model<Role> {
  @AutoIncrement
  @Column({ primaryKey: true, allowNull: false, type: DataTypes.INTEGER })
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @HasMany(() => User)
  users: User[];
}
