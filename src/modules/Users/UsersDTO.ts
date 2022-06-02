import { DataTypes } from 'sequelize';
import { Column, Table, Model, ForeignKey } from 'sequelize-typescript';
import UsersRolesDTO from './UsersRolesDTO';

@Table({
  timestamps: true,
  tableName: 'users',
})
class UsersDTO extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  mail!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => UsersRolesDTO)
  roleId!: number;
}

export default UsersDTO;
