import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { User } from './model/user';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() dto: CreateUserDTO): Promise<User> {
    return this.userService.createUser(dto);
  }
  @Get('profile/:id')
  @UseGuards(JwtAuthGuard)
  getProfile(@Param('id') id: string) {
    return this.userService.getUserProfile(id);
  }
  @Delete('profile/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
