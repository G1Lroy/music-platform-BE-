import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './model/user';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserModel }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
