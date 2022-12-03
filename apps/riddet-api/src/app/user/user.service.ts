import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model, Types } from 'mongoose';
import { Role } from '../auth/role.enum';
import { ValidationException } from '../shared/filters/validation.exception';
import { CreateUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { User, UserDocument } from './user.schema';


@Injectable()
export class UserService {
  constructor(private readonly userRepository : UserRepository, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

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

  async update(updateUserId: string, user: Partial<User>, req): Promise<User> {

    const currentUser = req.user;

    if(await this.isMyData(updateUserId, currentUser.id) || currentUser.roles.includes(Role.Admin)) {
      await this.validateUser(user, currentUser.id, updateUserId);

      if(user.dateOfBirth) {
        user.dateOfBirth = new Date(user.dateOfBirth);
        user.dateOfBirth.setHours(user.dateOfBirth.getHours() + 1);
      }

      if(user.password) {
        user.password = await bcrypt.hashSync(user.password, 10)
      }

      return this.userRepository.findOneAndUpdate({ _id : updateUserId }, user);
    }
    throw new ValidationException([`You cannot update other users!`]);
  }

  async delete(deleteUserId: string, req): Promise<User> {
    const currentUser = req.user

    if(await this.isMyData(deleteUserId, currentUser.id) || currentUser.roles.includes(Role.Admin)) {
      return this.userRepository.findOneAndDelete({ _id : deleteUserId });
    }

    throw new ValidationException([`You cannot delete other users!`]);
  }

  //following related methods

  async follow(followUserId: string, req): Promise<User[]> {
    if(await this.isMyData(followUserId, req.user.id)) {
      throw new ValidationException([`You cannot follow yourself!`]);
    }
    
    if (await (await this.userRepository.find({ 'following': `${followUserId}` })).length > 0) {
      throw new ValidationException([`You already follow this person!`]);
    }

    const user : User = await this.getById(req.user.id);
    const otherUser : User = await this.getById(followUserId);

    await (user.following as any).push(followUserId);
    await (otherUser.followers as any).push(req.user.id)
    
    await this.userRepository.findOneAndUpdate({ _id: user._id }, user );
    await this.userRepository.findOneAndUpdate({ _id: otherUser._id }, otherUser);

    return [user,otherUser]
  }

  async unfollow(followUserId: string, req): Promise<User[]> {
    if(await this.isMyData(followUserId, req.user.id)) {
      throw new ValidationException([`You cannot unfollow yourself!`]);
    }
    
    if (await (await this.userRepository.find({ 'following': `${followUserId}` })).length === 0) {
      throw new ValidationException([`You don't follow this person!`]);
    }

    let user : User = await this.getById(req.user.id);
    let otherUser : User = await this.getById(followUserId);

    user.following = await (user.following as any).filter(id => !(new Types.ObjectId(id).equals(new Types.ObjectId(followUserId))));
    otherUser.followers = await (otherUser.followers as any).filter(id => !(new Types.ObjectId(id).equals(new Types.ObjectId(req.user.id))));
    
    user = await this.userRepository.findOneAndUpdate({ _id: user._id }, user),{ new: true };
    otherUser = await this.userRepository.findOneAndUpdate({ _id: otherUser._id }, otherUser), { new: true };

    return [user,otherUser]
  }

  //validation

  async validateUser(user, currentUserId : string | undefined, updateUserId : string | undefined) : Promise<void> {
    if((await this.userRepository.find(
      {
        $or: 
        [
            { username: user.username }, 
            { email: user.email }
        ] 
      }, 
    )).length > 0 && !(await this.isMyData(currentUserId, updateUserId))) {
      throw new ValidationException([`Username or email is already in use!`]);
    }

    if(new Date(user.dateOfBirth) > new Date()) {
      throw new ValidationException([`Date of birth cannot be in the future!`]);
    }
  }

  async isMyData(currentUserId : string | undefined, targetUserId : string | undefined) : Promise<boolean> {
    return new Types.ObjectId(currentUserId).equals(new Types.ObjectId(targetUserId))
  }
}
