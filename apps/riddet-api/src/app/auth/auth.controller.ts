import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/user.dto';
import { Public, Roles } from './auth.module';
import { AuthService } from './auth.service';
import { Role } from './role.enum';
@Controller()
export class AuthController {
  constructor(private readonly authService : AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
      return this.authService.login(req.body);
  }

  @Public()
  @Post('auth/register')	
  async register(@Body() CreateUserDto : CreateUserDto) {
      return this.authService.register(CreateUserDto);
  }

  @Roles(Role.User)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
