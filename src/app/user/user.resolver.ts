import {
  UseGuards,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { User } from './user.model';
import { UserService } from './user.service';
import { CreateUserInput, ListUserInput, UpdateUserInput } from './user.inputs';

import { GqlAuthGuard } from '../auth/jwt-guard.guard';
import { GetUser } from '../auth/auth.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Args('_id', { type: () => ID }) _id: Types.ObjectId) {
    return this.userService.getById(_id);
  }

  @Query(() => [User])
  async users(@Args('filters', { nullable: true }) filters?: ListUserInput) {
    return this.userService.list(filters);
  }

  @Mutation(() => User)
  async createUser(@Args('payload') payload: CreateUserInput) {
    const emailAlreadyInUse = await this.userService.getByEmail(payload.email);

    if (emailAlreadyInUse) {
      throw new BadRequestException('Email already in use');
    }

    return this.userService.create(payload);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @GetUser() user: User,
    @Args('payload') payload: UpdateUserInput,
  ) {
    if (String(payload._id) !== String(user._id)) {
      throw new ForbiddenException('You can not update another user profile');
    }

    const emailAlreadyInUse =
      user.email !== payload.email &&
      (await this.userService.getByEmail(payload.email));

    if (emailAlreadyInUse) {
      throw new BadRequestException('Email already in use');
    }

    return this.userService.update({
      ...payload,
      _id: user._id,
    });
  }
}
