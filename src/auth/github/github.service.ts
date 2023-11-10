import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
require('dotenv').config();

@Injectable()
export class GithubService {
  constructor(private jwtService: JwtService) {}
  async getProfileData(token: string) {
    // const decoded = this.jwtService.verify(token);
    try {
      const { data } = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: token,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Failed to fetch profile data from GitHub API');
    }
  }
  async getAccessToken(code: string) {
    try {
      const { data } = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GH_CLIENT_ID,
          client_secret: process.env.GH_SECRET,
          code,
          scope: ['gist'],
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return data.access_token;
      //   const payload = {
      //     name: code,
      //     token: data.access_token,
      //   };
      //   return this.jwtService.sign(payload);
    } catch (error) {
      throw new Error('Failed to fetch access token from GitHub API');
    }
  }
}
