import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../lib/sequelize';
import { ISupplier } from './TSupplier';

type ISupplierCreation = Optional<ISupplier, 'id'>;

class SupplierDTO extends Model<ISupplier, ISupplierCreation> {
  declare id: number;
  declare name: string;
  declare cpnj: string;
  declare ie: string;
  declare razao_social: string;
  declare nome_fantasia: string;
}

SupplierDTO.init(
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
    cpnj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    razao_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome_fantasia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'supplier',
    timestamps: true,
  }
);

export default SupplierDTO;
