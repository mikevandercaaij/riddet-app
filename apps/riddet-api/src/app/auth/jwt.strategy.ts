import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService : UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByUsernameOrEmail(payload.username);

    if(user) {
      return { id: user._id, username: payload.username, email: user.email, name: user.firstname + ' ' + user.lastname, roles: user.roles };
    } else {
      throw new HttpException('Login has expired!', HttpStatus.UNAUTHORIZED);
    }
  }
}