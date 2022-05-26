import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import SupplierDTO from './SupplierDTO';
import { ISupplierContact } from './TSupplier';

@Table({
  timestamps: true,
  tableName: 'supplier_contact',
})
class SupplierContactDTO extends Model<
  ISupplierContact,
  Omit<ISupplierContact, 'id'>
> {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  contact!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  person_name!: string;

  @BelongsTo(() => SupplierDTO)
  supplier!: SupplierDTO;

  @ForeignKey(() => SupplierDTO)
  @Column({ onDelete: 'cascade', type: DataTypes.NUMBER })
  supplierId!: number;
}

export default SupplierContactDTO;
