import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../user/user.dto';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user : User = await this.userService.findByUsernameOrEmail(username);
    
    if (user && await bcrypt.compareSync(pass, user.password)) {
      return user;
    } 

    throw new HttpException(`Incorrect credentials!`, HttpStatus.BAD_REQUEST);
  }

  async register(createUserDto: CreateUserDto) {
    const user : User = await this.userService.create(createUserDto);
    return this.login(user);
  }

  async login(user: any) {
    const payload = { username: user.username };

    const loggedInUser = await this.userService.findByUsernameOrEmail(user.username);

    return {
      _id: loggedInUser._id,
      username: loggedInUser.username,
      firstname: loggedInUser.firstname,
      lastname: loggedInUser.lastname,
      email: loggedInUser.email,
      roles: loggedInUser.roles,
      userImageUrl: loggedInUser.userImageUrl,
      access_token: this.jwtService.sign(payload),
      createdCommunities: loggedInUser.createdCommunities,
    };
  }
}