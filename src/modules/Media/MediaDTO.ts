import ProductDTO from 'modules/Products/ProductDTO';
import { DataTypes } from 'sequelize';
import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { IMedia } from './TMedia';

@Table({
  tableName: 'media',
  timestamps: true,
})
class MediaDTO extends Model<IMedia, Omit<IMedia, 'id'>> {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  filename!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  path!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  extension!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  order!: string;

  @ForeignKey(() => ProductDTO)
  @Column({ onDelete: 'cascade', type: DataTypes.INTEGER })
  productId!: number;
}

export default MediaDTO;
