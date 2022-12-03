import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateThreadDto } from "./thread-dto";
import { Thread, ThreadDocument } from "./thread.schema";

@Injectable()
export class ThreadService {
    constructor(@InjectModel(Thread.name) private threadModel: Model<ThreadDocument>) {}

    async getById(_id: string): Promise<Thread> {
        return this.threadModel.findOne({ _id });
    }

    async getAllByCommunityId(communityId : string): Promise<Thread[]> {
        return this.threadModel.find({communityId : communityId.toString()});
    }

    async getAll(): Promise<Thread[]> {
        return this.threadModel.find({});
    }

    async create(@Body() createThreadDto : CreateThreadDto): Promise<Thread> {

        const mergedthread = {...createThreadDto, creationDate: new Date(), isPublic: true};

        return new this.threadModel(mergedthread).save();
    }

    async update(_id: string, thread: Partial<Thread>): Promise<Thread> {
        return this.threadModel.findOneAndUpdate({ _id }, thread, {new: true});
    }

    async delete(_id: string): Promise<Thread> {
        return this.threadModel.findOneAndDelete({ _id });
    }
}