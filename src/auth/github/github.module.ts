import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { GithubOauthStrategy } from './github.strategy';
import { GithubOauthController } from './github.controller';

@Module({
  imports: [UserModule],
  controllers: [GithubOauthController],
  providers: [GithubOauthStrategy],
})
export class GithubOauthModule {}
