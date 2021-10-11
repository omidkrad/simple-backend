import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { QueryOrder, wrap } from '@mikro-orm/core';

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

  /**
   * Creates a new product.
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const serialNumber = createProductDto.serialNumber;
    const alreadyCreated = await this.productRepository.findOne({ serialNumber });

    if (alreadyCreated) {
      throw new HttpException(`Product with serial number '${serialNumber}' already exists.`,
        HttpStatus.CONFLICT);
    }

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

  /**
   * Gets the list of products.
   */
  async findAll() {
    return await this.productRepository.findAll(['reviews'], { name: QueryOrder.DESC }, 50);
  }

  /**
   * Gets the specified product.
   * @param id ID of the product entry to be retrieved.
   */
  async findOne(id: number) {
    const product = await this.productRepository.findOne(Number(id), ['reviews']);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  /**
   * Updates a product.
   * @param id ID of the product entry to be updated.
   * @param updateProductDto Object with product properties to be modified.
   */
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne(Number(id));

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    wrap(product).assign(updateProductDto);
    await this.productRepository.persistAndFlush(product);

    return product;
  }

  /**
   * Removes a product.
   * @param id ID of the product to be removed.
   */
  async remove(id: number) {
    const product = await this.productRepository.findOne(Number(id));

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.removeAndFlush(product);

    return product;
  }

}
