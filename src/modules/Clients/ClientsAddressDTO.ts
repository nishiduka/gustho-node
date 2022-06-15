import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import ClientsDTO from './ClientsDTO';

@Table({
  tableName: 'clients_address',
  timestamps: true,
})
class ClientsAddressDTO extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  streetname!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  streetname2!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  number!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  zipcode!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  state!: string;

  @BelongsTo(() => ClientsDTO)
  client!: ClientsDTO;

  @ForeignKey(() => ClientsDTO)
  @Column({ onDelete: 'cascade', type: DataTypes.INTEGER })
  clientId!: number;
}

export default ClientsAddressDTO;
