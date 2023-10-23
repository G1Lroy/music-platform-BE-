import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './model/user';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('register')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() dto: CreateUserDTO): Promise<User> {
    return this.userService.createUser(dto);
  }
  @Get()
  async getUsers(): Promise<User[] | string> {
    return this.userService.getUsers();
  }
}
