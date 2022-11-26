import { Body, Injectable } from "@nestjs/common";
import { ThreadDto } from "./thread-dto";
import { ThreadRepository } from "./thread.repository";
import { Thread } from "./thread.schema";

@Injectable()
export class ThreadService {
    constructor(private readonly threadRepository : ThreadRepository) {}

    async getThreadById(_id: string): Promise<Thread> {
        return this.threadRepository.findOne({ _id });
    }

    async getThreadsByCommunityId(communityId : string): Promise<Thread[]> {
        return this.threadRepository.find({communityId : communityId.toString()});
    }

    async getThreads(): Promise<Thread[]> {
        return this.threadRepository.find({});
    }

    async createThread(@Body() threadDto : ThreadDto): Promise<Thread> {
        return this.threadRepository.create(threadDto);
    }

    async updateThread(_id: string, thread: Partial<Thread>): Promise<Thread> {
        return this.threadRepository.findOneAndUpdate({ _id }, thread);
    }

    async deleteThread(_id: string): Promise<Thread> {
        return this.threadRepository.findOneAndDelete({ _id });
    }
}