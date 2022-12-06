import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model, Types } from 'mongoose';
import { Role } from '../auth/role.enum';
import { Community, CommunityDocument } from '../community/community.schema';
import { CommunityService } from '../community/community.service';
import { ValidationException } from '../shared/filters/validation.exception';
import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './user.schema';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Community.name) private communityModel: Model<CommunityDocument>,
    @Inject(forwardRef(() => CommunityService)) private communityService : CommunityService){}

  async findByUsernameOrEmail(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({$or: [{username}, { email : username }]});
  }

  async getById(_id: string): Promise<User> {
    await this.doesExist(_id);

    return (await this.userModel.aggregate([
      {$match: { "_id": new Types.ObjectId(_id) }},
      {$lookup: {
        from: "users",
        localField: "following",
        foreignField: "_id",
        as: "following"
      }},
      {$lookup: {
        from: "users",
        localField: "followers",
        foreignField: "_id",
        as: "followers"
      }},
      {$unset: ["password", "__v"]}
    ]))[0];
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.aggregate([
      {$lookup: {
        from: "users",
        localField: "following",
        foreignField: "_id",
        as: "following"
      }},
      {$lookup: {
        from: "users",
        localField: "followers",
        foreignField: "_id",
        as: "followers"
      }},
      {$unset: ["password", "__v"]}
    ])
  }

  async create(createUserDto : CreateUserDto): Promise<User> {
      await this.validate(createUserDto);

      createUserDto.dateOfBirth = new Date(createUserDto.dateOfBirth);
      createUserDto.dateOfBirth.setHours(createUserDto.dateOfBirth.getHours() + 1);

      const mergedUser = {...createUserDto, creationDate: new Date(), isActive: true, roles: [Role.User], password: await bcrypt.hashSync(createUserDto.password, 10)};

      return new this.userModel(mergedUser).save();
  }

  async update(updateUserId: string, user: Partial<User>, req): Promise<User> {
    await this.doesExist(updateUserId);

    const currentUser = req.user;

    if(await this.isMyData(updateUserId, currentUser.id) || currentUser.roles.includes(Role.Admin)) {
      await this.validate(user, currentUser.id, updateUserId);

      if(user.dateOfBirth) {
        user.dateOfBirth = new Date(user.dateOfBirth);
        user.dateOfBirth.setHours(user.dateOfBirth.getHours() + 1);
      }

      if(user.password) {
        user.password = await bcrypt.hashSync(user.password, 10)
      }

      //update embedded users
      await this.communityService.updateCreator(updateUserId, {...(await this.userModel.findOne({ _id : updateUserId })).toObject(), ...user });

      return this.userModel.findOneAndUpdate({ _id : updateUserId }, user, { new: true });
    }
    throw new ValidationException([`You cannot update other users!`]);
  }

  //following related methods

  async follow(followUserId: string, req): Promise<User[]> {
    await this.doesExist(followUserId);

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
    await this.doesExist(followUserId);

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

  //community arrays
  async addJoinedCommunity(userId : string, communityId: string): Promise<User> {
    await this.doesExist(userId);

    return await this.userModel.findOneAndUpdate({ _id: userId }, { $push: { joinedCommunities: communityId } }, {new: true});
  }

  async removeJoinedCommunity(userId : string, communityId: string): Promise<User> {
    await this.doesExist(userId);

    return await this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { joinedCommunities: communityId } }, {new: true});
  }

    //community array fillers
    async addCreatedCommunity(userId : string, communityId: string): Promise<User> {
      await this.doesExist(userId);
  

      const user = await this.userModel.findOne({ _id: userId });

      for await (const createdCommunityId of user.createdCommunities) {
        await this.communityModel.updateMany({ _id: createdCommunityId, "createdBy._id": new Types.ObjectId(userId) }, { $push:  {"createdBy.$[_id]createdCommunities": communityId } } );
      }

      return await this.userModel.findOneAndUpdate({ _id: userId }, { $push: { createdCommunities: communityId } }, {new: true});
    }

    async removeCreatedCommunity(userId : string, communityId: string): Promise<User> {
      await this.doesExist(userId);

      const user = await this.userModel.findOne({ _id: userId });

      for await (const createdCommunityId of user.createdCommunities) {
        await this.communityModel.updateMany({ _id: createdCommunityId, "createdBy._id": new Types.ObjectId(userId) }, { $pull:  {"createdBy.$[_id]createdCommunities": communityId } } );
      }

      return await this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { createdCommunities: communityId } }, {new: true});
    }

  //validation

  async validate(user, currentUserId? : string, updateUserId? : string) : Promise<void> {
    if((await this.userModel.find(
      {
        $or: 
        [
            { username: user.username }, 
            { email: user.email }
        ] 
      }, 
    )).length > 0 && !(await this.isMyData(currentUserId, updateUserId))) {
    throw new HttpException(`Username or email is already in use!`, HttpStatus.BAD_REQUEST);
    }

    if(new Date(user.dateOfBirth) > new Date()) {
    throw new HttpException(`Date of birth cannot be in the future!`, HttpStatus.BAD_REQUEST);
    }
  }

  async isMyData(currentUserId? : string, targetUserId? : string) : Promise<boolean> {
    return new Types.ObjectId(currentUserId).equals(new Types.ObjectId(targetUserId))
  }

  async doesExist(userId: string) : Promise<void> {
    const user = await this.userModel.findOne({_id: userId});

    if(!user) {
      throw new HttpException(`User with id of ${userId} doesn't exist!`, HttpStatus.BAD_REQUEST);
    }
  }
}