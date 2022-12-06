import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Role } from "../auth/role.enum";
import { Category } from "../category/category.schema";
import { CategoryService } from "../category/category.service";
import { ValidationException } from "../shared/filters/validation.exception";
import { ParseObjectIdPipe } from "../shared/pipes/ParseObjectIdPipe";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { CreateCommunityDto, UpdateCommunityDto } from "./community.dto";
import { Community, CommunityDocument } from "./community.schema";

@Injectable()
export class CommunityService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>,
    private readonly categoryService : CategoryService,
    @Inject(forwardRef(() => UserService)) private userService : UserService) {}
    

    async getById(_id: string): Promise<Community> {
        await this.doesExist(_id);

        return await this.communityModel.findOne({ _id });
    }

    async getAll(): Promise<Community[]> {
        return await this.communityModel.find({})
    }

    async getAllJoinedCommunities(req) : Promise<Community[]> {

        const joinedCommunities : Community[] = []

        const user = await this.userService.getById(req.user.id);

        for await (const communityId of user.joinedCommunities) {
            joinedCommunities.push(await this.getById(communityId.toString()));
        }

        return joinedCommunities;
    }

    async getAllCreatedCommunities(req) : Promise<Community[]> {

        const createdCommunities : Community[] = []

        const user = await this.userService.getById(req.user.id);

        for await (const communityId of user.createdCommunities) {
            createdCommunities.push(await this.getById(communityId.toString()));
        }

        return createdCommunities;
    }

    async create(createCommunityDto : CreateCommunityDto, req): Promise<Community> {
        await this.validate(createCommunityDto);

        const embedCategories : Category[] = [];

        for await (const category of createCommunityDto.categories) {
            embedCategories.push(await this.categoryService.getById(category));
        }

        const creator = await this.userService.getById(req.user.id);
        delete creator.password;

        const mergedCommunity = new this.communityModel(
            {...createCommunityDto, 
            creationDate: new Date(), 
            categories : embedCategories, 
            createdBy: creator
        });

        const community = await this.communityModel.create(mergedCommunity);

        await this.userService.addCreatedCommunity(req.user.id, community._id);

        return community;
    }

    async update(updateId: string, updateCommunityDto: UpdateCommunityDto, req): Promise<Community> {
        await this.doesExist(updateId);
        await this.isAllowedToAlter(req.user.id, updateId, req);
        await this.validate(updateCommunityDto, updateId);

        let updateObject = {};

        if(updateCommunityDto.categories) {
            const categories : Category[] = [];

            for await (const category of updateCommunityDto.categories) {
                categories.push(await this.categoryService.getById(category));
            }

            delete updateCommunityDto.categories;
            updateObject = {categories};
        }

        updateObject = {...updateCommunityDto, ...updateObject};

        return this.communityModel.findOneAndUpdate({ _id : updateId }, updateObject, { new: true });
    }

    async delete(_id: string, req): Promise<Community> {
        await this.doesExist(_id);
        await this.isAllowedToAlter(req.user.id, _id, req);

        const community = await this.communityModel.findOne({ _id });
        const creator = await this.userService.getById(community.createdBy._id.toString());

        await this.userService.removeCreatedCommunity(creator._id.toString(), community._id);

        for await (const participantId of community.participants) {
            await this.userService.removeJoinedCommunity(participantId.toString(), community._id);
        };

        return await this.communityModel.findOneAndDelete({ _id });
    }

    //participating in communities

    async join(communityId : string, req) : Promise<Community> {
        await this.doesExist(communityId);

        if((await this.communityModel.find({$and: [{_id : communityId}, { "createdBy._id" : req.user.id }]})).length > 0) {
            throw new ValidationException([`You cannot join a community you created!`]);
        }
        
        else if (await (await this.communityModel.find({ $and: [ {_id: communityId}, {participants: { $in : req.user.id}} ] })).length > 0) {
            throw new ValidationException([`You are already a participant of this community!`]);
        }

        await this.userService.addJoinedCommunity(req.user.id, communityId);

        return this.communityModel.findOneAndUpdate({ _id : communityId }, { $push : { participants : req.user.id } }, { new: true });
    }

    async leave(communityId : string, req) : Promise<Community> {
        await this.doesExist(communityId);

        if((await this.communityModel.find({$and: [{_id : communityId}, { "createdBy._id" : req.user.id }]})).length > 0) {
            throw new ValidationException([`You cannot leave a community you created!`]);
        }
        
        else if (await (await this.communityModel.find({ $and: [ {_id: communityId}, {participants: { $in : req.user.id}} ] })).length === 0) {
            throw new ValidationException([`You are not a participant of this community!`]);
        }

        await this.userService.removeJoinedCommunity(communityId, req.user.id,);

        return this.communityModel.findOneAndUpdate({ _id : communityId }, { $pull : { participants : req.user.id } }, { new: true });
    }


    //update creator
    async updateCreator(creatorId : string, creator : Partial<User>) : Promise<void> {
        await this.communityModel.updateMany({ "createdBy._id" : creatorId }, { $set : { createdBy : creator } });
    }

    //validation
    async validate(community : CreateCommunityDto, currentCommunityId?: string) {
        if(community.name) {
            if((await this.communityModel.find({$and: [{name: community.name }, {_id : { $ne: currentCommunityId }}]})).length > 0 ) {
                throw new ValidationException([`Community with the name of ${community.name} already exists!`]);
            }
        }

        if(community.categories) {
            if(!(await this.areValidObjectIds(community.categories as string[]))) {
                throw new ValidationException([`Categories contains invalid data, all input must be of type ObjectId!`]);
            }
        }
    }

    async areValidObjectIds(value: string[]) {
        return value.every((id) => ParseObjectIdPipe.isValidObjectId(id));
    }

    async isAllowedToAlter(currentUserId? : string, communityId? : string, req?) : Promise<void> {
        const community = await this.communityModel.findOne({ _id : communityId });

        if(!(new Types.ObjectId(currentUserId).equals(community.createdBy._id)) && !(req.user.roles.includes(Role.Admin))) {
            throw new ValidationException([`Only the creator can alter data of this community!`]);
        }
    }

    async doesExist(communityId : string) : Promise<void> {
        const community = await this.communityModel.findOne({ _id : communityId });

        if(!community) {
            throw new ValidationException([`Community with id of ${communityId} doesn't exist!`]);
        }
    }
}