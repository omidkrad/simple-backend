import { EntityRepository, Repository } from '@mikro-orm/core';
import { Product } from './entities/product.entity';

@Repository(Product)
export class ProductRepository extends EntityRepository<Product> {}
