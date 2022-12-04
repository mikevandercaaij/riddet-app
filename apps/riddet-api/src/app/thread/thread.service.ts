import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Community, CommunityDocument } from "../community/community.schema";
import { UserService } from "../user/user.service";
import { CreateThreadDto, UpdateThreadDto } from "./thread-dto";
import { Thread } from "./thread.schema";

@Injectable()
export class ThreadService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>,
    private readonly userService : UserService) {}

    async getById(communityId : string, threadId : string): Promise<Thread> {
        return (await this.communityModel.findOne(
            {_id: communityId}, 
            {threads:{$elemMatch:{_id: threadId}}}))
            .threads.filter(async thread => thread._id === new Types.ObjectId(threadId))[0];
    }

    async getAll(communityId : string): Promise<Thread[]> {
        return (await this.communityModel.findOne({ _id : communityId })).threads;
    }

    async create(createThreadDto : CreateThreadDto, communityId : string, req): Promise<Thread> {
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
        return await this.communityModel.findOneAndUpdate(
            {_id : communityId, "threads._id" : threadId}, 
            {$set: {"threads.$" : {...(await this.getById(communityId, threadId)), ...updateThreadDto}}}, 
            {new: true});
    }

    async delete(communityId : string, threadId : string, req): Promise<Thread> {
        return (await this.communityModel.findOneAndUpdate(
            { _id: new Types.ObjectId(communityId) }, 
            {$pull: { threads : {_id: new Types.ObjectId(threadId)}}}, 
            { new: true }))
    }
}