import { Controller, Body, Get, Post, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.types';

@Controller('product')
export class ProductController {
  @Get()
  findAllProducts() {
    return this.product.getProducts();
  }

  @Post()
  addProduct(@Body() productDto: ProductDto) {
    console.log(productDto);
    return this.product.addProduct(productDto);
  }

  constructor(private product: ProductService) {}
}
