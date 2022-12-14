import { Body, Controller, Get, Logger, Param, Patch, Post, Req } from '@nestjs/common';
import { Public, Roles } from '../auth/auth.module';
import { Role } from '../auth/role.enum';
import { ParseObjectIdPipe } from '../shared/pipes/ParseObjectIdPipe';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('users/:id')
  async getById(
    @Param('id', ParseObjectIdPipe) id: string): Promise<User> {
      
    Logger.log(`Getting user with id: ${id} (READ)`);

    return await this.userService.getById(id);
  }

  @Public()
  @Get('users')
  async getAll(): Promise<User[]> {
      Logger.log(`Getting all users (READ)`);
      return this.userService.getAll();
  }

  @Roles(Role.Admin)
  @Post('users')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      Logger.log(`Creating community (CREATE)`);

      return this.userService.create(createUserDto);
  }

  @Patch('users/:id')
  async update(@Req() req, @Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {

    Logger.log(`Getting user with id: ${id} (UPDATE)`);

    return this.userService.update(id, updateUserDto, req);
  }

  //Follow
  @Post('users/:id/follow')
  async follow(@Req() req, @Param('id', ParseObjectIdPipe) id: string): Promise<User[]> {
    Logger.log(`Getting user with id: ${id} (READ)`);

    return this.userService.follow(id, req);
  }

  @Post('users/:id/unfollow')
  async unfollow(@Req() req, @Param('id', ParseObjectIdPipe) id: string) {
    Logger.log(`Getting user with id: ${id} (READ)`);

    return this.userService.unfollow(id, req);
  }
}