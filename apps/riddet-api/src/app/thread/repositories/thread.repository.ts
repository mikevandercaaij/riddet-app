import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ThreadDto } from '../dto/thread-dto';
import { Thread, ThreadDocument } from '../schemas/thread.schema';

@Injectable()
export class ThreadRepository {
  constructor(@InjectModel(Thread.name) private threadModel: Model<ThreadDocument>) {}

  async findOne(threadFilterQuery: FilterQuery<Thread>): Promise<Thread> {
    return this.threadModel.findOne(threadFilterQuery);
  }

  async find(threadFilterQuery: FilterQuery<Thread>): Promise<Thread[]> {
    return this.threadModel.find(threadFilterQuery);
  }

  async create(thread: ThreadDto): Promise<Thread> {

    console.log(thread);

    const mergedthread = {... thread, creationDate: new Date(), isPublic: true};

    console.log(mergedthread);


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