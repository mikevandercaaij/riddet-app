import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
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

    const user = await this.userService.getById(id);

    if(!user) {
      throw new HttpException(`User with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Roles(Role.Admin)
  @Get('users')
  async getAll(): Promise<User[]> {
      Logger.log(`Getting all users (READ)`);
      return this.userService.getAll();
  }

  @Public()
  @Post('users')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      Logger.log(`Creating community (CREATE)`);

      return this.userService.create(createUserDto);
  }

  @Public()
  @Patch('users/:id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {

    Logger.log(`Getting user with id: ${id} (UPDATE)`);

    const community = await this.userService.getById(id);
    
    if(!community) {
      throw new HttpException(`User with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return this.userService.update(id, updateUserDto);
  }

  @Public()
  @Delete('users/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<User> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    const community = await this.userService.getById(id);
    
    if(!community) {
      throw new HttpException(`User with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }
    
    return this.userService.delete(id);
  }
}