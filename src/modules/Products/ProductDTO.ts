import { DataTypes } from 'sequelize';
import { Table, Model, Column } from 'sequelize-typescript';

@Table({
  tableName: 'product',
  timestamps: true,
})
class ProductDTO extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataTypes.STRING,
  })
  description!: string;

  @Column({
    type: DataTypes.STRING,
  })
  shortDescription!: string | null;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  metric!: string;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  quantity!: number;
}

export default ProductDTO;
