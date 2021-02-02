import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  contactPhone: string;
}

@InputType()
export class ListUserInput {
  @Field(() => ID, { nullable: true })
  _id?: Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  contactPhone?: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  contactPhone?: string;
}
