import { IMessage } from "@riddet-app/data";
import { Types } from "mongoose";
import { User } from "../user/user.model";

export class Message implements IMessage {
    _id: Types.ObjectId = new Types.ObjectId();
    text = '';
    likes: Types.ObjectId[] = [];
    publicationDate: Date = new Date();
    createdBy = User
}