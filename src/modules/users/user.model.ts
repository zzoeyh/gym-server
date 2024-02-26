import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Role } from '../role/role.model'; // 假设Role模型已经定义
@Table({
  tableName: 'user',
})
export class User extends Model<User> {
  @Column({ primaryKey: true, allowNull: false, type: DataTypes.STRING })
  id: string;
  @ForeignKey(() => Role)
  @Column
  rid: string;
  @BelongsTo(() => Role, { foreignKey: 'rid' }) // 定义 User 模型属于 Role 模型
  role: Role;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  avatar: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
