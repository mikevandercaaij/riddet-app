
import { Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from './auth.module';
import { AuthService } from './auth.service';


@Controller()
export class AuthController {
  constructor(private readonly authService : AuthService) {}

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
