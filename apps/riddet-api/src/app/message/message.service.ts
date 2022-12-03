import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageDto } from './message.dto';
import { Message, MessageDocument } from './message.schema';


@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}


  async getById(_id: string): Promise<Message> {
    return this.messageModel.findOne({ _id });
  }

  async getAll(communityId, threadId): Promise<Message[]> {

    

    return this.messageModel.find({});
  }

  async create(messageDto : MessageDto, req, threadId): Promise<Message> {
      const mergedMessage = {...messageDto, publicationDate: new Date(), likes: 0, dislikes: 0, threadId: threadId, createdBy: req.user.id};

      return new this.messageModel(mergedMessage).save();
  }

//   async update(updateUserId: string, user: Partial<User>, req): Promise<User> {

//     const currentUser = req.user;

//     if(await this.isMyData(updateUserId, currentUser.id) || currentUser.roles.includes(Role.Admin)) {

//       if(user.dateOfBirth) {
//         user.dateOfBirth = new Date(user.dateOfBirth);
//         user.dateOfBirth.setHours(user.dateOfBirth.getHours() + 1);
//       }

//       if(user.password) {
//         user.password = await bcrypt.hashSync(user.password, 10)
//       }

//       return this.communityModel.findOneAndUpdate({ _id : updateUserId }, user, { new: true });
//     }
//     throw new ValidationException([`You cannot update other users!`]);
//   }

//   async delete(deleteUserId: string, req): Promise<User> {
//     const currentUser = req.user

//     if(await this.isMyData(deleteUserId, currentUser.id) || currentUser.roles.includes(Role.Admin)) {
//       return this.communityModel.findOneAndDelete({ _id : deleteUserId });
//     }

//     throw new ValidationException([`You cannot delete other users!`]);
//   }

  async isMyData(currentUserId : string | undefined, targetUserId : string | undefined) : Promise<boolean> {
    return new Types.ObjectId(currentUserId).equals(new Types.ObjectId(targetUserId))
  }
}
