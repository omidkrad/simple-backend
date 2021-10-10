import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryKey,
    Property,
  } from "@mikro-orm/core";
  import { Product } from "src/product/entities/product.entity";
  
  @Entity()
  export class Review extends BaseEntity<Review, "id"> {
    @PrimaryKey()
    id!: number;
  
    @ManyToOne({ entity: () => Product })
    product!: Product;
  
    @Property()
    text!: string;
  }
  