import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;
}

@InputType()
export class ListProductInput {
  @Field(() => ID, { nullable: true })
  _id?: Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  price?: number;
}

@InputType()
export class UpdateProductInput {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  price?: number;
}
