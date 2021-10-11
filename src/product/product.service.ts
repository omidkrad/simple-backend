import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const serialNumber = createProductDto.serialNumber;
    const alreadyCreated = await this.productRepository.findOne({ serialNumber });

    if (!alreadyCreated) {
      const product = new Product(
        createProductDto.name,
        createProductDto.description,
        createProductDto.serialNumber,
        createProductDto.inventory,
        createProductDto.price,
        createProductDto.imageUrl,
      )
      await this.productRepository.persistAndFlush(product);
      
      return product;
    }

    // TODO: reject with some informative error
    return Promise.reject();
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
