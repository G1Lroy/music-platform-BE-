import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createAndCheckUser(dto: CreateUserDTO): Promise<any> {
    const isEmailTaken = await this.findUserByEmail(dto.email);
    // todo зробити окрему превірку
    if (isEmailTaken) {
      throw new BadRequestException('Email alredy exist');
    }
    // todo окремо хеш пасс
    const hashPass = await bcrypt.hash(dto.password, 5);
    const createdUser = new this.userModel({
      email: dto.email,
      password: hashPass,
    });
    await createdUser.save();
    return createdUser;
  }
  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }
  async deleteUser(id: string) {
    try {
      await this.userModel.deleteOne({ _id: id });
    } catch (error) {
      throw new BadRequestException(error.message, 'Cant find user');
    }
    return 'User deleted successfully';
  }
  async getUserProfile(id: string) {
    try {
      const user = await this.userModel.findById({ _id: id });
      return user;
    } catch (error) {
      throw new BadRequestException('Cant find user');
    }
  }
}
