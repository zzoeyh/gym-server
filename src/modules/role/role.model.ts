import { DataTypes } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Role extends Model<Role> {
  @Column({ primaryKey: true, allowNull: false, type: DataTypes.STRING })
  id: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  createAt: Date;

  @Column
  updateAt: Date;
}
