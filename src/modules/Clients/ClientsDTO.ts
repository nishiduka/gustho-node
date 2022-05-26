import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../lib/sequelize';
import { IClients } from './TClients';

type IClientsCreation = Optional<IClients, 'id'>;

class ClientsDTO extends Model<IClients, IClientsCreation> {
  declare id: number;

  declare name: string;
  declare cpf: string;
  declare birthdate: Date;
  declare mail: string;
  declare phone: string;
}

ClientsDTO.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'clients',
    timestamps: true,
  }
);

export default ClientsDTO;
