import SupplierDTO from 'modules/Supplier/SupplierDTO';
import { DataTypes } from 'sequelize';
import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

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

  @BelongsTo(() => SupplierDTO)
  supplier!: SupplierDTO;

  @ForeignKey(() => SupplierDTO)
  @Column({ onDelete: 'cascade', type: DataTypes.INTEGER })
  supplierId!: number;
}

export default ProductDTO;
