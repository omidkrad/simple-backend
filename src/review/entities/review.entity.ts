import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryKey,
    Property,
  } from "@mikro-orm/core";
  import { IsString, IsInt, Min, Max } from 'class-validator';
  import { Product } from "../../product/entities/product.entity";
  
  @Entity()
  export class Review extends BaseEntity<Review, "id"> {
    @PrimaryKey()
    id!: number;
  
    @ManyToOne({ entity: () => Product })
    product!: Product;

    @Property()
    @IsInt()
    @Min(0)
    @Max(4)
    rating: number = 0;
  
    @Property()
    @IsString()
    text!: string;
  }
  