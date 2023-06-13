import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Length,
  Min,
} from "sequelize-typescript";

interface DBDogAttributes {
  id: number;
  name: string;
  color: string;
  tail_length: number;
  weight: number;
}

interface DBDogCreationAttributes extends Optional<DBDogAttributes, "id"> {}

@Table({ timestamps: false, tableName: "dogs" })
export class DBDog extends Model<DBDogAttributes, DBDogCreationAttributes> {
  @Length({ min: 3, max: 25 })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name!: string;

  @Length({ min: 3, max: 35 })
  @Column({ type: DataType.STRING, allowNull: false })
  color!: string;

  @Min(1)
  @Column({ type: DataType.INTEGER, allowNull: false })
  tail_length!: number;

  @Min(1)
  @Column({ type: DataType.INTEGER, allowNull: false })
  weight!: number;
}
