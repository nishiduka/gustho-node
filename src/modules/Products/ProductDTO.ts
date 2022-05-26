import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../lib/sequelize';
import { IProducts } from './TProduct';

type IProductsCreation = Optional<IProducts, 'id'>;

class ProductDTO extends Model<IProducts, IProductsCreation> {
  declare id: number;
  declare name: string;
  declare description: string;
  declare shortDescription: string | null;
  declare metric: string;
  declare price: number;
  declare quantity: number;
}

ProductDTO.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    metric: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'product',
    timestamps: true,
  }
);

export default ProductDTO;
