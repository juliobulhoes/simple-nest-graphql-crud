import {
  UseGuards,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { Product } from './product.model';
import { User } from '../user/user.model';
import { ProductService } from './product.service';
import {
  CreateProductInput,
  ListProductInput,
  UpdateProductInput,
} from './product.inputs';

import { GqlAuthGuard } from '../auth/jwt-guard.guard';
import { GetUser } from '../auth/auth.decorator';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Product)
  async product(@Args('_id', { type: () => ID }) _id: Types.ObjectId) {
    const product = await this.productService.getById(_id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Product])
  async products(
    @Args('filters', { nullable: true }) filters?: ListProductInput,
  ) {
    return this.productService.list(filters);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async createProduct(
    @GetUser() user: User,
    @Args('payload') payload: CreateProductInput,
  ) {
    return this.productService.create({ ...payload, userId: user._id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async updateProduct(
    @GetUser() user: User,
    @Args('payload') payload: UpdateProductInput,
  ) {
    const product = await this.productService.getById(payload._id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (String(product.userId) !== String(user._id)) {
      throw new ForbiddenException(
        'You can not update a product from another user',
      );
    }

    return this.productService.update(payload);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async deleteProduct(
    @GetUser() user: User,
    @Args('_id', { type: () => ID }) _id: Types.ObjectId,
  ) {
    const product = await this.productService.getById(_id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (String(product.userId) !== String(user._id)) {
      throw new ForbiddenException(
        'You can not delete a product from another user',
      );
    }

    return this.productService.delete(_id);
  }
}
