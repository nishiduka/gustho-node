import { DataTypes } from 'sequelize';
import {
  Table,
  Model,
  Column,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';

import CheckoutDTO from 'modules/Checkout/CheckoutDTO';
import CheckoutItemsDTO from 'modules/Checkout/CheckoutItemsDTO';
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

  @BelongsToMany(() => CheckoutDTO, () => CheckoutItemsDTO)
  checkouts!: CheckoutDTO;

  @HasMany(() => CheckoutItemsDTO)
  checkoutItems!: CheckoutItemsDTO;
}

export default ProductDTO;
