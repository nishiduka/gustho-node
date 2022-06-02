import { DataTypes } from 'sequelize';
import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'users_roles',
})
class UsersRolesDTO extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  level!: number;
}

export default UsersRolesDTO;
