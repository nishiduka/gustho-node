import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

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
  })
  cpf!: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
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
}

export default ClientsDTO;
