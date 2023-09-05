import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product/product.schema';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Product.name, schema: ProductSchema }],
      process.env.DB_URL,
    ),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class DatabaseModule {}
