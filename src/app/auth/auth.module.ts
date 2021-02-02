import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.model';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: UserSchema, name: User.name }]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'simple-nest-crud',
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, UserService, JwtStrategy],
})
export class AuthModule {}
