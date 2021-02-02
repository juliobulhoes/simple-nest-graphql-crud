import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthInput {
  @Field(() => String)
  email: string;
}
