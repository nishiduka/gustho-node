import CheckoutDTO from 'modules/Checkout/CheckoutDTO';
import CheckoutItemsDTO from 'modules/Checkout/CheckoutItemsDTO';
import SupplierDTO from 'modules/Supplier/SupplierDTO';
import { DataTypes } from 'sequelize';
import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { IProducts } from './TProduct';

@Table({
  tableName: 'product',
  timestamps: true,
})
class ProductDTO extends Model<IProducts, Omit<IProducts, 'id'>> {
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
    type: DataTypes.DOUBLE,
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

  @BelongsToMany(() => CheckoutDTO, () => CheckoutItemsDTO)
  checkouts!: CheckoutDTO;

  @HasMany(() => CheckoutItemsDTO)
  checkoutItems!: CheckoutItemsDTO;
}

export default ProductDTO;
