import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { Role } from "../auth/role.enum";
import { CreateUserDto } from "./user.dto";
import { User, UserDocument } from "./user.schema";


@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private communityModel: Model<UserDocument>) {}

    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.communityModel.findOne(userFilterQuery);
    }

    async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.communityModel.find(userFilterQuery);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const mergedUser = {...createUserDto, creationDate: new Date(), isActive: true, roles: [Role.User], password: await bcrypt.hashSync(createUserDto.password, 10)};

        const newUser = new this.communityModel(mergedUser);
        return newUser.save();
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User>, update): Promise<User> {
        if(update.password) {
            update.password = await bcrypt.hashSync(update.password, 10);
        }

        return this.communityModel.findOneAndUpdate(userFilterQuery, update, { new: true });
    }

    async findOneAndDelete(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.communityModel.findOneAndDelete(userFilterQuery);
    }

    async aggregate(userFilterQuery: PipelineStage) {
        return this.communityModel.aggregate([userFilterQuery]);

    }
}
