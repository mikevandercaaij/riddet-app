import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ValidationException } from '../shared/filters/validation.exception';
import { CreateUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository : UserRepository) {}

  async findByUsernameOrEmail(username: string): Promise<User | undefined> {
    const userByUsername = await this.userRepository.findOne({ username });

    if(userByUsername === null) {
      const userByEmail = await this.userRepository.findOne({ email: username });

      if(userByEmail === null) {
        return undefined;
      }
      return userByEmail;
    }
    return userByUsername;
  }

  async getById(_id: string): Promise<User> {
    return this.userRepository.findOne({ _id });
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async create(createUserDto : CreateUserDto): Promise<User> {
      await this.validateUser(createUserDto, undefined, undefined);

      createUserDto.dateOfBirth = new Date(createUserDto.dateOfBirth);
      createUserDto.dateOfBirth.setHours(createUserDto.dateOfBirth.getHours() + 1);

      return this.userRepository.create(createUserDto);
  }

  async update(updateUserId: string, user: Partial<User>, currentUserId : string): Promise<User> {
      await this.validateUser(user, currentUserId, updateUserId);

      if(user.dateOfBirth) {
        user.dateOfBirth = new Date(user.dateOfBirth);
        user.dateOfBirth.setHours(user.dateOfBirth.getHours() + 1);
      }

      return this.userRepository.findOneAndUpdate({ _id : updateUserId }, user);
  }

  async delete(_id: string): Promise<User> {
      return this.userRepository.findOneAndDelete({ _id });
  }


  async validateUser(user : any, currentUserId : string | undefined, updateUserId : string | undefined) : Promise<void> {
    if((await this.userRepository.find(
      {
        $or: 
        [
            { username: user.username }, 
            { email: user.email }
        ] 
      }, 
    )).length > 0 && !(new Types.ObjectId(currentUserId).equals(new Types.ObjectId(updateUserId)))) {
      throw new ValidationException([`Username or email is already in use!`]);
    }

    if(new Date(user.dateOfBirth) > new Date()) {
      throw new ValidationException([`Date of birth cannot be in the future!`]);
    }
  }
}
