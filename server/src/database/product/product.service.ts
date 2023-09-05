import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from './product.types';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async addProduct(productDto: ProductDto): Promise<ProductDocument> {
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }
}
