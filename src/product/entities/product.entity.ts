import {
    BaseEntity,
    Collection,
    Entity,
    OneToMany,
    PrimaryKey,
    Property,
  } from "@mikro-orm/core";
  import { Review } from "src/review/entities/review.entity";
  
  @Entity()
  export class Product extends BaseEntity<Product, "id"> {
    @PrimaryKey()
    id!: number;
  
    @Property()
    name!: string;
  
    @Property({ hidden: true })
    price!: number;
  
    @OneToMany({ entity: () => Review, mappedBy: (child) => child.product })
    reviews = new Collection<Review>(this);
  }
  