import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    const isEmailTaken = await this.findUserByEmail(dto.email);

    if (!isEmailTaken) {
      const hashPass = await bcrypt.hash(dto.password, 5);
      const createdUser = new this.userModel({
        email: dto.email,
        password: hashPass,
      });
      return createdUser.save();
    }
    throw new BadRequestException('Email alredy exist');
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async getUsers(): Promise<User[]> {
    return;
    // return await this.userModel.find().select('email');
  }
}
