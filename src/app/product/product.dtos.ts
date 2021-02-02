import { Types } from 'mongoose';

export class CreateProductDTO {
  name: string;
  description: string;
  price: number;
  userId: Types.ObjectId;
}

export class ListProductDTO {
  _id?: Types.ObjectId;
  name?: string;
  description?: string;
  price?: number;
  userId?: Types.ObjectId;
}

export class UpdateProductDTO {
  _id: Types.ObjectId;
  name?: string;
  description?: string;
  price?: number;
  userId?: Types.ObjectId;
}
