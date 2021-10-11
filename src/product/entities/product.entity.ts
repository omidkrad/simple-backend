import {
  BaseEntity,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import {
  IsNotEmpty,
  IsCurrency,
  IsNumber,
  IsInt,
  IsString,
  IsOptional,
  IsUrl,
} from "class-validator";
import { Review } from "../../review/entities/review.entity";

@Entity()
export class Product extends BaseEntity<Product, "id"> {

  constructor(
    name: string,
    description: string,
    serialNumber: string,
    inventory: number,
    price: number,
    imageUrl?: string,
  ) {
    super();

    this.name = name;
    this.description = description;
    this.serialNumber = serialNumber;
    this.inventory = inventory;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  @PrimaryKey()
  id!: number;

  @Property()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Property()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @Property()
  @IsString()
  @Unique()
  serialNumber!: string;

  @Property({ hidden: true })
  @IsInt()
  inventory!: number;

  @Property()
  // @IsCurrency()
  @IsNumber()
  price!: number;

  @Property({ nullable: true })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @OneToMany({ entity: () => Review, mappedBy: (child) => child.product })
  reviews = new Collection<Review>(this);

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

}
