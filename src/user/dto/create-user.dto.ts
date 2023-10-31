import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDTO {
  
  @IsEmail()
  readonly email: string;

  @MinLength(5, { message: 'Password min length 5 symbols' })
  readonly password: string;
}
