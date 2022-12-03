import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateThreadDto } from './thread-dto';
import { Thread, ThreadDocument } from './thread.schema';

@Injectable()
export class ThreadRepository {
  constructor(@InjectModel(Thread.name) private threadModel: Model<ThreadDocument>) {}

  async findOne(threadFilterQuery: FilterQuery<Thread>): Promise<Thread> {
    return this.threadModel.findOne(threadFilterQuery);
  }

  async find(threadFilterQuery: FilterQuery<Thread>): Promise<Thread[]> {
    return this.threadModel.find(threadFilterQuery);
  }

  async create(createThreadDto: CreateThreadDto): Promise<Thread> {

    const mergedthread = {...createThreadDto, creationDate: new Date(), isPublic: true};

    const newthread = new this.threadModel(mergedthread);
    return newthread.save();
  }

  async findOneAndUpdate(threadFilterQuery: FilterQuery<Thread>, thread: Partial<Thread>): Promise<Thread> {
    return this.threadModel.findOneAndUpdate(threadFilterQuery, thread, { new: true });
  }

  async findOneAndDelete(threadFilterQuery: FilterQuery<Thread>): Promise<Thread> {
    return this.threadModel.findOneAndDelete(threadFilterQuery);
  }
}