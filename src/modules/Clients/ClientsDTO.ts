import UsersDTO from 'modules/Users/UsersDTO';
import { DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'clients',
  timestamps: true,
})
class ClientsDTO extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'cpf',
  })
  cpf!: string;

  @Column({
    type: DataTypes.DATE,
  })
  birthdate!: Date;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  mail!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  phone!: string;

  @ForeignKey(() => UsersDTO)
  @Column({ onDelete: 'cascade', type: DataTypes.INTEGER })
  userId!: number;
}

export default ClientsDTO;
