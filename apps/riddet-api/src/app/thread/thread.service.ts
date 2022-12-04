import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Role } from "../auth/role.enum";
import { Community, CommunityDocument } from "../community/community.schema";
import { ValidationException } from "../shared/filters/validation.exception";
import { CreateThreadDto, UpdateThreadDto } from "./thread-dto";
import { Thread } from "./thread.schema";

@Injectable()
export class ThreadService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>) {}

    async getById(communityId : string, threadId : string): Promise<Thread> {
        await this.doesExist(communityId, threadId);

        await this.communityModel.findOneAndUpdate({_id : communityId, "threads._id" : threadId}, {$inc: {"threads.$.views" : 1}});

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

        if(!((await this.communityModel.find({$and: [{_id: communityId}, {participants: { $in : [req.user.id]}}]})).length > 0)
        && !(community.createdBy._id.equals(new Types.ObjectId(req.user.id)))
        && !(req.user.roles.includes(Role.Admin))) {
            throw new ValidationException(["You are not a member of this community"]);
        }

        const mergedthread = {_id: new Types.ObjectId(), 
            ...createThreadDto, 
            views: 0, 
            upvotes: [],
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

        const thread = (await this.communityModel.findOne(
            {_id: communityId}, 
            {threads:{$elemMatch:{_id: threadId}}}))
            .threads.filter(async thread => thread._id === new Types.ObjectId(threadId))[0];

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

        const thread = (await this.communityModel.findOne(
            {_id: communityId}, 
            {threads:{$elemMatch:{_id: threadId}}}))
            .threads.filter(async thread => thread._id === new Types.ObjectId(threadId))[0];

        if(!(await this.isMyData(thread.createdBy.toString(), req.user.id)) && !(req.user.roles.includes(Role.Admin))) {
            throw new ValidationException([`You cannot alter data that isn't yours!`]);
        }

        return (await this.communityModel.findOneAndUpdate(
            { _id: new Types.ObjectId(communityId) }, 
            {$pull: { threads : {_id: new Types.ObjectId(threadId)}}}, 
            { new: true }))
    }

    async upvote(communityId : string, threadId : string, req): Promise<Thread> {
        await this.doesExist(communityId, threadId);

        let community;

        if ((await this.communityModel.find({ $and: [{_id: communityId}, {threads: {$elemMatch: {_id: threadId, upvotes: {$in: [req.user.id]}}}}]})).length === 0) {
            community = await this.communityModel.findOneAndUpdate({_id : communityId, "threads._id" : threadId}, {$push: {"threads.$.upvotes" : req.user.id}} , {new: true});
        } else {
            community = await this.communityModel.findOneAndUpdate({_id : communityId, "threads._id" : threadId}, {$pull: {"threads.$.upvotes" : req.user.id}} , {new: true});
        }

        return community.threads.filter(async thread => thread._id === new Types.ObjectId(threadId))[0];
    }

    //validation
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