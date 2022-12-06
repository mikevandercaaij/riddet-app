import { IMessage } from "@riddet-app/data";
import { Types } from "mongoose";

export class Message implements IMessage {
    _id: Types.ObjectId = new Types.ObjectId();
    text = '';
    likes: Types.ObjectId[] = [];
    publicationDate: Date = new Date();
    hasLikes = false;
    createdBy: Types.ObjectId = new Types.ObjectId();

}