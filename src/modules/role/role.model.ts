import { DataTypes } from 'sequelize';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table({
  tableName: 'role',
})
export class Role extends Model<Role> {
  @Column({ primaryKey: true, allowNull: false, type: DataTypes.STRING })
  id: string;

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
