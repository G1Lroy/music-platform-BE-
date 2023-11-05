import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/model/user';
import { JwtService } from '@nestjs/jwt';
import { IUserToClient } from './types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
   
  ) {}

  async validateUser(email: string, password: string): Promise<User | void> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) throw new BadRequestException('User not register');
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) throw new BadRequestException('Incorrect password');

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
