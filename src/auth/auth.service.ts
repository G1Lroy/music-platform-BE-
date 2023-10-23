import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/model/user';
import { JwtService } from '@nestjs/jwt';
import { IUserToClient } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | void> {
    const user = await this.usersService.findUserByEmail(email);
    const isPassMatch = await bcrypt.compare(password, user.password);

    if (!user || !isPassMatch) {
      throw new BadRequestException('Incorrect email or password');
    }

    return user;
  }
  async login(user: IUserToClient) {
    const payload = { username: user.email, sub: user.id };
    return {
      email: user.email,
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
