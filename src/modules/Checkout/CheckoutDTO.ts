import { DataTypes } from 'sequelize';
import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import ClientsAddressDTO from 'modules/Clients/ClientsAddressDTO';
import ClientsDTO from 'modules/Clients/ClientsDTO';
import { ICheckout } from './TCheckout';
import ProductDTO from 'modules/Products/ProductDTO';
import CheckoutItemsDTO from './CheckoutItemsDTO';

@Table({
  timestamps: true,
  tableName: 'checkout',
})
class CheckoutDTO extends Model<ICheckout, Omit<ICheckout, 'id'>> {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataTypes.DOUBLE,
    allowNull: false,
  })
  total!: number;

  @BelongsTo(() => ClientsDTO)
  client!: ClientsDTO;

  @ForeignKey(() => ClientsDTO)
  @Column({ onDelete: 'cascade', type: DataTypes.INTEGER })
  clientsId!: number;

  @BelongsTo(() => ClientsAddressDTO)
  clientAddress!: ClientsAddressDTO;

  @ForeignKey(() => ClientsAddressDTO)
  @Column({ onDelete: 'cascade', type: DataTypes.INTEGER })
  clientAddressId!: number;

  @BelongsToMany(() => ProductDTO, () => CheckoutItemsDTO)
  products!: ProductDTO;

  @HasMany(() => CheckoutItemsDTO)
  productsItems!: CheckoutItemsDTO;
}

// CheckoutDTO.belongsToMany(ProductDTO, { through: CheckoutItemsDTO });
// CheckoutDTO.hasMany(CheckoutItemsDTO);

export default CheckoutDTO;
