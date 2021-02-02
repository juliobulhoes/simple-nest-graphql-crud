import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductSchema, Product } from './product.model';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: ProductSchema, name: Product.name }]),
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
