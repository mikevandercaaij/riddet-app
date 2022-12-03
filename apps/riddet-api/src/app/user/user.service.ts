import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model, Types } from 'mongoose';
import { Role } from '../auth/role.enum';
import { ValidationException } from '../shared/filters/validation.exception';
import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './user.schema';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>)
     {}

  async findByUsernameOrEmail(username: string): Promise<User | undefined> {

    //TODO: into one query with $or
    const userByUsername = await this.userModel.findOne({ username });

    if(userByUsername === null) {
      const userByEmail = await this.userModel.findOne({ email: username });

      if(userByEmail === null) {
        return undefined;
      }
      return userByEmail;
    }
    return userByUsername;
  }

  async getById(_id: string): Promise<User> {
    return this.userModel.findOne({ _id });
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find({});
  }

  async create(createUserDto : CreateUserDto): Promise<User> {
      await this.validateUser(createUserDto, undefined, undefined);

      createUserDto.dateOfBirth = new Date(createUserDto.dateOfBirth);
      createUserDto.dateOfBirth.setHours(createUserDto.dateOfBirth.getHours() + 1);

      const mergedUser = {...createUserDto, creationDate: new Date(), isActive: true, roles: [Role.User], password: await bcrypt.hashSync(createUserDto.password, 10)};

      return new this.userModel(mergedUser).save();
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

      return this.userModel.findOneAndUpdate({ _id : updateUserId }, user, { new: true });
    }
    throw new ValidationException([`You cannot update other users!`]);
  }

  async delete(deleteUserId: string, req): Promise<User> {
    const currentUser = req.user

    if(await this.isMyData(deleteUserId, currentUser.id) || currentUser.roles.includes(Role.Admin)) {
      return this.userModel.findOneAndDelete({ _id : deleteUserId });
    }

    throw new ValidationException([`You cannot delete other users!`]);
  }

  //following related methods

  async follow(followUserId: string, req): Promise<User[]> {
    if(await this.isMyData(followUserId, req.user.id)) {
      throw new ValidationException([`You cannot follow yourself!`]);
    }
    
    if (await (await this.userModel.find({ $and: [ {_id: req.user.id}, {following: { $in : followUserId}} ] })).length > 0) {
      throw new ValidationException([`You already follow this person!`]);
    }

    const user = await this.userModel.findOneAndUpdate({ _id: req.user.id }, { $push: { following: followUserId } }, {new: true});
    const otherUser = await this.userModel.findOneAndUpdate({ _id: followUserId}, { $push: { followers: req.user.id } }, {new: true});

    return [user,otherUser]
  }

  async unfollow(followUserId: string, req): Promise<User[]> {
    if(await this.isMyData(followUserId, req.user.id)) {
      throw new ValidationException([`You cannot unfollow yourself!`]);
    }
    
    if (await (await this.userModel.find({ $and: [ {_id: req.user.id}, {following: { $in : followUserId}} ] })).length === 0) {
      throw new ValidationException([`You don't follow this person!`]);
    }
    
    const user = await this.userModel.findOneAndUpdate({ _id: req.user.id }, {$pull: { following : followUserId }}, { new: true });
    const otherUser = await this.userModel.findOneAndUpdate({ _id: followUserId }, {$pull: { followers : req.user.id }}, { new: true });

    return [user,otherUser]
  }

  //validation

  async validateUser(user, currentUserId : string | undefined, updateUserId : string | undefined) : Promise<void> {
    if((await this.userModel.find(
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
