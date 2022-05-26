import { DataTypes } from 'sequelize';
import { Column, HasMany, Table, Model } from 'sequelize-typescript';
import SupplierContactDTO from './SupplierContactDTO';

@Table({
  timestamps: true,
  tableName: 'supplier',
})
class SupplierDTO extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  cpnj!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  ie!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  razao_social!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  nome_fantasia!: string;

  @HasMany(() => SupplierContactDTO)
  contacts!: SupplierContactDTO[];
}

export default SupplierDTO;
