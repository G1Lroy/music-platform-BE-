import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserService } from 'src/user/user.service';

dotenv.config();

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.GH_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(profile: Profile) {
    try {
      const user = {
        githubId: profile.id,
        username: profile.username,
        email: profile.emails ? profile.emails[0].value : null,
      };
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

// const existingUser = await this.userService.findUserByEmail(user.email);
// return existingUser;

// const newUserFromGithub = await this.userService.createUser({
//   email: user.email,
//   password: generator.generate({
//     length: 5, // Длина пароля
//     numbers: true, // Включить цифры
//     symbols: false, // Исключить специальные символы
//     uppercase: false, // Включить заглавные буквы
//     strict: false, // Гарантировать наличие хотя бы одной цифры, одной заглавной буквы и одного строчного символа
//   }),
// });
// return newUserFromGithub;
