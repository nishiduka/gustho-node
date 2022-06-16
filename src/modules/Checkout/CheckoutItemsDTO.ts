import { DataTypes } from 'sequelize';
import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ICheckoutItems } from './TCheckout';
import CheckoutDTO from './CheckoutDTO';
import ProductDTO from 'modules/Products/ProductDTO';

@Table({
  timestamps: true,
  tableName: 'checkout_items',
})
class CheckoutItemsDTO extends Model<
  ICheckoutItems,
  Omit<ICheckoutItems, 'id'>
> {
  @Column({
    type: DataTypes.DOUBLE,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataTypes.DOUBLE,
    allowNull: false,
  })
  valueUnit!: number;

  @ForeignKey(() => CheckoutDTO)
  @Column({ onDelete: 'cascade', type: DataTypes.INTEGER })
  checkoutId!: number;

  @BelongsTo(() => CheckoutDTO)
  checkout!: CheckoutDTO;

  @ForeignKey(() => ProductDTO)
  @Column({ onDelete: 'cascade', type: DataTypes.INTEGER })
  productId!: number;

  @BelongsTo(() => ProductDTO)
  products!: ProductDTO;
}

export default CheckoutItemsDTO;
