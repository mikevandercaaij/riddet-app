import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Role } from "../auth/role.enum";
import { Community, CommunityDocument } from "../community/community.schema";
import { ValidationException } from "../shared/filters/validation.exception";
import { UserService } from "../user/user.service";
import { CreateThreadDto, UpdateThreadDto } from "./thread-dto";
import { Thread } from "./thread.schema";

@Injectable()
export class ThreadService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>,
    private readonly userService : UserService) {}

    async getById(communityId : string, threadId : string): Promise<Thread> {
        await this.doesExist(communityId, threadId);

        return (await this.communityModel.findOne(
            {_id: communityId}, 
            {threads:{$elemMatch:{_id: threadId}}}))
            .threads.filter(async thread => thread._id === new Types.ObjectId(threadId))[0];
    }

    async getAll(communityId : string): Promise<Thread[]> {
        await this.doesExist(communityId);

        return (await this.communityModel.findOne({ _id : communityId })).threads;
    }

    async create(createThreadDto : CreateThreadDto, communityId : string, req): Promise<Thread> {
        await this.doesExist(communityId);

        const community = await this.communityModel.findOne({ _id : communityId });

        if(!(await this.communityModel.find({$and: [{_id: communityId}, {members: { $in : [req.user.id]}}]}) 
        && community.createdBy._id.equals(new Types.ObjectId(req.user.id))
        && !(req.user.roles.includes(Role.Admin)))) {
            throw new ValidationException(["You are not a member of this community"]);
        }

        const mergedthread = {_id: new Types.ObjectId(), 
            ...createThreadDto, 
            upvotes: 0, 
            publicationDate: new Date(), 
            messages: [], 
            createdBy: req.user.id
        };

        return await this.communityModel.findOneAndUpdate(
            { _id: communityId }, 
            {$push: { threads : mergedthread }}, 
            { new: true });
    }

    async update(communityId: string, threadId : string, req, updateThreadDto: UpdateThreadDto): Promise<Thread> {
        await this.doesExist(communityId, threadId);

        const thread = await this.getById(communityId, threadId);

        if(!(await this.isMyData(thread.createdBy.toString(), req.user.id)) && !(req.user.roles.includes(Role.Admin))) {
            throw new ValidationException([`You cannot alter data that isn't yours!`]);
        }

        return await this.communityModel.findOneAndUpdate(
            {_id : communityId, "threads._id" : threadId}, 
            {$set: {"threads.$" : {...thread, ...updateThreadDto}}}, 
            {new: true});
    }

    async delete(communityId : string, threadId : string, req): Promise<Thread> {
        await this.doesExist(communityId, threadId);

        const thread = await this.getById(communityId, threadId);

        if(!(await this.isMyData(thread.createdBy.toString(), req.user.id)) && !(req.user.roles.includes(Role.Admin))) {
            throw new ValidationException([`You cannot alter data that isn't yours!`]);
        }

        return (await this.communityModel.findOneAndUpdate(
            { _id: new Types.ObjectId(communityId) }, 
            {$pull: { threads : {_id: new Types.ObjectId(threadId)}}}, 
            { new: true }))
    }


    async isMyData(currentUserId? : string, targetUserId? : string) : Promise<boolean> {
        return new Types.ObjectId(currentUserId).equals(new Types.ObjectId(targetUserId))
      }

    async doesExist(communityId : string, threadId? : string) : Promise<void> {
        const community = await this.communityModel.findOne({ _id : communityId });

        if(!community) {
            throw new ValidationException([`Community with id of ${communityId} doesn't exist!`]);
        }

        if(threadId) {
            if(!(community.threads.filter(thread => thread._id.equals(new Types.ObjectId(threadId))).length > 0)) {
                throw new ValidationException([`Thread with id of ${threadId} doesn't exist in the community with id of ${communityId}!`]);
            }
        }
    }
}