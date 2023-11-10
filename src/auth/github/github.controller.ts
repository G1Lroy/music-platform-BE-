import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GithubService } from './github.service';


@Controller('auth')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
  ) {}
  @Get('github/getProfile')
  async getProfileData(@Req() request, @Res() res) {
    const token = request.headers.authorization;
    try {
      const profileData = await this.githubService.getProfileData(token);
      return res.json(profileData);
    } catch (error) {
      return res.json(error);
    }
  }

  @Get('github/getAccess')
  async getAccessToken(@Req() req, @Res() res) {
    const code = req.query.code;
    try {
      const accessToken = await this.githubService.getAccessToken(code);
      return res.json(accessToken);
    } catch (error) {
      return res.json(error);
    }
  }
}
