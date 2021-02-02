import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Product, ProductDocument } from './product.model';

import {
  CreateProductDTO,
  ListProductDTO,
  UpdateProductDTO,
} from './product.dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  create(payload: CreateProductDTO) {
    const createdProduct = new this.productModel(payload);
    return createdProduct.save();
  }

  getById(_id: Types.ObjectId) {
    return this.productModel.findById(_id).exec();
  }

  list(filters: ListProductDTO) {
    return this.productModel.find({ ...filters }).exec();
  }

  update(payload: UpdateProductDTO) {
    return this.productModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: Types.ObjectId) {
    return this.productModel.findByIdAndDelete(_id).exec();
  }
}
