import { Body, Injectable } from "@nestjs/common";
import { CreateThreadDto } from "./thread-dto";
import { ThreadRepository } from "./thread.repository";
import { Thread } from "./thread.schema";

@Injectable()
export class ThreadService {
    constructor(private readonly threadRepository : ThreadRepository) {}

    async getById(_id: string): Promise<Thread> {
        return this.threadRepository.findOne({ _id });
    }

    async getAllByCommunityId(communityId : string): Promise<Thread[]> {
        return this.threadRepository.find({communityId : communityId.toString()});
    }

    async getAll(): Promise<Thread[]> {
        return this.threadRepository.find({});
    }

    async create(@Body() createThreadDto : CreateThreadDto): Promise<Thread> {
        return this.threadRepository.create(createThreadDto);
    }

    async update(_id: string, thread: Partial<Thread>): Promise<Thread> {
        return this.threadRepository.findOneAndUpdate({ _id }, thread);
    }

    async delete(_id: string): Promise<Thread> {
        return this.threadRepository.findOneAndDelete({ _id });
    }
}