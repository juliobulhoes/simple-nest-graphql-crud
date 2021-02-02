import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { AuthInput } from './auth.inputs';
import { Auth } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<Auth> {
    const user = await this.userService.getByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user._id };
    return this.jwtService.signAsync(payload);
  }
}
