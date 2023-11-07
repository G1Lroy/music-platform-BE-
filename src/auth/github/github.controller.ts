import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { GithubOauthGuard } from './github.guard';
import { Request, Response } from 'express';

@Controller('auth/github')
export class GithubOauthController {
  constructor() {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  async githubAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;
    res.json(user);
  }
}
