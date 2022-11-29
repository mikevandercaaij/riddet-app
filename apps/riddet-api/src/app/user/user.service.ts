import { Injectable } from '@nestjs/common';
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
      return this.userRepository.create(createUserDto);
  }

  async update(_id: string, user: Partial<User>): Promise<User> {
      return this.userRepository.findOneAndUpdate({ _id }, user);
  }

  async delete(_id: string): Promise<User> {
      return this.userRepository.findOneAndDelete({ _id });
  }
}