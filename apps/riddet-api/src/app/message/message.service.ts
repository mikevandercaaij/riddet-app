import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from '../auth/role.enum';
import { Community, CommunityDocument } from '../community/community.schema';
import { Thread } from '../thread/thread.schema';
import { MessageDto } from './message.dto';
import { Message, MessageDocument } from './message.schema';


@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Community.name) private communityModel: Model<CommunityDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
    ) {}


  async getById(communityId: string, threadId : string, messageId : string): Promise<Message> {
    await this.doesExist(communityId, threadId, messageId);

    const community = await this.communityModel.findOne({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId), "messages._id": new Types.ObjectId(messageId)});
    return community.threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(new Types.ObjectId(messageId)))[0];
}

  async getAll(communityId : string, threadId : string): Promise<Message[]> {
    await this.doesExist(communityId, threadId);

    const community = await this.communityModel.findOne({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)});
    return community.threads.filter(p => p._id.equals(new Types.ObjectId(threadId)))[0].messages;

  }

  async create(communityId, threadId, req, messageDto : MessageDto) : Promise<Message> {
      await this.doesExist(communityId, threadId);

      const community = await this.communityModel.findOne({ _id: communityId });

      if(!((await this.communityModel.find({$and: [{_id: communityId}, {participants: { $in : [req.user.id]}}]})).length > 0)
      && !(community.createdBy._id.equals(new Types.ObjectId(req.user.id)))
      && !(req.user.roles.includes(Role.Admin))) {
        throw new HttpException(`You are not a member of this community!`, HttpStatus.BAD_REQUEST);
      }

      const mergedMessage = new this.messageModel({
        ...messageDto, 
        publicationDate: new Date(), 
        createdBy: req.user.id
      }) 

      const result = await this.communityModel.findOneAndUpdate({ _id : communityId } , { $push: { "threads.$[thread].messages" : mergedMessage } }, { arrayFilters: [{ "thread._id": new Types.ObjectId(threadId) }], new: true });
      return result.threads.filter(thread => thread._id.equals(new Types.ObjectId(threadId)))[0].messages.filter(message => message._id.equals(mergedMessage._id))[0];
  }

  async update(communityId: string, threadId: string, messageId: string, messageDto: MessageDto, req): Promise<Message> {
      await this.doesExist(communityId, threadId, messageId);
      
      const oldMessage = await this.communityModel.find({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {threads: {$elemMatch: {_id: new Types.ObjectId(threadId)}}}).then(threads => threads[0].threads[0].messages.filter(message => message._id.equals(new Types.ObjectId(messageId)))[0]);
      const message = {...oldMessage, ...messageDto};

      if(!(await this.isMyData(message.createdBy.toString(), req.user.id)) && !(req.user.roles.includes(Role.Admin))) {
        throw new HttpException(`You cannot alter data that isn't yours!`, HttpStatus.BAD_REQUEST);
      }

      return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId), "threads.messages._id": new Types.ObjectId(messageId)}, {$set: {"threads.$[thread].messages.$[message]": message}}, {arrayFilters: [{ "thread._id": new Types.ObjectId(threadId) }, { "message._id": new Types.ObjectId(messageId) }]});
    }

  async delete(communityId : string, threadId : string, messageId : string, req): Promise<Thread> {
    await this.doesExist(communityId, threadId, messageId);

    console.log("delete message")

    const message = await this.communityModel.find({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {threads: {$elemMatch: {_id: new Types.ObjectId(threadId)}}}).then(threads => threads[0].threads[0].messages.filter(message => message._id.equals(new Types.ObjectId(messageId)))[0]);

    if(!(await this.isMyData(message.createdBy.toString(), req.user.id)) && !(req.user.roles.includes(Role.Admin))) {
        throw new HttpException(`You cannot alter data that isn't yours!`, HttpStatus.BAD_REQUEST);
    }

    return await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$pull: {"threads.$.messages": message }}, {new: true});
  }


async like(communityId : string, threadId : string, messageId : string, req): Promise<Message> {
  await this.doesExist(communityId, threadId, messageId);

  let community;

  if ((await this.communityModel.find({ $and: [{_id: communityId}, {threads: {$elemMatch: {_id: threadId, messages : {$elemMatch : {_id: messageId, likes : {$in: [req.user.id] } } } } } } ]})).length === 0) {
    community = (await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$push: {"threads.$.messages.$[message].likes": req.user.id}}, {arrayFilters: [{ "message._id": new Types.ObjectId(messageId) }], new: true}))
  } 
  else {
    community = (await this.communityModel.findOneAndUpdate({_id: new Types.ObjectId(communityId), "threads._id": new Types.ObjectId(threadId)}, {$pull: {"threads.$.messages.$[message].likes": req.user.id}}, {arrayFilters: [{ "message._id": new Types.ObjectId(messageId) }], new: true}))
  }

  return community.threads.filter(thread => thread._id.equals(new Types.ObjectId(threadId)))[0].messages.filter(message => message._id.equals(new Types.ObjectId(messageId)))[0];
}

  async isMyData(currentUserId : string | undefined, targetUserId : string | undefined) : Promise<boolean> {
    return new Types.ObjectId(currentUserId).equals(new Types.ObjectId(targetUserId) )
  }

  async doesExist(communityId : string, threadId? : string, messageId? : string) : Promise<void> {
    const community = await this.communityModel.findOne({ _id : communityId });
    let threads : Thread[];

    if(!community) {
      throw new HttpException(`Community with id of ${communityId} doesn't exist!`, HttpStatus.BAD_REQUEST);
    }

    if(threadId) {
      threads = await community.threads.filter(thread => thread._id.equals(new Types.ObjectId(threadId)));
      if(!(threads.length > 0)) {
        throw new HttpException(`Thread with id of ${threadId} doesn't exist in the community with id of ${communityId}!`, HttpStatus.BAD_REQUEST);
      }
    }

    if(threadId && messageId) {
      if(!(threads[0].messages.filter(message => message._id.equals(new Types.ObjectId(messageId))).length > 0)) {
        throw new HttpException(`Message with id of ${messageId} doesn't exist in the thread with id of ${threadId}!`, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
